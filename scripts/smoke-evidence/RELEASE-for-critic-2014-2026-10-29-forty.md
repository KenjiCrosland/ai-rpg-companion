# Release table for the critic — 2014 blocks — 2026-10-29

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-29-forty.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-29T17-45-33

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Chapel Bell-Toller | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Pit Scree-Maw | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/3 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Ramshackle Siege Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Swarm of Drowned Choirs | 10 (2014) | 2014 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/4 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 11/12 |
| Vesp Lord | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | FAIL: two-novas | ok | ok | ok | SOFT: print-rows | ok | ok | ok | FAIL (1) | 0/1 | 10/10 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 9/10 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Ossuary Archlich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trench Hymn Leviathan | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 6/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Scythe-Shell Harvester | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/5 | 4/4 |
| Black Iron Vigil | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | ok | FAIL (1) | 3/3 | 3/7 |
| Bogwitch Molra | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Ossuary Vigil | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Swarm of Drowned Funeral Bells | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/4 |
| Reliquary-Glut | 9 (2014) | 2014 | ooze-9 | FAIL: escape-dc, escape-dc | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/6 |
| Thunderhead Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Granite Exile | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | FAIL: lack-honored | ok | FAIL (1) | 1/2 | 3/3 |
| Heron-Sworn Lizardfolk | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Well-Drowned | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ashen Trophykeeper | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 6/20 | 6/6 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 8/8 | 7/7 |
| Arena Relict | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Rook Harrowgate | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/5 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |

**Dropped 11 of 57 GM clauses** (coverage 81%); concept share 87% (188/215 rows). A run with zero fails and 60% coverage is a failing run. 1 blank-path sheet(s) excluded — the engine writes their description, so scoring it is self-scoring (Ashen Trophykeeper 6/20).
**Fails by seat and gate:**
- dragon-15 / structure: 1
- defender-7-warden / reader: 1
- ooze-9 / derivation: 1
- brute-9 / reader: 1



---


### Bog Hound — a 2014 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Hound [seed 1/2] | 1 (2014) | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 0 / off 1 → 0.5; sustained 10 (2 × Bite); nova none; dmg 10

```
Bog Hound
Medium monstrosity, neutral evil
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

False Appearance. While the bog hound remains motionless, it is indistinguishable from an ordinary object.
Whelm. As a bonus action, the bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has total cover against attacks and other effects outside the bog hound, and takes 3 (1d6) bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free prone by using 5 feet of movement.
Bog Slam (Bonus Action). One creature within 5 feet of the bog hound that hit it with an attack since the end of the bog hound's last turn takes 3 (1d6) bludgeoning damage.

Actions
Multiattack: The bog hound makes two Bite attacks.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is also restrained.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Bonus Actions/Whelm — the GM's clause "drags fishermen under"; binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Bonus Actions/Bog Slam — library seed own-turn-punisher
- Traits/False Appearance — template false-appearance; library draw (seed unstamped); binds the GM's words: still

**Engine trace**

```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags fishermen under" | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("drags fishermen under")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey under the mud and water [behavior] | mud-caked hide that hides it in the shallows [body]
[concept] identity: The bog hound waits half-submerged in the shallows, mud-caked hide indistinguishable from the bank, then lunges to seize a fisherman's leg in its jaws and haul them down into the ooze. Once it has a grip it does not let go — it braces its low, heavy body and drags, drowning its catch in mud and water rather than tearing it apart. It is an ambush predator with no taste for a fair fight: if its grip is broken and it is badly hurt, it slinks back into the bog and waits for easier prey.
[concept] lore: A hound that drowned in the fen and was remade by the muck that swallowed it, it haunts the fishing banks it once ran, dragging down any who wade too deep.
[reskin] donor: brute-5-grappler -> CR 1
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bog hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the bog hound" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: condition] [askMechanic: grapple]
[reskin] body verdicts: 29 of 29 answered; not true of this body: active-toll, herd, drain, shell-withdraw, rally, heated-body, absorption, bloodied-burst, resonant-body, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] signature idea (action): "The bog hound takes a grappled creature with it — it lurches and burrows into the muck with its catch, translating both of them through the shallows to a space of its choosing that it can see, leaving the creature Prone there and still in its jaws. Each time it does so the target is dragged beneath the surface, and it must succeed on a Constitution saving throw or take Poisoning damage from the sw" [action/save/condition] [family: drag] — menu: shield-bash, spew, thrown-burst-seed, wind-up, exploiter, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, contagion, charge-push, pounce)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), pacify (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] word match declined by the call: sensory-strike, shield-bash, exploiter, coating — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "spew" as nearest; it lands rather than the row being dropped (what it wanted: moves the grappler and its grappled catch together to another space, leaving the)
[reskin] free signature row: action — "spew" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] nova declined: "Muck Lurch (Recharge 5-6)" — a whole-round ability the GM never asked for and the call named none of this creature's own elements for it: the call offered no quote, and the key table finds no verb either; the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback respects the call: exploiter left the shelf — the call declined it for this sheet
[reskin] value check: "Answering Sting" EV 1.7 vs floor 1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bog hound's hide is a matted rind of fen mud, and while it lies still in shallow water or on open mire it is indistinguishable from the bank; a creature that does not know it is there must succeed on a Perception check to notice it before it acts." [trait/always/defense] [family: mark] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: adhesive (always/condition), false-appearance (always/defense), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — terrain-walk (bog, mud)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] word match declined by the call: adhesive, false-appearance — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "false-appearance" as nearest; it lands rather than the row being dropped (what it wanted: grabs prey on a hit and drags it under, engulfing it in mire)
[reskin] free signature row: "Mire Ambush" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): false-appearance -> Traits/"Mire Ambush" ("The bog hound's hide is a matted rind of fen mud, and while it lies still in shallow water or on open mire it is indistinguishable from the bank; a creature tha [verb: still:idea]")
[reskin] one mechanic, one name: Traits/"Mire Ambush" -> "False Appearance" — this row is false-appearance and does what every false-appearance row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "drags fishermen under"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"drags fishermen under","row":"Whelm"}], unplaced []
[reskin] clause already answered: "drags fishermen under" is carried by "Whelm" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "False Appearance" [trait/always/defense]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("False Appearance")
audit finding below confidence gate: Answering Sting Resolving this requires the GM to back-track all hits over an open interval and pick one valid target, which is not resolvable in seconds mid-combat.
[reskin] audit rename: "Answering Sting" -> "Bog Slam"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Bog Slam) — the sameness metric
[reskin] [gap] moves the grappler and its grappled catch together to another space, leaving the target Prone — "The bog hound takes a grappled creature with it — it lurches and burrows into the muck with its catch, translating both of them through the shallows to a space of its choosing that it can see, leaving the creature Prone there and still in its jaws. Each time it does so the target is dragged beneath the surface, and it must succeed on a Constitution saving throw or take Poisoning damage from the sw" — Bog Hound [seat: action [action/save/condition]] (closest offered: spew) [effect: movement] [menu: shield-bash lure pacify sensory-strike reveal spew thrown-burst-seed wind-up exploiter coating] [same-cell unoffered: swallow gaze-single snare seal random-ray escalating-dread terror-pulse snare-bolt push-prone] [same-seat rejected: swallow:legality trample:style leap:legality thrown-burst:style gaze-single:role snare:role reel:role condition-payoff:legality execute:role seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality ground-burst:legality burrow-ambush:legality obstacle-pull:role escalating-dread:legality terror-pulse:legality snare-bolt:role slow-bolt:role disarm:role push-prone:legality herd:legality drain:legality curse-debt:role blighted-ground:role] [VETOED AFTER ACCEPTANCE: spew never reached the sheet — died at an UNRECORDED drop site]
[reskin] [gap] grabs prey on a hit and drags it under, engulfing it in mire — "The bog hound's hide is a matted rind of fen mud, and while it lies still in shallow water or on open mire it is indistinguishable from the bank; a creature that does not know it is there must succeed on a Perception check to notice it before it acts." — Bog Hound [seat: trait [trait/always/defense]] (closest offered: false-appearance) [effect: condition] [menu: adhesive false-appearance bloodied-fury shielded-mind undead-fortitude spider-climb phobia terrain-walk blood-frenzy pack-tactics relentless-pursuit bound kill-denial noxious-aura truth-aura fear-aura] [same-cell unoffered: shell-withdraw death-restoration uncanny-sense evasion patient-defense sealed-body relic-object guarded-stance mimicry blurred-form] [same-seat rejected: aberrant-ground:legality faultless-tracker:legality web-walker:legality death-restoration:legality uncanny-sense:legality earth-glide:legality tunneler:legality berserk:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality] [landed: false-appearance]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x an UNRECORDED drop site
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x an UNRECORDED drop site) · path homebrew
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

- Traits/Spider Climb — template spider-climb; library draw (seed unstamped); the GM's clause "has learned to climb"; binds the GM's words: climb+climbs+climbing+sheer
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed

**Engine trace**

```
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: ambush from above [behavior] | climbing hooked claws [body] | owl-strong grip on prey [behavior]
[concept] identity: The climbing owlbear opens a fight by dropping on prey from above, using its hooked foreclaws and owl-strong grip to seize a branch or ledge and swing down in a sudden, silent ambush. Every round after that it lunges in for a raking bite and claw strike, then scrambles back up the nearest trunk or rock face to reset the ambush, harrying the party from angles they can't reach. Under pressure it grows more frantic and daring, flinging itself from perch to perch and fighting to the death rather than abandoning its claimed cliff-face territory.
[concept] lore: A mountain-lineage owlbear whose generations in the crags have hardened its claws for gripping stone and bark, it claims a stretch of cliff or canopy and treats anything that climbs into it as prey that has already delivered itself.
[reskin] print canon defenses: HP 58 -> 59, AC 13 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] the sheet's declared ask: climb — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical) [asked: movement] [askMechanic: climb]
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, random-ray, spew, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] signature idea (action): "When the owlbear hits a creature with its Claw attack, the hooked foreclaws bite deep and the owlbear drops its full weight onto the victim, driving it to the ground. The target must succeed on a Strength saving throw or have the Prone condition and take additional bludgeoning damage from the crushing impact." [action/save/condition] [family: payoff] — menu: trample, leap, gaze-single, shield-bash, lure, ground-burst, sensory-strike, disarm, thrown-burst-seed, seal, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rally, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: gaze-single (save/condition), shield-bash (save/condition), lure (save/condition)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: gaze-single, shield-bash, lure, sensory-strike, seal, pacify, escalating-dread, terror-pulse, trample, leap, ground-burst, disarm, thrown-burst-seed, obstacle-pull, slow-bolt, pounce — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: grants the creature a Climb speed or lets it climb without extra movement cost)
[reskin] seat takes its clause: "Hook and Climb" is HANDED "has learned to climb" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] rider refused — a push that undoes its own row: "hook-rider" moves the target away from "Claw", which swings 2x a round; the slot leaves and the seat looks elsewhere
[reskin] fallback respects the call: gaze-single, sensory-strike, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Owlbear's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The owlbear's hooked foreclaws find purchase on any surface, letting it scale sheer stone and bark without a check and move across vertical or inverted surfaces as if they were open ground." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — climb: spider-climb, terrain-walk
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — spider-climb (climb, climbs, climbing)
[reskin] classification handed to the fit call: shape=movement
[reskin] signature template (trait): spider-climb -> Traits/"Hooked Climber" ("The owlbear's hooked foreclaws let it scale sheer stone and bark without a check [verb: climb:concept, climbs:concept, climbing:concept, sheer:idea]")
[reskin] one mechanic, one name: Traits/"Hooked Climber" -> "Spider Climb" — this row is spider-climb and does what every spider-climb row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Claw = none
[reskin] print canon attack: "Claw" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
[reskin] print canon: chassis row leaves — Traits/"Cliff Climber" is the seat's, not the Owlbear's
[reskin] row binds its clause: "Spider Climb" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grants the creature a Climb speed or lets it climb without extra movement cost — "When the owlbear hits a creature with its Claw attack, the hooked foreclaws bite deep and the owlbear drops its full weight onto the victim, driving it to the ground. The target must succeed on a Strength saving throw or have the Prone condition and take additional bludgeoning damage from the crushing impact." — Owlbear [seat: action [action/save/condition]] (closest offered: hook-rider) [effect: movement] [menu: gaze-single shield-bash lure sensory-strike seal pacify escalating-dread terror-pulse trample leap ground-burst disarm thrown-burst-seed obstacle-pull slow-bolt pounce hook-rider] [same-cell unoffered: swallow snare random-ray snare-bolt push-prone reveal] [same-seat rejected: swallow:legality thrown-burst:legality snare:legality reel:legality condition-payoff:legality execute:role hook-drag:role active-toll:role pull-through:role random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality push-prone:role herd:role drain:role curse-debt:role reveal:role wind-up:role exploiter:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: hook-rider never reached the sheet — died at no legal template or seed (no template held the idea and no seed is legal on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x no legal template or seed
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x no legal template or seed) · path twist
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Swarm of Drowned Choirs — a homebrew with a nova

**Concept:** a drowned cathedral choir that sings in one voice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Drowned Choirs | 10 (2014) | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "sings in one voice"
- read: def 12 / off 9 → 10.5; sustained 61 (1 × Throats); nova none; dmg 61

```
Swarm of Drowned Choirs
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

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained, stunned

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Aura of Truth. Any creature that starts its turn within 15 feet of the swarm must succeed on a DC 15 Charisma saving throw or, until the start of its next turn, be unable to speak a deliberate lie.
Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain hit points or gain temporary hit points.

Actions
Throats: Melee Weapon Attack: +7 to hit, reach 0 ft., one target in the swarm's space. Hit: 61 (13d8 + 3) necrotic damage, or 30 (6d8 + 3) necrotic damage if the swarm has half of its hit points or fewer.
Luring Presence (Recharge 5-6): Each creature of the swarm's choice within 60 feet of the swarm that can see or hear it must succeed on a DC 15 Wisdom saving throw or be charmed until the end of its next turn. While charmed this way, the target must move toward the swarm by the safest available route on its turn and can't take reactions.
```

**Where each row came from**

- Traits/Aura of Truth — template truth-aura; library draw (seed unstamped)
- Traits/Swarm — the chassis
- Actions/Throats — the chassis
- Actions/Luring Presence — template lure; library draw (seed unstamped); binds the GM's words: hymn

**Engine trace**

```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] swarm type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a drowned cathedral choir that sings in " | holds: the call reads none in these words | swarm: ✓ ("a drowned cathedral choir that sings in ") | lurker-phantom: the call read "drowned" as not meaning that mechanic here — no override | swarm stands: every key that would override it was read as a figure of speech | swarm: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] resolve: archetype=swarm type=Undead themes=grave/voice mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a single unified hymn sung by many throats [behavior] | drowned cathedral choir [body] | hymn that drags away breath and will [aura]
[concept] identity: The Drowned Choir surges forward as a wall of bloated, waterlogged throats, opening with a single unified hymn that drags the air from nearby lungs and pins hearers in place with grief. Every round it shifts its harmony, voice splitting into several parts to harry different targets at once while the mass rolls over anyone who resists. Gravely patient and utterly certain of its purpose, it never flees — when bloodied it only sings louder, drowning the battlefield in one terrible note.
[concept] lore: A cathedral choir went down with their church during a flood and never stopped singing; now they drift through drowned ruins, gathering new voices to swell their eternal, drowning hymn.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 10 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Drowned Choir" -> "Swarm of Drowned Choirs" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] swarm size clamped: Large -> Medium (print swarms are Medium or Large)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the drowned choir" (kind), which the name does not support
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "one voice" names no absence — nothing in it takes anything away
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (mechanical) [asked: save_single] [askMechanic: snare]
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, snare, seal, random-ray, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm sings a single, unified hymn that drags the air from nearby lungs and pins hearers in place with grief. Each creature within the hymn's reach must make a Wisdom saving throw; on a failed save, it is Charmed by the swarm and has its Speed reduced to 0 until the end of its next turn, as the memory of drowning fills it with sorrow and stillness." [action/save/condition] [family: zone] — menu: thrown-burst, execute, shield-bash, wail, lure, active-toll, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — charm: lure
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), shield-bash (save/condition), thrown-burst (save/damage)
[reskin] classification handed to the fit call: shape=save_single
[reskin] value check: "Drowning Hymn (Recharge 5-6)" EV 66 vs floor 31.2 (one attack of 1) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Drowning Hymn (Recharge 5-6)" ("A Wisdom save that leaves nearby hearers Charmed and compelled toward the swarm, [verb: hymn:idea]")
[reskin] signature idea (trait): "The Drowned Choir's hymn is relentless: whenever a creature charmed by the swarm starts its turn, it must repeat the saving throw or take psychic damage as the voices burrow into its mind. The choir never stops singing, and the charm lingers like water in the lungs." [trait/start_of_turn/damage] [family: payoff] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, mimicry, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), blood-frenzy (always/damage)
[reskin] keys would have bound: trait — mimicry (voices)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: truth-aura, fear-aura, blood-frenzy, pack-tactics, assassinate, phobia, berserk — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "truth-aura" as nearest; it lands rather than the row being dropped (what it wanted: charmed creatures that start their turn repeat the charm's save or take psychic )
[reskin] free signature row: trait — "truth-aura" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Drowned Hymn" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): truth-aura -> Traits/"Drowned Hymn" ("The idea is a start-of-turn repeat-save punishment for charmed creatures, not an [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Drowned Hymn" -> "Aura of Truth" — this row is truth-aura and does what every truth-aura row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Drowning Hymn (Recharge 5-6)" -> "Luring Presence (Recharge 5-6)" — this row is lure and does what every lure row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "sings in one voice"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:sings in one voice"]
[reskin] clause answered in prose: "sings in one voice" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Throats = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] bloodied half re-derived: "Throats" — 14 (4d6) -> 30 (6d8 + 3), half of the main 61 on the main's own +3 (print's ratio and print's modifier)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Aura of Truth" [trait/start_of_turn/condition]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Aura of Truth")
audit finding below confidence gate: Luring Presence (Recharge 5-6) The name promises drawing victims in as its core mechanic, but the effect only applies Charmed plus forced movement toward the swarm — an apparent overlap with the chassis's Luring label rather than a distinct lure mechanic; more importantly the name describes the creature's action as 'presence' while the text delivers a save-or-Charmed pull, which is fine in kind but the entry is mislabeled relative to what it does.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] charmed creatures that start their turn repeat the charm's save or take psychic damage — "The Drowned Choir's hymn is relentless: whenever a creature charmed by the swarm starts its turn, it must repeat the saving throw or take psychic damage as the voices burrow into its mind. The choir never stops singing, and the charm lingers like water in the lungs." — Swarm of Drowned Choirs [seat: trait [trait/start_of_turn/damage]] (closest offered: truth-aura) [effect: damage] [menu: truth-aura fear-aura blood-frenzy pack-tactics assassinate spider-climb phobia terrain-walk bloodied-fury death-restoration berserk shielded-mind evasion relentless-pursuit bound guarded-stance undead-fortitude mimicry kill-denial] [same-cell unoffered: energy-aura delayed-brand] [same-seat rejected: energy-aura:legality noxious-aura:legality warded-mending:legality gaze-aura:legality] [landed: truth-aura]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Vampire — a legendary

**Concept:** name: Vampire | who keeps a garden of thorns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire | 13 (2014) | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Sure Footing. Difficult terrain composed of its garden of thorns doesn't cost the vampire extra movement, and the vampire can move across its garden of thorns without needing to make an ability check.
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
Multiattack: The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Lingering Brand.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Lingering Brand: One creature within 60 feet of the vampire must succeed on a DC 17 Constitution saving throw or be branded: it takes 7 (2d6) necrotic damage at the start of each of its turns until it uses its action to pull the barbs free.
Bite (Bat or Vampire Form Only): One creature within 5 feet of the vampire that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grave Strike — print's own row, renamed
- Actions/Lingering Brand — template delayed-brand; library draw (seed unstamped); binds the GM's words: poison+seed
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row
- Traits/Sure Footing — template terrain-walk; library draw (seed unstamped)
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row
- Legendary Actions/Deathless Strike — print's own row
- Legendary Actions/Beguile — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: none claimed
[concept] signature elements: a garden of blood-fed thorns [aura] | lurking unseen among the briars [behavior] | thorn vines that snare and drain [body]
[concept] identity: The Thorn-Gardener opens from silence, unseen among its rose-thorn walls, and plants a barbed, blood-drinking vine in a single lunging strike from cover before melting back into the briars. Each round it circles its garden, loosing thorn volleys and dragging grappled prey into the hedge to bleed, but it treats the fight as pruning — patient, savoring, and never so foolish as to trade blows in the open. Cornered or burned, it does not flee; it coils deeper into the thorns and fights with the fury of a thing defending its rooted heart.
[concept] lore: Bound to the soil where it was buried, this vampire nourished a hedge of iron-rose thorns from its own hungry blood, and now it tends the garden as both larder and lure, gathering passers-by to feed the roots.
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
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "keeps a garden of thorns" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (mechanical) [asked: at_will/condition] [askMechanic: snare]
[reskin] body verdicts: 37 of 37 answered; not true of this body: seal, wail, active-toll, random-ray, spew, shell-withdraw, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst
[reskin] signature idea (action): "Each time the vampire hits a creature with Thorn Lash, the wound fills with thorn seeds. The target is poisoned until it receives magical healing or spends its action pulling the barbs free; while poisoned this way, it takes necrotic damage at the start of each of its turns." [rider/on_hit/condition] [family: payoff] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain (+ shelf: gaze-single, execute, lure, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, snare, shield-bash, push-prone, reveal, blink, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), stunning-strike (on_hit/condition), pounce (on_hit/condition)
[reskin] keys would have bound: action — drain (vampire)
[reskin] classification handed to the fit call: shape=condition when=at_will
[reskin] word match declined by the call: contagion, composed:payoff:condition, life-drain — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "delayed-brand" as nearest; it lands rather than the row being dropped (what it wanted: on-hit thorn seed poisoning that ticks necrotic damage each turn until magical h)
[reskin] seat takes its clause: "Thorn Seeds" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: delayed-brand -> Actions/"Thorn Seeds" ("Each time the vampire hits a creature with Thorn Lash, the wound fills with thorn seeds. The target is poisoned until it receives magical healing or spends its  [verb: poison:idea, seed:idea]")
[reskin] signature idea (trait): "The vampire can move through the tangled thorns of its garden without harm, and while inside any patch of thick vegetation it is heavily obscured to creatures beyond it. It always knows when a living creature touches or enters its thorn hedge." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, berserk
[reskin] lead by this seat's own clause: trait — "snare" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: shape=condition when=at_will
[reskin] word match declined by the call: spider-climb, bound — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "terrain-walk" has no key-table verb, but the call quotes "keeps a garden of thorns" from the description
[reskin] signature template (trait): terrain-walk -> Traits/"Thorn Garden Stride" ("The vampire moves through its tangled thorn garden without harm — thorn terrain  [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Thorn Seeds" -> "Lingering Brand" — this row is delayed-brand and does what every delayed-brand row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Thorn Garden Stride" -> "Sure Footing" — this row is terrain-walk and does what every terrain-walk row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Thorn Lash = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Thorn Lash" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "the vampire makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Perception +7, Stealth +14" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance (3/Day, or 4/Day in Lair) — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon legendary: Deathless Strike, Beguile — the Vampire's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Lingering Brand.
[reskin] asked but unanswered: "keeps a garden of thorns" asked for at_will and no row binds the clause
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Beguile" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on-hit thorn seed poisoning that ticks necrotic damage each turn until magical healing or an action ends it — "Each time the vampire hits a creature with Thorn Lash, the wound fills with thorn seeds. The target is poisoned until it receives magical healing or spends its action pulling the barbs free; while poisoned this way, it takes necrotic damage at the start of each of its turns." — Vampire [seat: action [rider/on_hit/condition]] (closest offered: delayed-brand) [effect: condition] [menu: contagion stunning-strike pounce life-drain composed:payoff:condition charge-push hook-rider isolation delayed-brand obstacle-pull self-invisibility coating] [same-cell unoffered: affliction snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:legality snatch:legality bolt-restrain:role bolt-drag:legality bolt-mark:role charge:role] [landed: delayed-brand]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path twist
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Pit Scree-Maw — one marked soft

**Concept:** a quarry-pit thing of living scree that buries what it catches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Scree-Maw | 5 (2014) | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3 (print at 5 reads 2.5–9.5, n=25)
- **dropped clause:** "buries what it catches"
- read: def 2 / off 4 → 3; sustained 32 (2 × Talus Grip); nova none; dmg 32

```
Pit Scree-Maw
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

Smother. As a bonus action, the scree-maw smothers one Medium or smaller creature it is grappling. While smothered, the target is blinded and restrained, has total cover against attacks and other effects outside the scree-maw, and takes 7 (2d6) bludgeoning damage at the start of each of the scree-maw's turns. The scree-maw can have only one creature smothered at a time. If the scree-maw takes 15 damage or more in a single turn from the smothered creature, the scree-maw must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree-maw. If the scree-maw dies, a smothered creature pulls free prone by using 5 feet of movement.
Grinding Distraction (Bonus Action). One creature within 30 feet must succeed on a DC 14 Wisdom saving throw or, until the start of the scree-maw's next turn, have disadvantage on attack rolls against creatures other than the scree-maw.

Actions
Multiattack: The scree-maw makes two Talus Grip attacks.
Talus Grip: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Talus Grip — the chassis
- Bonus Actions/Smother — binds the GM's words: smother+swallow+swallows+engulf+engulfs+devour+devours+gulp+entomb+cocoon+whelm
- Bonus Actions/Grinding Distraction — template aggro-curse; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "burles what it catches" | brute-grappler: ✓ ("burles what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/grasping mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: surges up from the rubble as living scree [body] | seizes and drags prey down to bury it [behavior] | smothering, entombing collapse of stones [aura]
[concept] identity: The scree-maw lurks at the bottom of flooded quarry pits, indistinguishable from the rubble until it surges up in a churning landslide of loose stone to seize prey in its crushing talus-grip. Once it has a hold, it simply collapses backward and drags its catch down into the pit, smothering and burying it under an avalanche of living rubble — grinding and entombing every round until nothing moves. It is patient, mindless, and utterly relentless: a collapsed pit-thing that fights to the death because it cannot conceive of retreat.
[concept] lore: Born where a quarry's discarded spoil-heaps grew saturated with elemental earth, the pit-thing sinks anything that walks too close to its buried den, hoarding the drowned dead like buried treasure.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Smother — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scree-maw" — the call's own answer (kind), built from the name
[reskin] inline form: "the scree-maw" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: condition] [askMechanic: grapple]
[reskin] body verdicts: 4 of 30 answered; not true of this body: faultless-tracker
[reskin] signature idea (action): "As a bonus action, the scree-maw violently retracts its buried bulk, dragging every creature it is grappling with it. Each grappled creature must succeed on a Strength saving throw or be pulled into an unoccupied space within 5 feet of the scree-maw." [bonus_action/save/movement] [family: drag] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus (+ shelf: leap, condition-payoff, shield-bash, ground-burst, burrow-ambush, thrown-burst-seed, wind-up, exploiter, lure, pull-through, pacify, slow-bolt, sensory-strike, disarm, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: aggro-curse (save/movement), exploiter (save/damage), thrown-burst-seed (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] word match declined by the call: aggro-curse, focus, self-invisibility, second-wind, own-turn-punisher, exploiter, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "aggro-curse" as nearest; it lands rather than the row being dropped (what it wanted: pulls each grappled creature into a space within 5 feet of the creature on a fai)
[reskin] free signature row: action — "aggro-curse" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] value check: "Retracting Drag" EV 5.1 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Retracting Drag" ("The idea is a bonus-action drag that pulls grappled creatures into a space besid [shape fit, no verb match]")
[reskin] signature idea (trait): "The scree-maw can Burrow through solid stone and earth, leaving no tunnel behind. While burrowed, it has tremorsense and can pinpoint the location of any creature touching the ground within its tremorsense range." [trait/always/movement] [family: breach] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: uncanny-sense, weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: adhesive (always/condition), spider-climb (always/movement), terrain-walk (always/movement)
[reskin] keys would have bound: trait — terrain-walk, aberrant-ground (scree)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] word match declined by the call: terrain-walk, tunneler, spider-climb, aberrant-ground — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "earth-glide" as nearest; it lands rather than the row being dropped (what it wanted: grabs a grounded target and buries it, imposing Grappled/Restrained that drags i)
[reskin] free signature row: "Buried Prey" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): earth-glide -> Traits/"Buried Prey" ("The idea describes burrowing through solid stone without a trace and pinpointing [verb: earth:idea, stone:idea]")
[reskin] one mechanic, one name: Bonus Actions/"Retracting Drag" -> "Binding Mark" — this row is aggro-curse and does what every aggro-curse row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Buried Prey" -> "Earth Glide" — this row is earth-glide and does what every earth-glide row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "buries what it catches"; one targeted call with the sheet as context
[reskin] authored trait refused: "Grave Inhumation" — no mechanic in the effect; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:buries what it catches"]
[reskin] clause answered in prose: "buries what it catches" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Talus Grip = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free row over budget: Traits/"Earth Glide" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Binding Mark" [bonus_action/save/movement]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Binding Mark")
[reskin] audit rename: "Binding Mark" -> "Grinding Distraction"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] pulls each grappled creature into a space within 5 feet of the creature on a failed save — "As a bonus action, the scree-maw violently retracts its buried bulk, dragging every creature it is grappling with it. Each grappled creature must succeed on a Strength saving throw or be pulled into an unoccupied space within 5 feet of the scree-maw." — Pit Scree-Maw [seat: action [bonus_action/save/movement]] (closest offered: aggro-curse) [effect: movement] [menu: aggro-curse exploiter thrown-burst-seed self-invisibility focus second-wind own-turn-punisher] [same-cell unoffered: reel hook-drag pull-through obstacle-pull slow-bolt disarm herd] [same-seat rejected: none] [landed: aggro-curse]
[reskin] [gap] grabs a grounded target and buries it, imposing Grappled/Restrained that drags it down with the creature — "The scree-maw can Burrow through solid stone and earth, leaving no tunnel behind. While burrowed, it has tremorsense and can pinpoint the location of any creature touching the ground within its tremorsense range." — Pit Scree-Maw [seat: trait [trait/always/movement]] (closest offered: earth-glide) [effect: condition] [menu: adhesive spider-climb terrain-walk aberrant-ground earth-glide tunneler relentless-pursuit bound false-appearance phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude uncanny-sense truth-aura fear-aura] [same-cell unoffered: blink web-walker zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: faultless-tracker:legality web-walker:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: earth-glide never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path homebrew
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Glacier Heart — bands soft

**Concept:** a glacier's heart given legs, trailing a wake of killing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Heart | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 7–15, n=12)
- gates · soft · control-aoe-ungated: Actions/Sundering Shove: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
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

Primordial

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Rime Aura. At the end of each of the glacier heart's turns, each creature within 5 feet of the glacier heart takes 13 (3d8) cold damage.
Cold Absorption. Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster. The glacier heart deals double damage to objects and structures.

Actions
Multiattack: The glacier heart makes two Ice Leg attacks. It can replace one attack with a use of Sundering Shove.
Ice Leg: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
Sundering Shove: Each creature in a 30-foot cone must succeed on a DC 17 Strength saving throw or be pushed up to 15 feet away from the glacier heart and be knocked prone.
```

**Where each row came from**

- Traits/Rime Aura — template energy-aura; library draw (seed unstamped)
- Traits/Cold Absorption — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Ice Leg — the chassis
- Actions/Killing Cold — the chassis
- Actions/Sundering Shove — template push-prone; library draw (seed unstamped); binds the GM's words: knock

**Engine trace**

```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/forged mind=sapient style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a glacier's heart given legs [body] | trailing a wake of killing cold [aura] | pulverizing slams that break what it walks through [behavior]
[concept] identity: The Glacier's Heart opens the fight by simply walking forward, its stone-veined ice body shearing through terrain and structure while the killing cold of its wake reaches for the nearest living thing; each round after, it slams and crushes with its legs and mass while its aura bleeds heat from everything around it, growing more relentless as prey slows and freezes. It does not toy, taunt, or retreat — a made heart has no fear, so it grinds toward whatever beats warm until nothing does.
[concept] lore: Carved from the impossible core of a living glacier and set on legs of ancient, rune-mortared ice, it walks out from its parent ice to keep the world's heat from reaching the heart that must never thaw.
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Killing Cold = literal; Winter's Grip = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "trailing a wake of killing cold" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: at_will/save_area] [askMechanic: zone]
[reskin] body verdicts: 27 of 27 answered; not true of this body: herd, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, adhesive, faultless-tracker, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the glacier heart moves, it does not walk around the ground — it walks through it, grinding the terrain to frozen rubble. Ground it passes over becomes difficult terrain crusted with cold; a creature that starts its turn on that broken ground must succeed on a Constitution saving throw or be knocked Prone as the ice shears and gives way beneath its feet." [action/always/movement] [family: zone] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, drain, exploiter, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, feint-slip, stunning-strike, charge-push, pounce, life-drain)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: condition-payoff (save/damage), shield-bash (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — execute (kill)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area when=at_will
[reskin] word match declined by the call: condition-payoff, exploiter, terror-pulse, lure, escalating-dread — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest; it lands rather than the row being dropped (what it wanted: a lingering trail of broken ground left behind the creature's movement that forc)
[reskin] value check: "Rime Trail" EV 35.2 vs floor 16.6 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: push-prone -> Actions/"Rime Trail" ("the idea is ground it passes over becomes difficult terrain and creatures starti [verb: knock:idea]")
[reskin] signature idea (trait): "The killing cold clings to whatever the glacier heart has already touched: a creature that has taken Cold damage from the glacier heart since the end of its last turn cannot regain Hit Points, as the frost in its wounds sets and refuses to thaw." [trait/always/condition] [family: payoff] — menu: spider-climb, phobia, terrain-walk, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), phobia (always/condition)
[reskin] keys would have bound: trait — aberrant-ground, terrain-walk (wake, glacier)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area when=at_will
[reskin] word match declined by the call: energy-aura, fear-aura, truth-aura, phobia, berserk — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "energy-aura" as nearest; it lands rather than the row being dropped (what it wanted: prevents a chilled creature from regaining Hit Points)
[reskin] pick kept on the GM's own words: trait — "energy-aura" has no key-table verb, but the call quotes "trailing a wake of killing cold" from the description
[reskin] signature template (trait): energy-aura -> Traits/"Killing Cold Wake" ("The idea is that frost from the killing cold sets in wounds, preventing the heal [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Killing Cold Wake" -> "Searing Aura" — this row is energy-aura and does what every energy-aura row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Rime Trail" -> "Sundering Shove" — this row is push-prone and does what every push-prone row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Ice Leg = none; Killing Cold = none; Winter's Grip = none
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Sundering Shove.
[reskin] asked but unanswered: "trailing a wake of killing cold" asked for at_will and no row binds the clause
[reskin] audit rename: "Searing Aura" -> "Rime Aura"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a lingering trail of broken ground left behind the creature's movement that forces a save or Prone on creatures starting — "When the glacier heart moves, it does not walk around the ground — it walks through it, grinding the terrain to frozen rubble. Ground it passes over becomes difficult terrain crusted with cold; a creature that starts its turn on that broken ground must succeed on a Constitution saving throw or be knocked Prone as the ice shears and gives way beneath its feet." — Glacier Heart [seat: action [action/always/movement]] (closest offered: push-prone) [effect: movement] [menu: condition-payoff shield-bash escalating-dread terror-pulse push-prone drain exploiter execute lure pacify sensory-strike curse-debt reveal] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:legality zone-seed:role] [landed: push-prone]
[reskin] [gap] prevents a chilled creature from regaining Hit Points — "The killing cold clings to whatever the glacier heart has already touched: a creature that has taken Cold damage from the glacier heart since the end of its last turn cannot regain Hit Points, as the frost in its wounds sets and refuses to thaw." — Glacier Heart [seat: trait [trait/always/condition]] (closest offered: energy-aura) [effect: resource] [menu: aberrant-ground energy-aura phobia berserk spider-climb terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration uncanny-sense shielded-mind relentless-pursuit bound undead-fortitude truth-aura fear-aura] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:legality adhesive:legality faultless-tracker:legality web-walker:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [landed: energy-aura]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path homebrew
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Reliquary-Glut — bands soft

**Concept:** a cathedral-vault ooze that digests reliquaries

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reliquary-Glut | 9 (2014) | ooze-9 | FAIL: escape-dc, escape-dc | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · escape-dc: Traits/Adhesive: escape DC 15, derived 16
- derivation · fail · escape-dc: Actions/Hooked Lash: escape DC 15, derived 16
- bands · soft · band: reads CR 6.5 (print at 9 reads 5.5–13, n=8)
- **dropped clause:** "digests reliquaries"
- read: def 5 / off 8 → 6.5; sustained 56 (2 × Pseudopod); nova none; dmg 56

```
Reliquary-Glut
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

acid, necrotic

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

Adhesive. The reliquary-glut adheres to anything that touches it. A Huge or smaller creature adhered to the reliquary-glut is also grappled by it (escape DC 15). Ability checks made to escape this grapple have disadvantage.
Amorphous. The reliquary-glut can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form. A creature that touches the reliquary-glut or hits it with a melee attack while within 5 feet of it takes 9 (2d8) necrotic damage.
Spider Climb. The reliquary-glut can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The reliquary-glut makes two Pseudopod attacks. It can replace one attack with a use of Hooked Lash.
Pseudopod: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 28 (7d6 + 4) bludgeoning damage.
Hooked Lash: One creature within 30 feet of the reliquary-glut must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet straight toward the reliquary-glut by a rippling pseudopod of gilt and bone and be grappled (escape DC 15).
```

**Where each row came from**

- Traits/Adhesive — template adhesive; library draw (seed unstamped)
- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Pseudopod — the chassis
- Actions/Hooked Lash — template hook-drag; library draw (seed unstamped); binds the GM's words: claw

**Engine trace**

```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "digests reliquaries" | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("a cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze themes=devouring/grave mind=mindless style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: engulfing and dissolving reliquaries [behavior] | a cathedral-vault mass of holy rot [body] | gilt and bone dissolved within it [object]
[concept] identity: The reliquary-glut swells through a cathedral's vaulted dark, oozing over altars and engulfing whole reliquaries to dissolve their gilt and bone within itself. Each round it rolls forward in slow, deliberate surges, choosing the richest shrine as its target and dragging engulfed victims deeper into its mass. It is an unhurried, patient feeder — it does not flee, does not tire, and simply continues consuming whatever it has caught until nothing remains to digest.
[concept] lore: Spilled from a cracked reliquary vault beneath a ruined cathedral, this rot-ooze has grown gorged on centuries of sanctified gold and bone, and now creeps from chapel to chapel seeking the holiest vessels to swallow.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reliquary-glut" — the call's own answer (kind), built from the name
[reskin] inline form: "the reliquary-glut" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (mechanical) [asked: save_single] [askMechanic: drain]
[reskin] body verdicts: 37 of 37 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, snare-bolt, herd, zone-seed, blink, shell-withdraw, rally, phase-slip, false-appearance, absorption, bloodied-burst, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, push-prone, thrown-burst-seed, drain, wind-up, blighted-ground, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating (the sheet cannot render them)
[reskin] signature idea (action): "The reliquary-glut surges over a creature it has already caught, folding it into its translucent mass. The target must succeed on a Dexterity saving throw or be swallowed whole — Restrained, unable to breathe, and blinded inside the glut, taking Necrotic damage at the start of each of its turns as the gilt and bone dissolve, until it claws free by succeeding on a Strength check against the ooze's " [action/save/condition] [family: drag] — menu: trample, leap, thrown-burst, execute, shield-bash, lure, hook-drag, pull-through, ground-burst (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] lead by this seat's own clause: action — "drain" from the clause this seat serves, not the sheet's "swallow"
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), trample (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple shape=save_single
[reskin] word match declined by the call: shield-bash, lure, trample, leap, thrown-burst, execute, pull-through, ground-burst — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-drag" as nearest; it lands rather than the row being dropped (what it wanted: swallows a grabbed foe so it is Restrained, Blinded, and unable to breathe, taki)
[reskin] value check: "Gilded Engulfment" EV 14.9 vs floor 14 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Gilded Engulfment" ("The idea is a swallow-whole grapple that restrains, blinds, smothers, and deals  [verb: claw:idea]")
[reskin] signature idea (trait): "The reliquary-glut can taste consecrated wealth through stone and dark — it always knows the direction and rough distance to the most valuable reliquary, altar, or holy vessel within a great distance of it, and cannot be deceived about the location of such objects by illusion, concealment, or misdirection. Its slow climb is unerring: it never loses the trail toward its richest target, and when suc" [trait/always/movement] [family: mark] — menu: adhesive, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: relentless-pursuit (always/movement), bound (always/movement), adhesive (always/condition)
[reskin] classification handed to the fit call: mechanic=grapple shape=save_single
[reskin] word match declined by the call: uncanny-sense, bound — the key word does not mean the mechanic here
[reskin] free signature row: trait — "adhesive" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "engulfing and dissolving reliquaries" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Adhesive" — the trait seat cannot quote the GM, but the call names the element it expresses: "engulfing and dissolving reliquaries". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): adhesive -> Traits/"Adhesive" ("the reliquary-glut digests reliquaries by engulfing and adhering to the holy wea [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Gilded Engulfment" -> "Hooked Lash" — this row is hook-drag and does what every hook-drag row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Pseudopod = none; Gilded Engulfment = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] climb speed: Climb 20 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Necrotic (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid, Necrotic; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Hooked Lash.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Adhesive" [trait/always/condition]
[reskin] element expressed: Adhesive carries "engulfing and dissolving reliquaries" — "A Huge or smaller creature adhered to the reliquary-glut is also Grappled by it "
audit finding below confidence gate: Hooked Lash The lash reaches 30 feet and drags the target with a pseudopod, but the statblock's Pseudopod attack has only 10 ft. reach and the ooze has no bodily extent or reach expressed beyond that, so the fiction of lashing 30 feet is unsupported by the block and creates an unreferenced appendage.
audit finding below confidence gate: Adhesive The only escape is a check with Disadvantage; there is no repeat save or other rules-legal path, so a creature once adhered has no reliable means to leave the grapple short of the DC-15 check.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] swallows a grabbed foe so it is Restrained, Blinded, and unable to breathe, taking necrotic damage each of its turns unt — "The reliquary-glut surges over a creature it has already caught, folding it into its translucent mass. The target must succeed on a Dexterity saving throw or be swallowed whole — Restrained, unable to breathe, and blinded inside the glut, taking Necrotic damage at the start of each of its turns as the gilt and bone dissolve, until it claws free by succeeding on a Strength check against the ooze's " — Reliquary-Glut [seat: action [action/save/condition]] (closest offered: hook-drag) [effect: condition] [menu: shield-bash lure trample leap thrown-burst execute hook-drag pull-through ground-burst] [same-cell unoffered: swallow gaze-single snare seal random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal] [same-seat rejected: swallow:legality gaze-single:legality snare:role reel:role condition-payoff:legality seal:legality active-toll:legality random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality disarm:role herd:legality curse-debt:role reveal:role exploiter:legality] [landed: hook-drag]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] record reconciled: "Adhesive" no longer imposes Grappled — the clause left, so the record goes with it
[reskin] record reconciled: "Hooked Lash" keeps Grappled and drops Restrained — only those clauses left
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Granite Exile — bands soft

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Granite Exile | 9 (2014) | brute-9 | ok | SOFT: aim-atk | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | FAIL: lack-honored | ok |

- bands · soft · aim-atk: attack +10 against the aim's +7
- gates · soft · control-aoe-ungated: Actions/Dread Presence: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- reader · fail · lack-honored: the GM asked for an absence — "understands no Common" — and the sheet still carries it
- **dropped clause:** "understands no Common"
- read: def 7 / off 10 → 8.5; sustained 60 (2 × Stone Club); nova none; dmg 60

```
Granite Exile
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
Multiattack: The exile makes two attacks: one with its Stone Club and one with its Boulder. It can replace one attack with a use of Dread Presence.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 27 (6d6 + 6) bludgeoning damage.
Dread Presence: Each creature of the exile's choice within 30 feet of it that can see or hear it must succeed on a DC 18 Wisdom saving throw or be frightened until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row
- Actions/Dread Presence — template terror-pulse; library draw (seed unstamped); binds the GM's words: roar+bellow

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant exile" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a stone giant exile who speaks only Gian…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bellowing in a language none around it understands [behavior] | granite hide and fists [body] | hurled boulders torn from the earth [object]
[concept] identity: A granite-skinned stone giant exile wades in with both fists, opening by hurling a boulder torn from the hillside before closing to trade blows at arm's length. Every round after that it simply keeps swinging — pulverizing stone fists into anything within reach — while bellowing in Giant at foes who cannot answer. It does not flee when bloodied; exile left it with nothing to protect but its own pride, so it fights to the death rather than yield to creatures it considers beneath its language.
[concept] lore: Cast out of its mountain stead for some quarrel the steading will not forgive, this giant roams the high scree and old ruins alone, speaking to no one because it understands no one, and it reads every stranger as a trespasser to be smashed and forgotten.
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
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] extraction: 5 of 9 model clauses quote nothing the user typed and leave the record ("granite-skinned", "wades in with both fists", "hurling a boulder", …)
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The exile's war-bellow rolls out as an emanation, and only creatures that can understand Giant are spared its bite — every other creature that hears the roar is deafened and rattled, losing the next instant to ringing ears and a hammering heart." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] word match declined by the call: shield-bash, push-prone, lure, pacify, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] free signature row: "War Bellow (2/Day)" — a print body takes only what the user's words ask, but the call names the element it expresses: "bellowing in a language none around it understands". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: terror-pulse -> Actions/"War Bellow (2/Day)" ("The war-bellow rolls out as an emanation, and only creatures that understand Gia [verb: roar:idea, bellow:idea]")
[reskin] signature idea (trait): "The giant's granite hide drinks the shock of whatever is trampled underfoot — while it moves through rubble, scree, or broken stone, the ground itself bruises it no more than it bruises the hill it came from." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): spider-climb, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] word match declined by the call: spider-climb, relentless-pursuit, bound, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "shielded-mind" as nearest; it lands rather than the row being dropped (what it wanted: a row that makes the creature immune to a damage type or lets it ignore the dama)
[reskin] row kept the template's own name: trait — "Shielded Mind" is shielded-mind's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] pick kept on the GM's own words: trait — "shielded-mind" has no key-table verb, but the call quotes "a stone giant exile who speaks only giant and understands no common" from the description
[reskin] trait declined: "Shielded Mind" — a print body takes only what the user's words ask; the call quotes "a stone giant exile who speaks only giant and understands no common", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries
[reskin] one mechanic, one name: Actions/"War Bellow (2/Day)" -> "Horrid Display (2/Day)" — this row is terror-pulse and does what every terror-pulse row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Fist = none; Boulder = none
[reskin] print canon attack: "Fist" -> "Stone Club" — the Stone Giant's own row
[reskin] dead control row: "Horrid Display" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrid Display.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Horrid Display" [action/save/condition]
[reskin] element claim revoked: "Horrid Display" claims "bellowing in a language none around it understands" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Horrid Display")
[reskin] audit rename: "Horrid Display" -> "Dread Presence"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a row that makes the creature immune to a damage type or lets it ignore the damage of rough terrain it moves through — "The giant's granite hide drinks the shock of whatever is trampled underfoot — while it moves through rubble, scree, or broken stone, the ground itself bruises it no more than it bruises the hill it came from." — Granite Exile [seat: trait [trait/always/movement]] (closest offered: shielded-mind) [effect: defense] [menu: spider-climb relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude truth-aura fear-aura] [same-cell unoffered: blink terrain-walk aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: shielded-mind never reached the sheet — died at an UNRECORDED drop site]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x an UNRECORDED drop site
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x an UNRECORDED drop site) · path twist
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
- read: def 1 / off 4 → 2.5; sustained 20 (2 × Banner Pole); nova Wheeling Charge 24; dmg 29

```
Krennik Skullstandard
Small humanoid, chaotic evil
Armor Class

14 (leather)

Hit Points: 

77 (14d6 + 28)

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

Fear Aura. Krennik emanates an aura in a 20-foot-radius sphere while it is not incapacitated. Any enemy that starts its turn in the aura must succeed on a DC 13 Wisdom saving throw or be frightened until the start of its next turn.
Skirmisher. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility. As a bonus action, Krennik takes the Dash or Disengage action.
Rampage (1/Day). As a bonus action, immediately after dealing damage to a creature that has half of its hit points or fewer, Krennik moves up to half its speed, and it makes one Banner Pole attack.

Actions
Multiattack: Krennik makes two attacks: one with Banner Pole and one with Hurl Javelin.
Banner Pole: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is knocked prone.
Hurl Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.
Wheeling Charge (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save and being knocked prone.
```

**Where each row came from**

- Traits/Fear Aura — template fear-aura; library draw (seed unstamped); binds the GM's words: frightens+frightening+flee+flees
- Traits/Skirmisher — the chassis
- Actions/Multiattack — the chassis
- Actions/Banner Pole — weapon spear
- Actions/Hurl Javelin — weapon javelin
- Actions/Wheeling Charge — the chassis
- Bonus Actions/Mounted Agility — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: wheeling mounted ride-down charges with a spear and banner-pole [behavior] | the worg mount that carries him past the target [body] | tattered skull-standard banner [object]
[concept] identity: Krennik Skullstandard opens a fight with a wheeling, bellowed charge, driving his worg straight at the largest enemy and sweeping his banner-pole through them as he rides past. After that first pass he circles at a canter, using the worg's speed to re-line up charges and cut off any prey that breaks and runs, and he fights with a raider's joy, taunting and herding his quarry rather than cutting it down cleanly. Only when he is bloodied and the worg is limping does he turn to flight, spending every ounce of the beast's speed to escape and harry another day.
[concept] lore: Krennik Skullstandard is a goblin raider-chief who has ridden the same scruffy worg since he stole it as a whelp, and he raids the high passes not for plunder so much as to keep his banner wet with the blood of his enemies and his name repeated in fear.
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] body verdicts: 23 of 23 answered; not true of this body: snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tattered skull-standard is what herds the quarry: when Krennik hits with Banner Pole, the fluttering standard shrieks in the wind and the target must make a Wisdom saving throw or have the Frightened condition until the start of Krennik's next turn, its eyes dragged to the grisly trophies instead of to the pole coming around again." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, charge-push, pounce, isolation, bolt-mark, charge, bolt-restrain (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte)
[reskin] verb gate stands down: action — no template shares a verb, but 5 template(s) whose declared stamps match the idea (on_hit/condition): affliction, contagion, pounce, bolt-mark, bolt-restrain; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), pounce (on_hit/condition)
[reskin] word match declined by the call: affliction, contagion, pounce, bolt-mark, bolt-restrain, charge-push, isolation, charge — the key word does not mean the mechanic here
[reskin] closest refused: action — "composed:payoff:condition" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The tattered skull-standard is what herds the quarry: when Krennik hits with Banner Pole, the fluttering standard shrieks in the wind and the target must make a Wisdom saving throw or have the Frightened condition until the start of Krennik's next turn, its eyes dragged to the grisly trophies instead of to the pole coming around again." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, pounce, bolt-mark, bolt-restrain, composed:payoff:condition, charge-push, isolation, charge)
[reskin] value check: "Rampage (1/Day)" EV 8.5 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Krennik's banner is his name made flesh — while the standard flies, creatures that flee from him cannot shake the sound of it, and a creature Frightened of Krennik that ends its turn with the banner in sight must make a Wisdom saving throw or be unable to move farther away from him until its next turn, herded back toward the worg's hooves." [trait/start_of_turn/movement] [family: mark] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does movement; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), spider-climb (always/movement)
[reskin] word match declined by the call: fear-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "fear-aura" as nearest; it lands rather than the row being dropped (what it wanted: instead of only frightening creatures at the start of their turn, the row must, )
[reskin] free signature row: "Skull Standard's Herding" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): fear-aura -> Traits/"Skull Standard's Herding" ("The idea is a fear-driven compulsion that herds a Frightened creature back towar [verb: frightens:idea, frightening:idea, flee:idea, flees:idea]")
[reskin] one mechanic, one name: Traits/"Skull Standard's Herding" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Banner Pole = spear; Hurl Javelin = javelin
[reskin] weapon declared: "Banner Pole" is a spear — the call's own answer (the name alone read quarterstaff)
[reskin] weapon table: "Hurl Javelin" — thrown, range 30/120
[reskin] chassis nova: "Wheeling Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] attack name by anatomy: "Banner Pole" -> "Banner Pole" — pole deals Bludgeoning, not Piercing
[reskin] name-canon stands down: the path answered homebrew on "riding a worg" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Fear Aura" [trait/start_of_turn/condition]
[reskin] save re-derived after a retype: Actions/Wheeling Charge — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Fear Aura")
audit finding below confidence gate: Fear Aura The aura is turned off by Incapacitated but the block provides no area definition apart from the Emanation and no statement of whether creatures that enter the aura mid-turn are affected.
[reskin] audit rewrite blocked — "Fear Aura" is engine-authored chassis text
[reskin] audit rename: "Worg Rider" -> "Skirmisher"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Rampage (1/Day)) — the sameness metric
[reskin] [gap] On a hit, the target makes a Wisdom save or gains the Frightened condition until the start of the creature's next turn — "The tattered skull-standard is what herds the quarry: when Krennik hits with Banner Pole, the fluttering standard shrieks in the wind and the target must make a Wisdom saving throw or have the Frightened condition until the start of Krennik's next turn, its eyes dragged to the grisly trophies instead of to the pole coming around again." — Krennik Skullstandard [seat: action [rider/on_hit/condition]] (closest offered: composed:payoff:condition) [effect: condition] [menu: affliction contagion pounce bolt-mark bolt-restrain composed:payoff:condition charge-push isolation charge] [same-cell unoffered: stunning-strike life-drain snatch] [same-seat rejected: stunning-strike:legality hook-rider:legality life-drain:legality snatch:legality bolt-drag:role] [row dropped]
[reskin] [gap] instead of only frightening creatures at the start of their turn, the row must, once a creature is Frightened of Krennik — "Krennik's banner is his name made flesh — while the standard flies, creatures that flee from him cannot shake the sound of it, and a creature Frightened of Krennik that ends its turn with the banner in sight must make a Wisdom saving throw or be unable to move farther away from him until its next turn, herded back toward the worg's hooves." — Krennik Skullstandard [seat: trait [trait/start_of_turn/movement]] (closest offered: fear-aura) [effect: condition] [menu: truth-aura fear-aura spider-climb terrain-walk relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:legality noxious-aura:legality warded-mending:legality gaze-aura:legality] [landed: fear-aura]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path homebrew
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Hydra — in the run

**Concept:** name: Hydra | whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Bloodied Burst 24; dmg 23

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

Wounded Burst. The first time the hydra has half of its hit points or fewer in a fight, it releases a burst. Each creature within 15 feet of the hydra must make a DC 16 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Hold Breath. The hydra can hold its breath for 1 hour.
Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads. For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads. It can replace one attack with a use of Dazzling Burst.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Dazzling Burst: One creature within 60 feet must succeed on a DC 16 Constitution saving throw or be blinded until the end of its next turn.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Actions/Dazzling Burst — template sensory-strike; library draw (seed unstamped); binds the GM's words: blind
- Traits/Bloodied Burst — template bloodied-burst; library draw (seed unstamped); binds the GM's words: wounded
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("whose stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: smoking stumps that fail to regrow [body] | choking ash-cloud vented from severed necks [aura] | many-headed mauling bite [behavior]
[concept] identity: The Hydra lurches forward on gnarled necks, raking with jagged teeth while every wound it takes spills a choking column of smoke rather than regrowing — its stumps clot fast but the severed necks vent scalding ash that blinds and poisons attackers. Each round it presses the melee, whipping its smoking husks across the field to smoke out hiding prey, and under pressure it does not flee: the worse it is cut, the more smoke pours from its wounds, trading its own healing for a smothering cloud it hides inside.
[concept] lore: Bred from a hydra bloodline cursed by a failed ritual of reknitting, this monstrosity no longer regrows heads — it regrows smoke, and it wants to bury its old lair, and the memory of what it lost, beneath a permanent ash-fall.
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
[reskin] the sheet's declared ask: mend — the route call's one answer for the whole concept
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: on_being_hit/save_area] [askMechanic: zone]
[reskin] body verdicts: 33 of 33 answered; not true of this body: active-toll, random-ray, herd, drain, shell-withdraw, rally, false-appearance, absorption, resonant-body, adhesive, terrain-walk, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] signature idea (action): "The hydra whips its smoking neck-stumps low and lets the ash pour out around a creature it can see within reach, as a cone or line that pours from one neck. Each creature in the smoke must make a Constitution saving throw, taking Poison damage and being Blinded until the end of its next turn on a failure as scalding ash packs into eyes and throat." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, shield-bash, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, zone, zone-seed, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — zone, zone-seed (smoke)
[reskin] classification handed to the fit call: shape=save_area when=on_being_hit
[reskin] word match declined by the call: spew, ground-burst — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Ash Blinding" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: sensory-strike -> Actions/"Ash Blinding" ("Scalding ash from the smoking stumps is vented at a creature, forcing a Constitu [verb: blind:idea]")
[reskin] signature idea (trait): "Whenever the hydra takes a wound, the stump clots and vents rather than regrowing: it gains Temporary Hit Points and a smoking column in a space within reach that heavily obscures the area; any creature that begins its turn in the smoke must make a Constitution saving throw or be Poisoned until the end of its next turn. The hydra can see through its own smoke unimpeded." [trait/always/resource] [family: zone] — menu: spider-climb, phobia, aberrant-ground, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial (+ shelf: heated-body, bloodied-burst, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "zone" from the clause this seat serves, not the sheet's "mend"
[reskin] composed candidates: none trait — the zone family has no payload that does "resource" (it offers damage, condition, movement)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), spider-climb (always/movement)
[reskin] classification handed to the fit call: shape=save_area when=on_being_hit
[reskin] word match declined by the call: bloodied-burst, noxious-aura, energy-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-burst" as nearest; it lands rather than the row being dropped (what it wanted: leaves a lingering heavily obscuring smoke zone that Poisons those starting thei)
[reskin] seat takes its clause: "Smoking Stumps" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-burst -> Traits/"Smoking Stumps" ("The idea wants a triggered wound response that grants the hydra Temporary Hit Po [verb: wounded:idea]")
[reskin] one mechanic, one name: Actions/"Ash Blinding" -> "Dazzling Burst" — this row is sensory-strike and does what every sensory-strike row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Smoking Stumps" -> "Bloodied Burst" — this row is bloodied-burst and does what every bloodied-burst row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon size: Large -> Huge — the Hydra's
[reskin] print canon alignment: Neutral -> Unaligned — the Hydra's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Dazzling Burst.
[reskin] asked but unanswered: "Hydra — whose stumps smoke instead of regrowing" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] leaves a lingering heavily obscuring smoke zone that Poisons those starting their turn in it, while granting the hydra T — "Whenever the hydra takes a wound, the stump clots and vents rather than regrowing: it gains Temporary Hit Points and a smoking column in a space within reach that heavily obscures the area; any creature that begins its turn in the smoke must make a Constitution saving throw or be Poisoned until the end of its next turn. The hydra can see through its own smoke unimpeded." — Hydra [seat: trait [trait/always/resource]] (closest offered: bloodied-burst) [effect: condition] [menu: aberrant-ground energy-aura spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude death-burst kill-denial noxious-aura truth-aura fear-aura bloodied-burst] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role] [landed: bloodied-burst]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path twist
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Adult Red Dragon — in the run

**Concept:** name: Adult Red Dragon | blind in one eye from an old lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 (2014) | dragon-15 | ok | ok | FAIL: two-novas | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- structure · fail · two-novas: two Recharge novas on one sheet: "Threshold Execute" and "Fire Breath" — "Threshold Execute" is not print's
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

Guarded Stance. While the red dragon has half of its hit points or more, melee attack rolls against it are made with disadvantage.
Legendary Resistance (3/Day). If the red dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness. The red dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The red dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): -

At will: command, detect magic, scorching ray

1/day each: fireball
Threshold Execute: One creature the red dragon can see within 90 feet that has half of its hit points or fewer must succeed on a DC 21 Dexterity saving throw or, if it has 24 hit points or fewer, drop to 0 hit points; otherwise, it takes 24 (7d6) fire damage.
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The red dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The red dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The red dragon uses Spellcasting to cast command (cast at 2nd level). The red dragon can't take this action again until the start of its next turn.
Fiery Rays: The red dragon uses Spellcasting to cast scorching ray. The red dragon can't take this action again until the start of its next turn.
Pounce: The red dragon moves up to half its speed, and it makes one Rend attack.
```

**Where each row came from**

- Traits/Guarded Stance — template guarded-stance; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Sight Weakness — the GM's clause "Adult Red Dragon — blind in one eye from an old lance"
- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Threshold Execute — template execute; library draw (seed unstamped); binds the GM's words: end
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
[concept] signature elements: blinded left eye from an old lance wound [body] | sweeping furnace-hot breath attacks [behavior] | vendetta against lances and their bearers [behavior]
[concept] identity: A scarred adult red dragon that lost its left eye to a knight's lance, it opens with a ground-shaking dive from its blind side now compensated for by a furnace-hot breath it sweeps in wide arcs. Every round it dictates range with strafing fire, then closes to maul and tail-sweep when the quarry is softened, keeping the lance-scarred left flank turned away from armed foes. It toys with armored prey, remembering the lance, and fights to the death only once bloodied — then it refuses to retreat.
[concept] lore: This dragon long ago claimed a volcanic ridge as its hoard-hall and now hunts the descendants of the knight who took its eye, seeking the lance itself as the one trophy its mountain of gold cannot replace.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] name_element answered: Scorching Breath = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the red dragon" — the call answered "the red dragon" (kind), which the name does not support
[reskin] inline form: "the red dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] body verdicts: 32 of 32 answered; not true of this body: snare, seal, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — aggro-curse, own-turn-punisher, self-invisibility, focus, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, exploiter, sensory-strike (the sheet cannot render them)
[reskin] signature idea (action): "The dragon fixes its one good eye on a creature it can see and marks it as the heir of the lance — the Vendetta. While marked, the creature cannot benefit from the Half Cover or Three-Quarters Cover of a shield or any armor it wears against the dragon's attacks, and the dragon's Bite scores a Critical Hit against it on a roll of 19 or 20. The mark ends if the dragon marks another creature." [bonus_action/always/condition] [family: mark] — menu: lay-on-hands, second-wind (+ shelf: condition-payoff, execute, throw-retrieve, shield-bash, lure, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does condition; leading: lay-on-hands (always/resource), second-wind (always/resource), execute (save/damage)
[reskin] keys would have bound: action — throw-retrieve, charge (lance)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: lay-on-hands, second-wind, execute — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "execute" as nearest; it lands rather than the row being dropped (what it wanted: picks one creature it can see and holds a mark on it that strips its armor/shiel)
[reskin] seat takes its clause: "Lance Vendetta (1/Day)" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: execute -> Actions/"Lance Vendetta (1/Day)" ("The idea marks one seen creature with a vendetta: its cover from worn shield/arm [verb: end:idea]")
[reskin] signature idea (trait): "The dragon's ruined left eye is a dead socket that sees nothing in the ordinary way, and old instinct has taught it to keep that scar turned from drawn steel. Attacks made against it by a creature wielding a lance, spear, or pike are made with Disadvantage while the attacker is in the dragon's left flank arc, and the dragon cannot be Surprised by a creature approaching from its blind side — its fu" [trait/always/defense] [family: sentinel] — menu: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: bloodied-fury, death-restoration, shielded-mind, relic-object, undead-fortitude, evasion — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "guarded-stance" as nearest; it lands rather than the row being dropped (what it wanted: attacks from the blind flank arc made with Disadvantage while immune to being Su)
[reskin] free signature row: trait — "guarded-stance" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] decoration renamed: "Blind Flank" borrowed the GM's own word "blind" for a row that expresses nothing — it takes "Guarded Stance", the template's own name
[reskin] free signature row: "Guarded Stance" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Guarded Stance" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("The idea describes a defensive blind-side awareness and disadvantage against pol [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Lance Vendetta (1/Day)" -> "Threshold Execute (1/Day)" — this row is execute and does what every execute row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none; Scorching Breath = none
[reskin] chassis nova: "Scorching Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic" -> "Common, Draconic" — the Adult Red Dragon's
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Cower" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Scorching Breath (Recharge 5-6)" is the seat's nova, not the Adult Red Dragon's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Guarded Stance" [trait/always/defense]
[reskin] one nova at ship: "Threshold Execute (1/Day)" un-gated to "Threshold Execute" — "Fire Breath" already carries this sheet's Recharge nova
[reskin] threshold re-derived after the cap: Actions/Threshold Execute — 75 over the row's own 24 damage, so the kill branch beat the damage branch; threshold to 24
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Guarded Stance")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Commanding Presence" is engine-authored chassis text
[reskin] audit rewrite blocked — "Fiery Rays" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] picks one creature it can see and holds a mark on it that strips its armor/shield cover against the dragon's attacks and — "The dragon fixes its one good eye on a creature it can see and marks it as the heir of the lance — the Vendetta. While marked, the creature cannot benefit from the Half Cover or Three-Quarters Cover of a shield or any armor it wears against the dragon's attacks, and the dragon's Bite scores a Critical Hit against it on a roll of 19 or 20. The mark ends if the dragon marks another creature." — Adult Red Dragon [seat: action [bonus_action/always/condition]] (closest offered: execute) [effect: condition] [menu: lay-on-hands second-wind execute] [same-cell unoffered: adhesive phobia faultless-tracker berserk marking-light kill-denial] [same-seat rejected: blink:role shell-withdraw:legality patient-defense:role volley-order:role rally:legality feint-slip:role coating:legality phase-slip:role] [landed: execute]
[reskin] [gap] attacks from the blind flank arc made with Disadvantage while immune to being Surprised from that side — "The dragon's ruined left eye is a dead socket that sees nothing in the ordinary way, and old instinct has taught it to keep that scar turned from drawn steel. Attacks made against it by a creature wielding a lance, spear, or pike are made with Disadvantage while the attacker is in the dragon's left flank arc, and the dragon cannot be Surprised by a creature approaching from its blind side — its fu" — Adult Red Dragon [seat: trait [trait/always/defense]] (closest offered: guarded-stance) [effect: defense] [menu: bloodied-fury death-restoration shielded-mind relic-object undead-fortitude evasion guarded-stance spider-climb phobia terrain-walk blood-frenzy pack-tactics berserk relentless-pursuit bound kill-denial energy-aura truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:legality mimicry:legality assassinate:role blurred-form:legality death-burst:legality] [landed: guarded-stance]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path twist
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Ossuary Archlich — in the run

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Archlich | 20 (2014) | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 20 → 19.5; sustained 126 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 126

```
Ossuary Archlich
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

Radiant Aura. A creature that touches the archlich or hits it with a melee attack while within 5 feet of it takes 10 (3d6) radiant damage.
Legendary Resistance (3/Day). If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (3/Day) (Reaction). When the archlich is hit by an attack roll, the archlich casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of (A) Dazzling Burst or (B) Spellcasting to cast Guiding Bolt.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Dazzling Burst: One creature within 60 feet must succeed on a DC 19 Constitution saving throw or be blinded until the start of its next turn.
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether it fails or succeeds, the archlich can't take this action again until the start of its next turn.
Frightening Gaze: The archlich casts fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

**Where each row came from**

- Traits/Radiant Aura — template heated-body; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Spirit Jar — print's own row
- Actions/Multiattack — the chassis
- Actions/Eldritch Burst — print's own row, renamed
- Actions/Paralyzing Touch — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Dazzling Burst — template sensory-strike; library draw (seed unstamped); binds the GM's words: blind+light
- Reactions/Protective Magic — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Deathly Teleport — print's own row
- Legendary Actions/Disrupt Life — print's own row
- Legendary Actions/Frightening Gaze — print's own row

**Engine trace**

```
[path] twist — Lich (is) — "an archlich" (call)
[route] caster (artillery) type=Undead mechanics=none — casts: implied by the kind — "archlich" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead themes=grave/arcane mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a sun of fused bone radiating deathless light [body] | an archlich's withering spell barrage from its throne [behavior] | a corona that chars and pins all who draw near [aura]
[concept] identity: The Bone Sun opens by hurling searing lances of radiance from its throne of fused vertebrae, keeping foes at the far edge of the void it orbits. Every round it repositions its bone-sun to keep prey in its burning corona, spending spells to pin enemies in place before a final, contemptuous barrage. It is ancient and patient, toying with challengers rather than fleeing — it has outlived every army sent against it and treats the fight as a tedious formality.
[concept] lore: An archlich who bound its soul not to a phylactery but to a collapsing star of ossified dead, it drifts the void seeking fresh bones to feed the sun that keeps it deathless.
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Searing Slap" claims an element its damage (Radiant/Radiant) does not pay
[reskin] repair round 2: 1 defect(s) — name "Grasping Bone Swipe" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Strike, Blow, Lash
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the archlich" — the call's own answer (kind), built from the name
[reskin] inline form: "the archlich" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, seal, snare-bolt, herd, drain, rally, phase-slip, false-appearance, absorption, bloodied-burst, terrain-walk, faultless-tracker, web-walker, noxious-aura, uncanny-sense, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu pruned: action — thrown-burst-seed, push-prone, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The archlich turns its throne so that the wearisome battle falls into its shadow and the bone sun's light bores through its prey: each creature of its choice it can see that is illuminated by the archlich's light — standing in the Corona, or still glowing with the Radiance Lance's mark, or within the emanation of its throne — must succeed on a Constitution saving throw or have the Blinded conditio" [action/save/condition] [family: payoff] — menu: condition-payoff, execute, lure, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, curse-debt, zone-seed, reveal, shield-bash, terror-pulse (+ shelf: gaze-single, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] word match declined by the call: lure, reveal, condition-payoff — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Bone Sun Brand" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: sensory-strike -> Actions/"Bone Sun Brand" ("the bone sun's light bores through its prey, Blinding each creature the archlich [verb: blind:idea, light:idea]")
[reskin] signature idea (trait): "The fused vertebrae of the bone sun drink in what they are struck with: whenever the archlich takes Radiant damage, it can use its Reaction to split that radiance instead of being hurt by it, and the stolen light kindles the sun so that its Corona recharges." [trait/on_being_hit/defense] [family: heal] — menu: heated-body, resonant-body (+ shelf: spider-climb, phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does defense; leading: heated-body (on_being_hit/damage), resonant-body (on_being_hit/damage), death-restoration (always/defense)
[reskin] word match declined by the call: heated-body, resonant-body, death-restoration, energy-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "heated-body" as nearest; it lands rather than the row being dropped (what it wanted: converts incoming Radiant damage into recharging the creature's Corona instead o)
[reskin] free signature row: trait — "heated-body" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Radiant Absorbtion" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Radiant Absorbtion" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): heated-body -> Traits/"Radiant Absorbtion" ("The idea is a reaction that converts incoming Radiant damage into a Corona recha [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Radiant Absorbtion" -> "Heated Body" — this row is heated-body and does what every heated-body row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Bone Sun Brand" -> "Dazzling Burst" — this row is sensory-strike and does what every sensory-strike row does; a bespoke name would promise more than the text delivers
[reskin] chassis nova: "Corona (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon attack: "Radiance Lance" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon attack: "Grasping Bone Swipe" -> "Paralyzing Touch" — the Lich's own row
[reskin] print canon multiattack: "the archlich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Corona (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Necrotic" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Dazzling Burst or (B) Spellcasting to cast *Guiding Bolt*.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Heated Body" [trait/on_being_hit/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Heated Body")
audit finding below confidence gate: Disrupt Life The 'Failure or Success' clause is mechanically redundant with the Legendary Action Uses economy and adds a second limiter the GM must track mid-combat within an already branching save entry.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Heated Body" -> "Radiant Aura"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] converts incoming Radiant damage into recharging the creature's Corona instead of harming it — "The fused vertebrae of the bone sun drink in what they are struck with: whenever the archlich takes Radiant damage, it can use its Reaction to split that radiance instead of being hurt by it, and the stolen light kindles the sun so that its Corona recharges." — Ossuary Archlich [seat: trait [trait/on_being_hit/defense]] (closest offered: heated-body) [effect: resource] [menu: heated-body resonant-body death-restoration energy-aura] [same-cell unoffered: absorption interpose] [same-seat rejected: absorption:legality bloodied-burst:legality weapon-lodge:role] [landed: heated-body]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
[reskin] record reconciled: "Paralyzing Touch" no longer imposes Prone — the clause left, so the record goes with it
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
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: searing molten-gold breath [body] | frightful, majestic presence [aura] | testing and judging those who face it [behavior]
[concept] identity: The Ancient Gold Dragon opens with a controlled, almost judicial approach — a single searing arc of molten-gold breath laid across the battlefield to test the worthy, then low passes and sweeping talon strikes to separate the brave from the merely present. Every round after it fights as a duelist and mentor at once, granting quarter where it is earned and answering insolence with a blast that scours stone, its massive body moving with deliberate grace as it flies. Under pressure its temper is the most dangerous thing about it: it does not flee, but its patience thins into magnificent, calculated fury, and it will burn a field clean to force the survivors to prove themselves.
[concept] lore: An Ancient Gold Dragon, one of the last burning-lamps of the high mountain ring, guards the hoard it inherited from a vanished age and roams its high passes for the sake of finding mortals worth remembering.
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

Nimble Escape. As a bonus action, the goblin boss takes the Disengage or Hide action.

Actions
Multiattack: The goblin boss makes two attacks, using Scimitar or Shortbow.
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
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793294383544:1468:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793294383544:1307:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793294383544:657:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793294383544:1468:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793294383544:1307:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1793294383544:657:5)
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("Goblin Boss") | defender-leader: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=defender type=Humanoid themes=armed/voice mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: barking orders that steady its allies [behavior] | iron-bound shield and cleaver [object] | an aura of goblin authority [aura]
[concept] identity: A goblin boss opens by barking an order that turns its scattering rabble into a line of blades, then wades in beside them with a rusted cleaver and a shield it has clearly used before. Every round it parries the first blow that lands on a nearby goblin with its own hide-bound guard while shoving and cutting at whoever threatens its formation, its authority a physical thing that props its troops upright. Cornered or bloodied, it does not run — it roars its gang forward and fights to the last goblin standing around it, because the warband is the only armor it has.
[concept] lore: Raised on the slag heaps of a goblin warren, the boss clawed its way to leadership by being the one who never broke — and it holds the mob together by force of hide-bound armor and a bellow that sounds like iron.
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
[reskin] inline by rule: "the goblin boss" — the call answered "the goblin boss" (kind), which the name does not support
[reskin] inline form: "the goblin boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] body verdicts: 24 of 24 answered; not true of this body: seal, active-toll, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] weapons answered: Cleaver = shortsword (rusted cleaver)
[reskin] weapon declared: "Cleaver" is a shortsword — the call's own answer
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] languages by mind: "Goblin" -> "Common, Goblin" (sapient)
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Shortbow — the Goblin Boss's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Cleaver" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon multiattack: "the goblin boss makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon skills: "Athletics +2, Perception +1" -> "Stealth +6" — the Goblin Boss's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path exact
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Black Iron Vigil — in the run

**Concept:** a sentinel of black iron, AC 20, Huge, speed 20 feet

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Iron Vigil [seed 1/3] | 11 (2014) | defender-7-warden | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | ok |

- reader · fail · name-mechanic: Actions/Warded Charge: the name promises movement the text lacks
- read: def 10 / off 8 → 9; sustained 50 (2 × Iron Fist); nova none; dmg 50

```
Black Iron Vigil
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

Relentless Pursuit. While the vigil is moving toward a creature it has damaged within the last 24 hours, the vigil's speed can't be reduced and difficult terrain doesn't cost it extra movement.
Ward Bond. The vigil is magically bound to a ward of its choosing, and it can have only one ward at a time. While the vigil is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the vigil.
Regeneration. The vigil regains 10 hit points at the start of each of its turns if it has at least 1 hit point.
Iron Retribution. As a bonus action, the vigil targets one creature within 5 feet that hit it with an attack roll since the end of the vigil's last turn. The target takes 10 (3d6) force damage.
Interpose (Reaction). When a creature within 5 feet of the vigil that it guards is hit by an attack roll, the attack hits the vigil instead, and the vigil has resistance to the attack's damage.

Actions
Multiattack: The vigil makes two Iron Fist attacks.
Iron Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 25 (6d6 + 4) bludgeoning damage.
Warded Charge (2/Day): The vigil targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the vigil's next turn.
```

**Where each row came from**

- Traits/Relentless Pursuit — template relentless-pursuit; library draw (seed unstamped)
- Traits/Ward Bond — the chassis
- Traits/Regeneration — the chassis
- Actions/Multiattack — the chassis
- Actions/Iron Fist — the chassis
- Actions/Warded Charge — the chassis
- Bonus Actions/Iron Retribution — library seed own-turn-punisher
- Reactions/Interpose — template interpose; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a sentinel of black iron, AC 20, Huge, speed 20 feet" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender: the call read "sentinel" as not meaning that mechanic here — no override | defender-warden stands: every key that would override it was read as a figure of speech | defender-warden: no line key in the words — the model's read of its quote | asked_mechanic harden: quote not found
[concept] hints: warden→style ✓ ("sentinel of black iron — bound guardian")
[concept] resolve: archetype=defender type=Construct themes=forged/grave mind=sapient style=warden energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: interposing its body between threat and charge [behavior] | riveted black iron plating [body] | remorseless, tireless advance [behavior]
[concept] identity: The Iron Sentinel opens by interposing its Huge, riveted bulk between the intruder and its charge, absorbing the first blows on AC 20 plating before answering with slow, crushing iron-fist strikes. Every round after, it advances one ponderous 20-foot step and slams the nearest threat, deliberately steering itself between enemies and the thing it wards rather than pursuing fleeing prey. It never flees and never taunts; at half hit points it simply plants itself, commits to fighting to the death, and lets its black iron body take the punishment it was built to endure.
[concept] lore: Forge-bound by a dead artificer to guard a sealed reliquary, the Iron Sentinel still stands in the dark, waiting for a hand that will never come to relieve it.
[reskin] donor: defender-7-warden -> CR 11
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — name "Warded Charge" promises movement but the row never delivers it — name what the rule does, or drop the claim word
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the vigil" — the call's own answer (kind), built from the name
[reskin] inline form: "the vigil" — the model's own reading of the name
[reskin] save dc derived: DC 17 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] body verdicts: 29 of 29 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The vigil advances on the creature nearest its ward and makes one Iron Fist attack against it; on a hit, the target is pushed away from the ward and has the Prone condition, its footing broken by the slow, unstoppable weight of the iron. The vigil then moves up to its speed, ending in the square the target vacated if it can, planting its bulk between the foe and the ward once more." [rider/on_hit/movement] [family: sentinel] — menu: stunning-strike, charge-push (+ shelf: shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, ward-retaliation, riposte, interpose)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: charge-push (on_hit/movement), stunning-strike (on_hit/condition), slow-bolt (save/movement)
[reskin] keys would have bound: action — ward-retaliation (sentinel)
[reskin] word match declined by the call: stunning-strike, slow-bolt, interpose — the key word does not mean the mechanic here
[reskin] free signature row: action — "charge-push" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "riveted black iron plating" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Iron Repulse" — a rider rides the user's own attack, so it needs the user's own ask, but the call names the element it expresses: "riveted black iron plating". Earns no clause credit; the budget settles on the finished sheet
[reskin] rider refused — a push that undoes its own row: "charge-push" moves the target away from "Iron Fist", which swings 2x a round; the slot leaves and the seat looks elsewhere
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The vigil ignores difficult terrain and the condition of the ground beneath it, and its movement never provokes Opportunity Attacks. When the vigil is Bloodied, it can no longer willingly move from its square until it or its ward falls — it simply plants its iron feet and commits." [trait/always/movement] [family: sentinel] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura (+ shelf: resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] keys would have bound: trait — resonant-body (iron)
[reskin] word match declined by the call: bound, spider-climb, warded-mending — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "relentless-pursuit" as nearest; it lands rather than the row being dropped (what it wanted: ignores difficult terrain and the ground entirely, and moving never provokes Opp)
[reskin] row kept the template's own name: trait — "Relentless Pursuit" is relentless-pursuit's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: trait — "relentless-pursuit" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat default: warden owes interpose by print — it seats before the idea
[reskin] signature template (trait): interpose -> Reactions/"Interpose" ("the seat owes it by print")
[reskin] free signature row: "Relentless Pursuit" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): relentless-pursuit -> Traits/"Relentless Pursuit" ("The idea is about ignoring terrain and forgoing Opportunity Attacks, then planti [shape fit, no verb match]")
[reskin] weapons answered: Iron Fist = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron, AC 20, Huge, s" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Relentless Pursuit" [trait/always/movement]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Relentless Pursuit")
[reskin] audit rename: "Answering Sting" -> "Iron Retribution"
[reskin] seed share: 1 of 3 signature row(s) came from a seed (Iron Retribution) — the sameness metric
[reskin] [gap] ignores difficult terrain and the ground entirely, and moving never provokes Opportunity Attacks — "The vigil ignores difficult terrain and the condition of the ground beneath it, and its movement never provokes Opportunity Attacks. When the vigil is Bloodied, it can no longer willingly move from its square until it or its ward falls — it simply plants its iron feet and commits." — Black Iron Vigil [seat: trait [trait/always/movement]] (closest offered: relentless-pursuit) [effect: movement] [menu: spider-climb relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind sealed-body guarded-stance undead-fortitude warded-mending truth-aura fear-aura] [same-cell unoffered: blink terrain-walk aberrant-ground web-walker earth-glide tunneler zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality relic-object:legality mimicry:legality assassinate:role blurred-form:role death-burst:role kill-denial:legality] [landed: relentless-pursuit]
[reskin] signature tally: 2 seat(s) -> 3 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
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

Common plus five other languages, Elvish, Sylvan

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Blurred Form. Attack rolls against Ilvareth have disadvantage. If Ilvareth is hit by an attack roll, this trait is disabled until the end of its next turn.
Magic Resistance. Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day). As a bonus action, Ilvareth casts misty step, using the same spellcasting ability as Spellcasting.
Phase Slip (2/Day). As a bonus action, Ilvareth teleports up to 30 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, Ilvareth casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17):

At will:: detect magic, detect thoughts, disguise self, invisibility, light, mage armor, mage hand, prestidigitation
2/day each:: fly, lightning bolt
1/day each:: cone of cold, mind blank, scrying, teleport
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Arcane Burst — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "archmage"
- Bonus Actions/Misty Step — mage kit; the GM's clause "bends shadow and steps between places"
- Bonus Actions/Phase Slip — template phase-slip; library draw (seed unstamped); the GM's clause "bends shadow and steps between places"; binds the GM's words: step+shadow
- Traits/Blurred Form — template blurred-form; library draw (seed unstamped)
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("An elf archmage") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between places through shadow [behavior] | shadow-bent spellcraft and shadow bolts [body] | a cloaking aura of stolen light [aura]
[concept] identity: Ilvareth Dusksong opens from a distance, peeling the light away so that arrows of hardened shadow lance out of every dark corner while he remains somewhere the eye cannot quite fix. Each round he steps through a fold of gloom — across the room, behind a pillar, out of reach — trading a spell for footing and never letting a foe close enough to test his fragile elven frame. When pressed and bloodied, he does not flee outright but withdraws in deliberate, mocking steps, drawing pursuers through shadowed ground he has already prepared.
[concept] lore: Ilvareth Dusksong was an archmage who chose to step sideways out of the world into the seam between shadows, and now he shepherds would-be apprentices there, offering forbidden shortcuts through the dark at prices their souls were not warned about.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Dimension Door" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] repair round 2: 1 defect(s) — "Dimension Door" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: teleport — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: at_will/at_will/movement] [askMechanic: teleport]
[reskin] body verdicts: 9 of 34 answered; not true of this body: none
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "As a bonus action, Ilvareth furls the stolen light around himself into a close cloak of dusk that moves with him: while it lasts, attacks of opportunity made against him are made with disadvantage, and any creature that starts its turn within the murk must succeed on a Wisdom saving throw or have disadvantage on the next attack roll it makes against him before the cloak's end, the gloom drinking t" [bonus_action/once_per_fight/defense] [family: zone] — menu: lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, blink, focus, feint-slip (+ shelf: thrown-burst, gaze-single, zone, execute, wail, lure, ground-burst, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, delayed-brand, curse-debt, zone-seed, reveal, wind-up, disarm, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the bonus_action seat
[reskin] declared mechanic leads the menu: action — teleport: self-invisibility, phase-slip, blink
[reskin] menu ordered by the idea's stamps: action — idea fires once_per_fight/does defense; leading: self-invisibility (always/movement), phase-slip (always/movement), blink (always/movement)
[reskin] keys would have bound: action — phase-slip (step, shadow)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: self-invisibility — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "phase-slip" as nearest; it lands rather than the row being dropped (what it wanted: a short-range teleport bonus action not already granted by the sheet's Misty Ste)
[reskin] signature template: phase-slip -> Bonus Actions/"Shadow Step (2/Day)" ("The idea describes a defensive cloak of shadow that hinders opportunity attacks  [verb: step:concept, shadow:concept]")
[reskin] keys spent by the action: step, shadow
[reskin] signature idea (trait): "Ilvareth does not stand in one place in any sense: light and attention slide off him into the seam he walks in, so that any creature trying to track him by sight—keeping him in view, reading his position, following where he went—does so at disadvantage, and only the sharp edge of a sound or a cast mark finds him truly." [trait/always/condition] [family: mark] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura, gaze-aura, blurred-form, berserk
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/condition): phobia, marking-light, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), marking-light (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: blurred-form, marking-light — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "blurred-form" as nearest; it lands rather than the row being dropped (what it wanted: tracks by sight have disadvantage and he can't be located visually without a sou)
[reskin] free signature row: trait — "blurred-form" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Slip From Sight" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Slip From Sight" is HANDED "Ilvareth Dusksong — An elf" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): blurred-form -> Traits/"Slip From Sight" ("The idea is that sight-tracking of Ilvareth is unreliable—he slips from notice a [shape fit, no verb match]")
[reskin] one mechanic, one name: Bonus Actions/"Shadow Step (2/Day)" -> "Phase Slip (2/Day)" — this row is phase-slip and does what every phase-slip row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Slip From Sight" -> "Blurred Form" — this row is blurred-form and does what every blurred-form row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Shadow Arrow = none
[reskin] weapon declined: "Shadow Arrow" reads longbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Shadow Arrow" — a launcher, never thrown, range 150/600
[reskin] print canon modes: fly off — the Archmage has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] print canon languages: "Common, Elvish, Sylvan" -> "Common plus five other languages, Elvish, Sylvan" — the Archmage's plus the concept's Elvish, Sylvan
[reskin] print canon row: Actions/Arcane Burst — the Archmage's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Ilvareth makes four Arcane Burst attacks." — the Archmage's own
[reskin] ranged row off: "Shadow Arrow" leaves — the Archmage carries no ranged row and the words name none
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Blurred Form" [trait/always/defense]
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Phase Slip" answers "bends shadow and steps between places" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "bends shadow and steps between places" -> "Misty Step" — limit: asked at_will, row reads per_day
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Blurred Form")
audit finding names unknown entry, dropped: Immunities
audit finding names unknown entry, dropped: Immunities
audit finding below confidence gate: Blurred Form Blurred Form grants disadvantage on attacks, but Protective Magic triggers on being hit by an attack roll; the two entries interact — being hit while blurred is possible only if the attacker overcomes disadvantage, and the trait's disable is keyed to that hit, which is adjudicable, but the trait does not state whether the disable also applies if the hit is prevented by Shield.
audit finding below confidence gate: Spellcasting The Spellcasting action includes utility spells (Detect Magic, Light, Mage Hand, Prestidigitation) with no action cost or timing specified for casting them in combat; the GM must infer whether each usage is an action.
audit finding below confidence gate: Phase Slip Phase Slip and Misty Step both teleport the creature, and Phase Slip duplicates the effect of a spell already granted in the Bonus Actions, making the entry redundant.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "archmage" which is not a whole clause — the seat surgery cut it; resolved to cl_176teih
[reskin] [gap] a short-range teleport bonus action not already granted by the sheet's Misty Step — "As a bonus action, Ilvareth furls the stolen light around himself into a close cloak of dusk that moves with him: while it lasts, attacks of opportunity made against him are made with disadvantage, and any creature that starts its turn within the murk must succeed on a Wisdom saving throw or have disadvantage on the next attack roll it makes against him before the cloak's end, the gloom drinking t" — Ilvareth Dusksong [seat: action [bonus_action/once_per_fight/defense]] (closest offered: phase-slip) [effect: movement] [menu: self-invisibility phase-slip blink zone lay-on-hands aggro-curse rally focus feint-slip thrown-burst execute lure sensory-strike thrown-burst-seed zone-seed reveal] [same-cell unoffered: none] [same-seat rejected: rampage:role] [landed: phase-slip]
[reskin] [gap] tracks by sight have disadvantage and he can't be located visually without a sound or cast mark, without requiring a hit — "Ilvareth does not stand in one place in any sense: light and attention slide off him into the seam he walks in, so that any creature trying to track him by sight—keeping him in view, reading his position, following where he went—does so at disadvantage, and only the sharp edge of a sound or a cast mark finds him truly." — Ilvareth Dusksong [seat: trait [trait/always/condition]] (closest offered: blurred-form) [effect: condition] [menu: phobia marking-light berserk spider-climb bloodied-fury blood-frenzy pack-tactics death-restoration uncanny-sense shielded-mind relentless-pursuit bound undead-fortitude blurred-form truth-aura fear-aura gaze-aura] [same-cell unoffered: adhesive faultless-tracker kill-denial] [same-seat rejected: false-appearance:legality adhesive:role terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality earth-glide:legality tunneler:legality evasion:role sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role death-burst:legality kill-denial:legality] [landed: blurred-form]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path class_npc
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Heron-Sworn Lizardfolk — in the run

**Concept:** lizardfolk monk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Heron-Sworn Lizardfolk | 5 (2014) | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Unarmed Strike); nova none; dmg 46

```
Heron-Sworn Lizardfolk
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

Evasion. If the lizardfolk is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the lizardfolk instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Hold Breath. The lizardfolk can hold its breath for 15 minutes.
Marsh Stride. Difficult terrain composed of mud doesn't cost the lizardfolk extra movement, and the lizardfolk can move across mud without needing to make an ability check.
Patient Defense. As a bonus action, the lizardfolk takes the Dodge action.
Cunning Action. As a bonus action, the lizardfolk takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The lizardfolk makes two attacks: one with its Unarmed Strike and one with its Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 3) bludgeoning damage. Once on each of the lizardfolk's turns when it hits with this attack, the target is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be stunned until the end of the lizardfolk's next turn. If the target is a creature, it is subjected to the following effect. The target must succeed on a DC 14 Constitution saving throw or be poisoned. While poisoned this way, the target can't regain hit points. The condition lasts until the target finishes a long rest or is cured by the lesser restoration spell or similar magic. On a successful save, the target is immune to this creature's contagion for 24 hours.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Evasion — template evasion; library draw (seed unstamped)
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
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/venomous mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: venom-laced unarmed strikes [behavior] | scaled, poison-resistant hide [body] | heron-style dart-in strike and withdraw [behavior]
[concept] identity: A lizardfolk monk opens by stalking along walls and ceilings, circling until the pack has its angles, then darts in to land a single flurry of scaled-fist strikes before springing back out of reach. Every round it repeats that rhythm — close, unload a breath-held combo, retreat — using its climb speed and patient cold to frustrate pursuers. Under pressure it never panics: it keeps its footing, yields ground only as a ploy, and fights to the death once its clutch-mates are in the fight.
[concept] lore: Hatchery-sworn to an old swamp monastery, these scaled ascetics perfect the strike-and-vanish discipline of the heron so that no hunter can pin their spawning grounds to the mud.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Shed Fang" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] row evicted for the cap: Traits/"Heron Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Scales-Fist), Patient Defense (patient-defense)
[reskin] inline declared: "the lizardfolk" — the call's own answer (kind), built from the name
[reskin] inline form: "the lizardfolk" — the model's own reading of the name
[reskin] energy rider withheld: Cold on a Humanoid with no Cold in the concept's own words
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] body verdicts: 28 of 28 answered; not true of this body: snare, random-ray, snare-bolt, blink, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] signature idea (action): "When the lizardfolk hits with Scales-Fist, the strike carries a numbing venom; the target makes a Constitution saving throw, and on a failure its speed is halved and it can't take reactions until the end of its next turn." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, charge-push, pounce, isolation, life-drain, bolt-mark, charge, bolt-restrain (+ shelf: gaze-single, condition-payoff, throw-retrieve, shield-bash, lure, ground-burst, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), pounce (on_hit/condition)
[reskin] word match declined by the call: affliction, pounce, life-drain, bolt-mark, bolt-restrain, composed:payoff:condition, charge-push, isolation, charge, disarm, thrown-burst-seed, delayed-brand, coating — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "contagion" as nearest; it lands rather than the row being dropped (what it wanted: a save-or-suffer debuff that halves the target's speed and denies it reactions f)
[reskin] pick kept on the GM's own words: action — "contagion" has no key-table verb, but the call quotes "lizardfolk monk" from the description
[reskin] seat takes its clause: "Numbing Venom" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] seat takes its clause: "Numbing Venom" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: contagion -> Scales-Fist (appended; The idea is a numbing venom rider on Scales-Fist that halves speed and denies re [shape fit, no verb match])
[reskin] signature idea (trait): "The lizardfolk's cold-blooded focus leaves no seam for fear: it automatically succeeds on saving throws against being Frightened and emits no heat for creatures relying on scent or tremorsense to track." [trait/always/defense] [family: sentinel] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, sealed-body (+ shelf: uncanny-sense)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] word match declined by the call: shielded-mind, sealed-body, uncanny-sense, terrain-walk, spider-climb, guarded-stance, evasion — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "evasion" as nearest; it lands rather than the row being dropped (what it wanted: lets the monk-reptile avoid damage entirely on a successful Dexterity save, the )
[reskin] pick kept on the GM's own words: trait — "evasion" has no key-table verb, but the call quotes "lizardfolk monk" from the description
[reskin] seat takes its clause: "Cold-Blooded Focus" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): evasion -> Traits/"Cold-Blooded Focus" ("The idea is that cold-blooded focus makes it immune to Frightened and scent/trem [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Cold-Blooded Focus" -> "Evasion" — this row is evasion and does what every evasion row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Scales-Fist = none; Shed Fang = none
[reskin] weapon table: "Shed Fang" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Scales-Fist" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Shed Fang" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Hold Breath" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Marsh Stride" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Unarmed Strike" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Patient Defense" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] [gap] a save-or-suffer debuff that halves the target's speed and denies it reactions for a turn — "When the lizardfolk hits with Scales-Fist, the strike carries a numbing venom; the target makes a Constitution saving throw, and on a failure its speed is halved and it can't take reactions until the end of its next turn." — Heron-Sworn Lizardfolk [seat: action [rider/on_hit/condition]] (closest offered: contagion) [effect: condition] [menu: affliction contagion pounce life-drain bolt-mark bolt-restrain composed:payoff:condition charge-push isolation charge disarm thrown-burst-seed delayed-brand coating] [same-cell unoffered: stunning-strike snatch] [same-seat rejected: stunning-strike:legality hook-rider:legality snatch:legality bolt-drag:role] [landed: contagion]
[reskin] [gap] lets the monk-reptile avoid damage entirely on a successful Dexterity save, the way a monk's Evasion does — "The lizardfolk's cold-blooded focus leaves no seam for fear: it automatically succeeds on saving throws against being Frightened and emits no heat for creatures relying on scent or tremorsense to track." — Heron-Sworn Lizardfolk [seat: trait [trait/always/defense]] (closest offered: evasion) [effect: defense] [menu: bloodied-fury death-restoration shielded-mind evasion guarded-stance undead-fortitude sealed-body uncanny-sense spider-climb phobia terrain-walk blood-frenzy pack-tactics berserk relentless-pursuit bound assassinate truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw patient-defense relic-object mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality earth-glide:legality tunneler:legality marking-light:legality relic-object:legality mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [landed: evasion]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path class_npc
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
- gates · soft · control-aoe-ungated: Actions/Horrid Display: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
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
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Horrid Display.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 17 (3d8 + 4) piercing damage. Whether the attack hits or misses, immediately after the attack, a javelin returns to Meshrin's grasp, and the target's speed is reduced by 10 feet until the start of Meshrin's next turn.
Horrid Display: Each creature of Meshrin's choice within 30 feet of it that can see or hear it must succeed on a DC 15 Wisdom saving throw or be frightened of Meshrin until the end of its next turn.
```

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "barbarian"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "barbarian"
- Traits/Great Weapon Master — a declared feature; the GM's clause "Wields a greataxe two-handed"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "barbarian"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "Wields a greataxe two-handed"; weapon greataxe
- Actions/Javelin — authored for this sheet; a named part; a declared feature; the GM's clause "a javelin for the throw"; weapon javelin
- Actions/Horrid Display — template terror-pulse; library draw (seed unstamped); the GM's clause "Give him a frightening roar"; binds the GM's words: roar

**Engine trace**

```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/terror mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: greataxe two-handed [object] | javelin throw [object] | frightening roar [behavior]
[concept] identity: Meshrin opens by hurling a javelin as he closes, then wades in with a two-handed greataxe while his rage burns — a bloodied lizardfolk berserker who fights to the death and answers any wound with a bone-shaking roar that cows the field.
[concept] lore: A scarred lizardfolk war-chief exiled from his marsh clan, Meshrin now hires his axe to any warlord who will feed his rage and let him roar over the fallen.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Beast-Fear Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type | "Bone-Shaking Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] row evicted for the cap: Traits/"Marsh Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] energy withheld on a base row: "Beast-Fear Roar (Recharge 5-6)" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] energy withheld on a base row: "Bone-Shaking Roar" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: fear — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (mechanical) [asked: buff_self] | "Give him a frightening roar" -> has (mechanical) [asked: save_area] [askMechanic: fear] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 9 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin swings his greataxe in a wide, terrifying arc. Each creature of his choice within reach must succeed on a Wisdom saving throw or take the weapon's damage and have the Frightened condition until the end of its next turn." [action/save/condition] [family: nova] — menu: throw-retrieve, shield-bash, lure, sensory-strike, disarm, execute, pacify, escalating-dread, terror-pulse, push-prone, curse-debt (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — fear: escalating-dread, terror-pulse
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), shield-bash (save/condition)
[reskin] keys would have bound: action — terror-pulse, throw-retrieve, rampage (roar, javelin, rage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_area
[reskin] word match declined by the call: throw-retrieve, execute, curse-debt — the key word does not mean the mechanic here
[reskin] signature template: terror-pulse -> Actions/"Terrifying Roar (2/Day)" ("Each creature of his choice must succeed on a Wisdom saving throw or be Frighten [verb: roar:concept]")
[reskin] keys spent by the action: roar
[reskin] signature idea (trait): "When Meshrin is Bloodied, his … becomes a constant, low growl that unnerves his foes: each creature that starts its turn within 10 feet of him must succeed on a Wisdom saving throw or have the Frightened condition until the start of its next turn." [trait/always/condition] [family: zone] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — fear: phobia, fear-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), fear-aura (start_of_turn/condition), berserk (always/condition)
[reskin] keys would have bound: trait — fear-aura (frightens, frightening)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=save_area
[reskin] word match declined by the call: phobia, berserk, fear-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:frightened: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:condition:frightened" has no key-table verb, but the call quotes "give him a frightening roar" from the description
[reskin] trait ceiling: "Frightening Roar" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] one mechanic, one name: Actions/"Terrifying Roar (2/Day)" -> "Horrid Display (2/Day)" — this row is terror-pulse and does what every terror-pulse row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Beast-Fear Roar = none; Bone-Shaking Roar = none
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Beast-Fear Roar (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Beast-Fear Roar (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] dead control row: "Horrid Display" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrid Display.
[reskin] row binds its clause: "Horrid Display" answers "Give him a frightening roar" — the keys it matched came from that clause, so the coverage credit has a receipt
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


### Rook Harrowgate — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rook Harrowgate | 5 (2014) | skirmisher-8-hurler | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Horrid Display: at-will multi-target control with no damage and no gate
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Handaxe); nova none; dmg 33

```
Rook Harrowgate
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

Riposte (Reaction). When a creature within 5 feet of Rook misses it with a melee attack roll, Rook makes one Handaxe attack against that creature.

Actions
Multiattack: Rook makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Rook has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage. Immediately after the attack, his handaxe returns to Rook's grasp, and Rook has advantage on its next attack roll against the target before the end of its next turn.
Horrid Display: Each creature of Rook's choice within 30 feet of Rook that can see or hear it must succeed on a DC 15 Wisdom saving throw or be frightened until the end of its next turn.
Shield Bash: One creature within 5 feet that Rook can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. If the target is a Medium or smaller creature, it is also knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Handaxe — authored for this sheet; a named part; a declared feature; the GM's clause "hurls a handaxe"; weapon handaxe
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
- Actions/Horrid Display — template terror-pulse; library draw (seed unstamped)
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "sellsword"

**Engine trace**

```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] name: provided_name rejected — "a sellsword who hurls a handaxe and clos…" is the description, not a name
[concept] hints: hurler→style ✓ ("hurls a handaxe and closes")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/terror mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurled handaxe opening a charge [behavior] | shortsword finish at close quarters [object] | mercenary nerve that weighs purse before blood [behavior]
[concept] identity: A lean sellsword who opens every fight by hurling his handaxe from a dozen paces, using the flinch to cross the ground and put his shortsword into the gap the throw opened. After that he works close and dirty, feinting a second throw to buy a half-step before driving in with the blade, only breaking off to recover his axe. Bloodied, he remembers the price of the contract more than the fight and looks for a line of retreat rather than dying for a purse.
[concept] lore: A discharged company blade who sells his arm to whoever pays and keeps his handaxe sharp against the day he must buy his own way out of a bad contract.
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
[reskin] inline declared: "Rook" — the call's own answer (person), built from the name
[reskin] inline form: "Rook" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "a sellsword" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a sellsword" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: trigger "at_will" stands on "hurls a handaxe" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "hurls a handaxe" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: trigger "at_will" stands on "closes with a shortsword" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "closes with a shortsword" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a sellsword" -> has (mechanical), head [asked: at_will/at_will/attack] | "hurls a handaxe" -> has (mechanical) [asked: at_will/at_will/attack] | "closes with a shortsword" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Rook feints a handaxe throw, then closes with a shortsword thrust. *Wisdom Saving Throw*: each creature within 10 feet of Rook that can see it. *Failure*: The target has the Frightened condition until the end of its next turn and cannot take Reactions until then." [action/save/condition] [family: mark] — menu: throw-retrieve, shield-bash, lure, sensory-strike, disarm, pacify, escalating-dread, terror-pulse, push-prone, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), sensory-strike (save/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will often=at_will
[reskin] word match declined by the call: escalating-dread, lure, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "terror-pulse" as nearest; it lands rather than the row being dropped (what it wanted: the feint's Wisdom save frightens and blocks Reactions as a rider on the hurled-)
[reskin] pick kept on the GM's own words: action — "terror-pulse" has no key-table verb, but the call quotes "a sellsword who hurls a handaxe and closes with a shortsword" from the description
[reskin] free signature row: "Feinting Throw (2/Day)" — a print body takes only what the user's words ask, but the call names the element it expresses: "hurled handaxe opening a charge". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: terror-pulse -> Actions/"Feinting Throw (2/Day)" ("The idea is a feint that frightens and strips reactions from nearby onlookers, a [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Rook has Advantage on attack rolls against any creature that is Prone or Frightened." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will often=at_will
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "blood-frenzy" as nearest; it lands rather than the row being dropped (what it wanted: grants Advantage against Prone or Frightened targets, a condition-gated accuracy)
[reskin] free signature row: trait — "blood-frenzy" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Cull the Fallen" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): blood-frenzy -> Traits/"Cull the Fallen" ("Rook has Advantage on attack rolls against any creature that is Prone or Frightened. [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Cull the Fallen" -> "Blood Frenzy" — this row is blood-frenzy and does what every blood-frenzy row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Feinting Throw (2/Day)" -> "Horrid Display (2/Day)" — this row is terror-pulse and does what every terror-pulse row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Shortsword = a shortsword; Handaxe = a handaxe; Cracking Throw = a handaxe; Feint and Close = a shortsword
[reskin] chassis nova: "Cracking Throw (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Common, one mercenary cant" -> "Common" (sapient)
[reskin] print canon multiattack: "Rook makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Cracking Throw (Recharge 5-6)" is the seat's nova, not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Slippery Footwork" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Handaxe" instead
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Shortsword" instead
[reskin] dead control row: "Horrid Display" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] free-row order: "Horrid Display" [quote] > "Blood Frenzy" [decoration] — a receipt row is never displaced by one without
[reskin] free row over budget: Traits/"Blood Frenzy" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Horrid Display" [action/save/condition]
[reskin] asked but unanswered: "a sellsword" asked for at_will/at_will and no row binds the clause
[reskin] ask vs row ok: "hurls a handaxe" -> "Handaxe" — trigger at_will, limit at_will
[reskin] ask vs row ok: "closes with a shortsword" -> "Shortsword" — trigger at_will, limit at_will
[reskin] element claim revoked: "Horrid Display" claims "hurled handaxe opening a charge" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Horrid Display")
audit finding below confidence gate: Shield Bash Prone has a built-in rules-legal exit (standing up), so this is not a counterplay defect; no finding needed.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] the feint's Wisdom save frightens and blocks Reactions as a rider on the hurled-handaxe charge rather than a standalone  — "Rook feints a handaxe throw, then closes with a shortsword thrust. *Wisdom Saving Throw*: each creature within 10 feet of Rook that can see it. *Failure*: The target has the Frightened condition until the end of its next turn and cannot take Reactions until then." — Rook Harrowgate [seat: action [action/save/condition]] (closest offered: terror-pulse) [effect: condition] [menu: shield-bash lure sensory-strike pacify escalating-dread terror-pulse push-prone reveal disarm stunning-strike throw-retrieve feint-slip] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality trample:style leap:legality thrown-burst:legality gaze-single:style snare:legality reel:legality condition-payoff:legality execute:role seal:role hook-drag:role active-toll:role pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:legality slow-bolt:role herd:role drain:role curse-debt:role wind-up:role exploiter:legality blighted-ground:role] [landed: terror-pulse]
[reskin] [gap] grants Advantage against Prone or Frightened targets, a condition-gated accuracy rider — "Rook has Advantage on attack rolls against any creature that is Prone or Frightened." — Rook Harrowgate [seat: trait [trait/always/damage]] (closest offered: blood-frenzy) [effect: condition] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury death-restoration berserk shielded-mind evasion relentless-pursuit bound relic-object guarded-stance undead-fortitude truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: blood-frenzy never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path class_npc
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

Surprise Attack. During the first round of each combat, Halric has advantage on attack rolls against any creature that hasn't taken a turn. If Halric hits a creature during that round, the target takes an extra 6 (1d12) bludgeoning damage.
Divine Aid (3/Day). As a bonus action, Halric casts bless, dispel magic, healing word, or lesser restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks: one with Mace and one with Radiant Flame.
Spellcasting: Halric casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13): -

At will: light, thaumaturgy

1/day each: spirit guardians
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Radiant Flame — print's own row
- Actions/Mace — print's own row; weapon mace
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "Brother"
- Traits/Surprise Attack — template assassinate; library draw (seed unstamped)

**Engine trace**

```
[path] class_npc — class cleric — "Brother" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Brother Halric" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("Brother Halric") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: none claimed
[concept] signature elements: holy war-prayers that strengthen allies and smite foes [behavior] | iron war-mace wreathed in radiant light [object] | the shield-wall zealot's battle-rally [aura]
[concept] identity: Brother Halric opens with a thundering battlefield prayer, marking the most dangerous foe and driving his shield-brothers' line forward like a hammer. He wades into the thick of it, laying about with a mace that crackles with holy light, and never leaves a downed enemy where it lies — every round he heals himself or an ally even as he breaks another skull. Under pressure he becomes a cornered zealot, fighting to the death in the name of his god and dragging as many of the unworthy down with him as he can.
[concept] lore: Once a humble village brother, Halric was called to war by a dying saint and now marches the old road as a holy banner-bearer, converting souls at mace-point and seeking the one battle worth dying in.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 3
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon defenses: HP 58 -> 38, AC 12 -> 13 — the Priest's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (chain shirt) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: caster-6 -> CR 3
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)
[reskin] print canon: "Brother Halric" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Lighted Mace = literal
[reskin] repair round 1: 2 defect(s) — "Bless" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern | "Cure Wounds" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] name_element answered: Lighted Mace = literal
[reskin] class kit: cleric — "Brother": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Halric"
[reskin] inline form: "Halric" — the model's own reading of the name
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 3 it is 1/Day)
[reskin] spell DC coherence: DC 13 -> 11 off Intelligence 13 (print's array stays)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] body verdicts: 33 of 33 answered; not true of this body: gaze-single, snare, zone, seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Brother Halric utters a battlefield prayer that marks one foe as the unworthy. That creature must make a Wisdom saving throw; on a failure, it is Frightened of Halric until the end of its next turn, and the next attack roll made against it by one of Halric's allies has Advantage." [action/save/condition] [family: mark] — menu: execute, wail, lure, ground-burst, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, reveal, wind-up, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] word match declined by the call: terror-pulse — the key word does not mean the mechanic here
[reskin] signature miss: action — "escalating-dread" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] fallback stands down: the class_npc path has no shelf — the Priest's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Halric's mace is wreathed in holy light that reveals and burns the unholy. When Halric hits a creature that is Frightened, Blinded, or otherwise afflicted by a condition with a Lighted Mace attack, the attack deals extra Radiant damage." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] word match declined by the call: blood-frenzy, pack-tactics, marking-light, fear-aura, relic-object — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "assassinate" as nearest; it lands rather than the row being dropped (what it wanted: extra Radiant damage on a hit against a creature that already has a condition su)
[reskin] free signature row: trait — "assassinate" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Searing Light" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): assassinate -> Traits/"Searing Light" ("The idea is a conditional damage rider: a Lighted Mace hit on a Frightened, Blin [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Searing Light" -> "Surprise Attack" — this row is assassinate and does what every assassinate row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Lighted Mace = mace
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Radiant Flame — the Priest's own ranged row, added (the chassis carried none to rename)
[reskin] print canon row: Actions/Mace — the Priest's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] print canon skills: "Arcana +3, Perception +5" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Lighted Mace" — the Priest prints no row for it and no path stage claimed it
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Necrotic" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Surprise Attack" [trait/always/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Surprise Attack")
audit finding below confidence gate: Surprise Attack The benefit only applies to a creature that hasn't taken a turn, so the GM has to track per-creature turn order in round one; this is resolvable but requires state the block gives no way to track, and 'hasn't taken a turn' is ambiguous about whether it means this combat or this round.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Divine Aid (3/Day)" carries "Brother" which is not a whole clause — the seat surgery cut it; resolved to cl_pdo4e1
[reskin] [gap] extra Radiant damage on a hit against a creature that already has a condition such as Frightened or Blinded — "Halric's mace is wreathed in holy light that reveals and burns the unholy. When Halric hits a creature that is Frightened, Blinded, or otherwise afflicted by a condition with a Lighted Mace attack, the attack deals extra Radiant damage." — Brother Halric [seat: trait [trait/always/damage]] (closest offered: assassinate) [effect: damage] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury shielded-mind relentless-pursuit bound marking-light relic-object undead-fortitude truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:role terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality death-restoration:legality uncanny-sense:legality earth-glide:legality tunneler:legality berserk:role evasion:role sealed-body:legality guarded-stance:role mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [landed: assassinate]
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path class_npc
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

