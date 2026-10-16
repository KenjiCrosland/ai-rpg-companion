# Case: stages 3 and 4 — two new call fields, three latent defects

Run: `smoke-out/stage34-2026-10-16T20-49-59` (10 blocks, 1 FAIL).
Review: `scripts/smoke-evidence/REVIEW-stage34-2026-10-16T20-49-59.md`.
Check: `scripts/smoke-evidence/CHECK-stage34-2026-10-16T20-49-59.md`.
Gates: 71 suites / 2797 passed; `npm run build` clean. 28 pins in
`reskin/__tests__/stage34-pins.spec.js`.

Both fields ride on calls we already make, so there is no new cost.

## What to look at first

**1. The implied class (stage 4 item 2) — the part I think is sound.**
The key table is a word list eight classes deep, and it missed every one of 12
hand-probed concepts, among them samurai, gladiator, kung fu master and pirate
captain, all of which train as one of the eight. The call now names the class
with a receipt and the engine keeps every veto. This run:

- `"rogue"` on *"a lizardfolk ninja who strikes from the reeds"*
- `"fighter"` on *"a samurai retainer sworn to a dead house"*
- `"fighter"` on *"a gladiator of the pit who plays to the crowd"*
- `"druid"` REFUSED — not one of the eight, and **not coerced to cleric**; the
  Standing Circle Druid ships Vine Staff / Verdant Wisp / Spellcasting and no kit rows
- the dire wolf took none (bestial refusal), and the tiefling rogue went through
  the TABLE — the call only ever speaks into a silence

Worth challenging: `soloLen: 5` lets a single five-letter word be the receipt,
because "ninja" and "ronin" are the real cases. Four would let a coincidental
"iron" justify a fighter. Is five the right line?

**2. The asked trigger/limit (stage 3 item 3) — the part I am least sure of.**
The call extracts the trigger, the limit and the shape the GM's own words name;
the engine reads the row that ANSWERED that clause (joined on `e.clause`) and
says whether they agree. It reports and never rewrites.

One finding has survived every run, in two instances of ONE shape — **the GM
names a trigger and the engine ships an untriggered row**:

| ask | row | verdict |
|---|---|---|
| *"slams the ground at the start of each of its turns"* | `Slam` | asked `start_of_turn`, row reads `at_will` |
| *"is never where you struck and steps away"* | `Misty Step` | asked `on_being_hit`, row reads `at_will` |

The second is the critic's own "never where you struck" case, found by a metric
this time instead of by a reader.

**This field cost four corrections to my own measurement before it read true**,
and the critic should weigh whether it earns its place:
- the row readers were wrong on real rows: "While Bloodied" demanded "is
  Bloodied", "hits with" demanded "hits a creature"
- the vocabulary had no per-day option, so a GM's "once per day" had nowhere
  correct to go and the call's forced answer was counted as its error
- the clause join took the first clause sharing any word, so the trigger for
  *"flies into a rage once per day when wounded"* landed on *"a berserker"*
- the call over-answers: *"mends her own wounds"* names no trigger and no limit
  and the call answered `on_hit` + `at_will`. An asked field now needs a
  supporting word in the GM's own clause or it is dropped (3 dropped this run)

Six real shipped rows are pinned as a calibration table.

## Three latent defects the new fields flushed out

None of these were caused by the fields; each was sitting in the engine and only
shipped once a door opened wider. This is the stage's main yield.

**The engine invented a weapon.** `templates.mjs` read
`ranged_name: ctx.rangedName ?? 'Longbow'`, so a ranged-host template on a sheet
with NO ranged attack rendered a bow the creature does not have — the Court
Step-Wizard's `Missed Step Riposte ... makes one Longbow attack` beside Slam and
Spellcasting. A template that cannot be filled now declines. Family: 6 of 186
saved runs, five shapes, including the Shadowblade "Poisoned Blade" bug chased
separately earlier this sprint.

**A row named for a weapon took another weapon's range.** The Pit Champion
shipped `Spear ... range 30/120 ft.` — a javelin's. `e.weapon` is fitted from the
row's numbers and outvoted the word a GM reads. The name wins now when it names a
real weapon; `weaponFor` returns null for invented names, so fitted weapons still
cover every row they were there for. Verified live: `Spear ... range 20/60 ft.`
with `weapon=scimitar` underneath.

**The dangling-reference scan lived in one reader only**, so the checker could
FAIL a sheet for citing a row that does not exist while generation built it
happily. It is one exported predicate now, called by both. Writing its pin found
that the scan over-captured: `uses Slam against the attacker` captured the whole
tail and read a legitimate row as dangling — harmless while only the checker
reported it, a silent false refusal once generation reads it. Bounded to a
title-case run. Old vs new, 12 runs / ~117 blocks: identical verdicts.

## Known and not fixed here

- `attack-stat` (the run's 1 FAIL): `Greataxe: +8 derives from DEX`. A class
  kit's weapon not matching the chassis stat. Pre-existing family, 12 of 188
  saved runs, 7 of them the same "Mace derives from DEX". Not from these fields —
  the berserker's class came from the table.
- the `lurker-5` donor is under print's CR 5 HP band in 4 of 4 runs (the owner's
  parked question 1).
- the generation-side dangling guard has pins on its predicate but has not fired
  on a live run: the condition has not recurred since the root cause was fixed.

---

# 2024 blocks

## Review batch — stage34-2026-10-16T20-49-59

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedwraith | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |
| Katsuro | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Sandpit Champion | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Standing Stone Druid | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Packshadow Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Sootpearl | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Oathwound Vangard | 8 | 2024 | skirmisher-8-winged | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 4/4 |
| Cathedral Warden | 9 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vexmoor the Thinshade | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Ashvowed Serrin | 8 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/6 |

**Dropped 2 of 11 user clauses** (coverage 82%); concept share 74% (34/46 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8-winged / derivation: 1



---


### Packshadow Dire Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Packshadow Dire Wolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Packshadow Dire Wolf

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Packmark Sense. The dire wolf can pinpoint the location of moving creatures within 60 feet of itself.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

**Where each row came from**

- Traits/Packmark Sense — template uncanny-sense; library draw (seed unstamped)
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack tactics [behavior] | darting lunge [behavior] | thick hide [body]
[concept] identity: A dire wolf that hunts in a pack opens by circling at the edges of the fight, letting its packmates draw the prey's attention before it lunges in with a snapping bite. Every round after, it darts in to strike, then withdraws out of reach, using its speed and the chaos of the pack to avoid retaliation. When bloodied, it does not flee but grows more desperate and reckless, snapping at anything within reach until it or its prey falls.
[concept] lore: These dire wolves are the descendants of an ancient pack that learned to hunt not by strength alone but by cunning coordination, and they now roam the deep forests and tundra edges, seeking to bring down larger prey than any single wolf could manage.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the dire wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The dire wolf feints low and snaps at the prey's legs, not to wound but to unbalance, then barks a sharp signal. Near the end of its turn, one unseen packmate still lurking in the brush answers the signal with a sudden bite at the same prey, striking from hiding where the chaos hides its approach. The packmate must be nearby and hidden when the signal is given." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: focus, affliction, rampage, patient-defense, self-invisibility, feint-slip, contagion, charge-push, hook-rider, pounce, isolation, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The dire wolf feints low and snaps at the prey's legs, not to wound but to unbalance, then barks a sharp signal. Near the end of its turn, one unseen packmate still lurking in the brush answers the signal with a sudden bite at the same prey, striking from hiding where the chaos hides its approach. The packmate must be nearby and hidden when the signal is given." [rider/on_hit/damage] — the model found no template that holds it (offered: focus, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage, patient-defense, self-invisibility, feint-slip)
[reskin] fallback respects the call: focus, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a dire wolf that hunts in a pack" heads on the Dire Wolf and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 1.7 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When the fight first begins, the wolf instinctively melts into whatever cover the land offers and marks the most threatening enemy as the pack's prey. From then on, it can always tell exactly where that prey is, even through thickets or darkness, as long as the prey remains within the hunt." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, terrain-walk, false-appearance, relentless-pursuit — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "uncanny-sense" has no key-table verb, but the call quotes "a dire wolf that hunts in a pack" from the description
[reskin] signature template (trait): uncanny-sense -> Traits/"Packmark Sense" ("the wolf can always tell exactly where its marked prey is, even through thickets [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Hunter" is the seat's, not the Dire Wolf's
```


---


### Cathedral Warden — highest CR

**Concept:** a temple guardian that slams the ground at the start of each of its turns

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cathedral Warden | 9 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 10 → 8.5; sustained 62 (2 × Slam); nova Seismic Toll 32; dmg 63

```
Cathedral Warden

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 161 (17d10 + 68)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+8
INT
7
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
18
+4
+8
CHA
3
-4
-4

Skills Athletics +8, Perception +4

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses tremorsense 60 ft.; Passive Perception 14

Languages Understands commands given in any language but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Bound. The warden is magically bound to an amulet. While the warden and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the warden to travel to it, and the warden knows the distance and direction to the amulet. If the warden is within 60 feet of the amulet's wearer, half of any damage the wearer takes (round up) is transferred to the warden.

Regeneration. The warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Spell Storing. A spellcaster who wears the warden's amulet can cause the warden to store one spell of level 4 or lower. To do so, the wearer must cast the spell on the warden while within 5 feet of it. The spell has no effect but is stored within the warden. Any previously stored spell is lost when a new spell is stored. The warden can cast the spell stored with any parameters set by the original caster, requiring no spell components and using the caster's spellcasting ability. The stored spell is then lost.

Actions

Multiattack. The warden makes two Slam attacks.

Slam. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Bludgeoning damage, and the target has the Prone condition.

Seismic Toll (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 15-foot Emanation originating from the warden. Failure: 32 (5d12) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — authored for this sheet; a named part; the GM's clause "slams the ground at the start of each of its turns"
- Actions/Seismic Toll — template ground-burst; library draw (seed unstamped); the GM's clause "slams the ground at the start of each of its turns"; binds the GM's words: slams the ground+shockwave
- Traits/Bound — print's own row
- Traits/Regeneration — print's own row
- Traits/Spell Storing — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("a temple guardian that slams the ground ") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ground-slam that trembles the earth [behavior] | carved stone body [body] | temple guardian duty [behavior]
[concept] identity: The guardian opens by slamming its stone fists into the temple floor, sending a shockwave through the flagstones that forces every attacker to find their footing. Each round after, it grinds forward in tireless, methodical strides, using its massive forearms to batter and crush whichever foe stands between it and the chamber's heart. It fights to destruction without fear or hesitation, for it knows no pain and no retreat — only the duty it was carved to perform.
[concept] lore: Carved from the living rock of a forgotten temple's foundation, this guardian was bound with the last breath of its maker and wakes only when intruders tread the sacred ground it was shaped to protect.
[reskin] print canon route: the Shield Guardian's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 18, DEX 8, CON 18, INT 7, WIS 10, CHA 3 — the Shield Guardian's, STR fitted to +8
[reskin] donor: brute-9 -> CR 9
[reskin] print canon: "a temple guardian that slams the ground at the start of each of its turns" heads on the Shield Guardian — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] named parts: Slam (slot, Prone) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 4 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a temple guardian" -> has (descriptive), head | "slams the ground at the start of each of its turns" -> has (mechanical)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The warden smashes its stone fists into the ground at the start of every turn it takes. The shockwave rolls outward in every direction from where it struck, buckling flagstones and heaving the earth under nearby intruders' feet. Anyone caught in the heaving ground is knocked off-balance and left scrambling to stand again, and the warden never needs to decide to do this — it simply does, like a hea" [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: trample, leap, thrown-burst, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter, blighted-ground, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — ground-burst, blighted-ground (slams the ground, ground)
[reskin] value check: "Seismic Toll (Recharge 5-6)" EV 84.8 vs floor 54.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Seismic Toll (Recharge 5-6)" ("ground strike plus an outward shockwave that damages and destabilizes nearby cre [verb: slams the ground:concept, shockwave:idea]")
[reskin] keys spent by the action: slams the ground
[reskin] signature idea (trait): "The warden's body is living temple stone, and every blow that lands against it only rings through the foundation it guards. When someone strikes the warden in melee, the impact sends a deep shudder back through the attacker's arms and into their stance, leaving them briefly unable to find solid footing." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: false-appearance, aberrant-ground, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The warden's body is living temple stone, and every blow that lands against it only rings through the foundation it guards. When someone strikes the warden in melee, the impact sends a deep shudder back through the attacker's arms and into their stance, leaving them briefly unable to find solid footing." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, aberrant-ground)
[reskin] weapons answered: Slam = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands commands given in any language but can't speak" — the Shield Guardian's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Shield Guardian's walk; the concept's other modes stay
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon trait: Bound — "a temple guardian that slams the ground at the start of each of its turns" is the Shield Guardian (print's own row)
[reskin] print canon trait: Regeneration — "a temple guardian that slams the ground at the start of each of its turns" is the Shield Guardian (print's own row)
[reskin] print canon trait: Spell Storing — "a temple guardian that slams the ground at the start of each of its turns" is the Shield Guardian (print's own row)
[reskin] row binds its clause: "Seismic Toll" answers "slams the ground at the start of each of its turns" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---


### Reedwraith — a 2024 sheet

**Concept:** a lizardfolk ninja who strikes from the reeds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedwraith | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Reedblade); nova none; dmg 34

```
(not the page capture — the card capture came back empty; drawn from the saved JSON)
Reedwraith
Medium Humanoid, Neutral
AC 16
HP 91 (14d8 + 28)
Speed 30 ft., Climb 30 ft., Swim 40 ft.
STR 12 DEX 16 CON 14 INT 8 WIS 12 CHA 8
Skills Perception +4, Stealth +9
Senses Passive Perception 14
Languages Common, Draconic
CR 5

Traits
Hold Breath. The reedwraith can hold its breath for 15 minutes.
Marsh Stride. Difficult Terrain composed of mud doesn't cost the reedwraith extra movement, and the reedwraith can move across mud without needing to make an ability check.

Actions
Multiattack. The reedwraith makes two attacks, using Reedblade or Reed-Dart in any combination.
Reedblade. *Melee Attack Roll:* +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.
Reed-Dart. *Ranged Attack Roll:* +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions
Cunning Action. The reedwraith takes the Dash, Disengage, or Hide action.
Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the reedwraith moves up to half its Speed, and it makes one Reedblade attack.
```

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "a lizardfolk ninja"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "strikes from the reeds"
- Actions/Multiattack — the chassis
- Actions/Reedblade — weapon scimitar
- Actions/Reed-Dart — weapon dart
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a lizardfolk ninja who strikes from the ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/aquatic mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ambush from the reeds [behavior] | venom-dripping reed-blade [object] | gilly, reed-cloaked body [body]
[concept] identity: The reed-stalker opens from ambush, erupting out of the shallows with a reed-bladed strike that carries its venom, then melts back into the greenery before the party can answer. It fights only on its own terms: each round it vanishes, repositions, and strikes again from concealment, refusing to be pinned. Bloodied, it does not flee—it simply stops playing, fighting from the reeds with patient, silent precision until the last wound is delivered or its prey stumbles into a killing spot.
[concept] lore: A lizardfolk outcast of a marsh tribe that trains its exiles as reed-wraiths, it haunts the shallows to prove the tribe wrong about its worth by leaving no witness alive.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] name_element answered: Choking Venom = literal
[reskin] row evicted for the cap: Traits/"Reedstep" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "a lizardfolk ninja": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored, binds "strikes from the reeds"); Swim 30 ft.
[reskin] implied class kept: "rogue" on the GM's own words "a lizardfolk ninja who strikes from the reeds" — the key table found none
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a lizardfolk ninja who strikes from the reeds": nothing landed; Evasion yielded to print's row cap 4
[reskin] inline declared: "the reedwraith" — the call's own answer (kind), built from the name; the rules would have said "Reedwraith"
[reskin] inline form: "the reedwraith" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk ninja" -> has (descriptive), head | "strikes from the reeds" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the reedwraith strikes from hiding, its reed-blade drips with marsh venom that clings to the wound. At the start of the victim's next turn, the venom surges, wracking the body with searing pain that makes it falter. Only one such envenomed wound can be active on a creature; a new strike replaces the old." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] rider declined: "Marsh Venom Strike" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] fallback skipped by the floor: gaze-single (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The reedwraith's body naturally secretes a thick, paralytic venom that coats its reed-blade and any reed-darts it carries. When it hits with these weapons, the venom enters the wound and begins to stiffen the limbs." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (reeds)
[reskin] word match declined by the call: terrain-walk, bloodied-fury, bloodied-burst, false-appearance, adhesive, spider-climb, phobia, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for reeds, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The reedwraith's body naturally secretes a thick, paralytic venom that coats its reed-blade and any reed-darts it carries. When it hits with these weapons, the venom enters the wound and begins to stiffen the limbs." [trait/always/condition] — the model found no template that holds it (offered: terrain-walk, false-appearance, adhesive, spider-climb, phobia, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Reedblade = scimitar; Reed-Dart = dart
[reskin] weapon declared: "Reedblade" is a scimitar — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Reed-Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
!! Failed to load resource: net::ERR_NETWORK_IO_SUSPENDED
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792183723985:1374:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792183723985:1213:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792183723985:656:5)
!! [ENRICHMENT] Failed to enrich Reedwraith: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792183723985:1374:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792183723985:1213:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792183723985:656:5)
(enrichment did not settle within 20s — moving on)
```


---


### Sandpit Champion — a print donor

**Concept:** a gladiator of the pit who plays to the crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sandpit Champion | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Spear); nova none; dmg 52

```
Sandpit Champion

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

Actions

Multiattack. The champion makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 26 (5d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the champion can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Reactions

Riposte. Trigger: A creature within 5 feet of the champion misses it with a melee attack roll. Response: The champion makes one Spear attack against that creature.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spear — print's own row, renamed; weapon scimitar
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a gladiator of the pit who plays to the crowd"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("plays to the crowd") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/beguiling mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: playing to the crowd [behavior] | pit-forged iron gladius [object] | captain's command voice [behavior]
[concept] identity: A pit gladiator who fights for the roar of the sand-crowd, opening with a showman's flourish before locking down a rival champion and directing allies with shouted cues and a leveled blade. Every round it balances offense and command, spending its action to harry and its presence to steady its troupe — a duelist’s captain, not a brute. Bloodied, it grins wider, turning a losing bout into a heel turn that baits the crowd and goads survivors into overextension; it fights to the death because the pit never forgives a curtain call.
[concept] lore: Forged in the slave-pits of a coliseum-city, it was remade by a decade of blood-sport into a crowd-owned killer who believes the only true freedom is an ovation.
[reskin] print canon route: the Gladiator's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a gladiator of the pit who plays to the crowd" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] implied class kept: "fighter" on the GM's own words "a gladiator of the pit who plays to the crowd" — the key table found none
[reskin] class kit: fighter — "a gladiator of the pit who plays to the crowd": Riposte (riposte)
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a gladiator of the pit" -> has (descriptive), head | "plays to the crowd" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The champion whips the crowd into a frenzy, turning every eye on one enemy. Until the champion's next turn, its allies can all gang up on that enemy without giving it any opening. The champion must keep the show going—if it doesn't attack or threaten someone on its next turn, the crowd's roar dies and the effect ends early. Limits: affects only one enemy at a time, and the champion can't use it wh" [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: rally, herd, throw-retrieve — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The champion whips the crowd into a frenzy, turning every eye on one enemy. Until the champion's next turn, its allies can all gang up on that enemy without giving it any opening. The champion must keep the show going—if it doesn't attack or threaten someone on its next turn, the crowd's roar dies and the effect ends early. Limits: affects only one enemy at a time, and the champion can't use it wh" [action/always/condition] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a gladiator of the pit who plays to the crowd" heads on the Gladiator and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 13 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The champion is pit-forged iron: when it lands a telling blow, the crowd's roar steels it against being pushed, tripped, or shoved. Its body simply refuses to yield space it has claimed." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: resonant-body, adhesive, faultless-tracker, bloodied-fury, berserk, relentless-pursuit, terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] trait declined: "Pit-Forged Iron" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Scimitar = scimitar; Barbed Whip = whip
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Scimitar" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Barbed Whip leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
```


---


### Ashvowed Serrin — one marked soft

**Concept:** an oathsworn crusader who smites the unclean and mends her own wounds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Serrin | 8 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Ironbound Mace: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (3 × Ironbound Mace); nova none; dmg 54

```
Ashvowed Serrin

Medium Humanoid, Lawful Neutral

AC 15
Initiative +1 (11)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
-2
-2
MOD
SAVE
DEX
12
+1
+1
WIS
8
-1
-1
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +2

Senses Passive Perception 12

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Serrin, Serrin and its allies have Advantage on attack rolls and saving throws, provided Serrin doesn't have the Incapacitated condition.

Regeneration. Serrin regains 10 Hit Points at the start of each of its turns. If Serrin takes Acid or Fire damage, this trait doesn't function on Serrin's next turn. Serrin dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. Serrin makes three Ironbound Mace attacks.

Ironbound Mace. Melee Attack Roll: +8, reach 10 ft. 18 (3d8 + 5) Bludgeoning damage.

Bonus Actions

Lay on Hands (2/Day). Serrin touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Serrin charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Shattering Reprisal. One creature within 5 feet that hit Serrin with an attack roll since the end of Serrin's last turn takes 7 (2d6) Bludgeoning damage.

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

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "an oathsworn crusader"
- Traits/Regeneration — the chassis
- Actions/Multiattack — the chassis
- Actions/Ironbound Mace — weapon mace
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her own wounds"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Shattering Reprisal — template own-turn-punisher; library draw (seed unstamped); binds the GM's words: punish

**Engine trace**

```
[route] brute-regenerator type=Humanoid mechanics=regeneration — caster-warpriest: a caster line needs a magic word in the words — none here | brute-regenerator: ✓ ("mends her own wounds") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("smites the unclean and mends her wounds")
[concept] resolve: archetype=brute type=Humanoid themes=forged/celestial mind=sapient style=regenerator energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: smiting the unclean with radiant iron [behavior] | self-mending through sacred oath [behavior] | iron-bound mace and armor [object]
[concept] identity: The Oathsworn Crusader wades into the unclean with her iron-bound mace, channeling radiant smites through every blow. Each round she strikes the most tainted foe, then uses her divine oath to mend her own wounds, closing cuts and knitting bone as she presses forward. She never flees from the unholy—she fights to the death, driven by an unbreakable vow.
[concept] lore: Sworn to an iron oath in a fallen temple, she now wanders the land, mending her own torn flesh with whispered vows while she hunts down the corrupted and the faithless.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: brute-5-regenerator -> CR 8
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Serrin" — the call's own answer (person), built from the name
[reskin] inline form: "Serrin" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "smites the unclean" carries no trigger word, so the call's "on_hit" has no receipt in the GM's own clause
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her own wounds" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "Serrin swings her mace in a shattering arc that knocks the unclean off their feet and leaves them sprawled and bleeding, unable to rise cleanly or strike true until they claw their way back up. Forged against the corrupted, the blow lands heavier against those already marked by her smite, punishing the faithless where they fall." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] value check: "Shattering Reprisal" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Shattering Reprisal" ("Serrin punishes the unclean who strike her—the blow lands heavier against those  [verb: punish:idea]")
[reskin] signature idea (trait): "Whenever a foe's attack fails to draw blood against Serrin's iron-bound plate, the blocked blow rebounds into a ringing rebuke that sears the attacker with radiant judgment, as her armor itself enforces the oath she carries." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: resonant-body, absorption, weapon-lodge, bloodied-burst, bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for wounded, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever a foe's attack fails to draw blood against Serrin's iron-bound plate, the blocked blow rebounds into a ringing rebuke that sears the attacker with radiant judgment, as her armor itself enforces the oath she carries." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, absorption, resonant-body, weapon-lodge, uncanny-sense)
[reskin] weapons answered: Ironbound Mace = mace
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---


### Katsuro — in the run

**Concept:** a samurai retainer sworn to a dead house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Katsuro | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Katana); nova none; dmg 44

```
Katsuro

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Senses Passive Perception 14

Languages Common

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Katsuro makes two attacks, using Katana or Bow in any combination.

Katana. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Bow. Ranged Attack Roll: +4, range 150/600 ft. 19 (4d8 + 1) Piercing damage.

Bonus Actions

Dead House's Challenge. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of Katsuro's next turn, the target has Disadvantage on attack rolls against creatures other than Katsuro.

Reactions

Riposte. Trigger: A creature within 5 feet of Katsuro misses it with a melee attack roll. Response: Katsuro makes one Katana attack against that creature.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Katana — weapon longsword
- Actions/Bow — weapon longbow
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a samurai retainer sworn to a dead house"
- Bonus Actions/Dead House's Challenge — template aggro-curse; library draw (seed unstamped); binds the GM's words: sworn+challenge

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a samurai retainer") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=grave/armed mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: sworn to a dead house [behavior] | disciplined counter-strike [behavior] | weathered iron and lacquered armor [body]
[concept] identity: The Last Retainer holds a three-step defensive perimeter, and any creature that crosses it eats a punishing iaido counter. It does not chase; it outlasts, letting wounded trespassers grow bold before opening their bellies on the return stroke. Bloodied, it does not flee—it kneels, names its dead lord aloud, and rises for a final, unarmored stand.
[concept] lore: A sword-oath bound this warrior to a house that no longer breathes, and it patrols the ruined family shrine still, executing the last clause of a contract no one else survived to release it from.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] implied class kept: "fighter" on the GM's own words "a samurai retainer sworn to a dead house" — the key table found none
[reskin] class kit: fighter — "a samurai retainer sworn to a dead house": Riposte (riposte)
[reskin] inline declared: "Katsuro" — the call's own answer (person), built from the name
[reskin] inline form: "Katsuro" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no one else survived" quotes nothing the user typed
[reskin] lacks refused: "does not chase" quotes nothing the user typed
[reskin] lacks refused: "does not flee" quotes nothing the user typed
[reskin] clauses: "a samurai retainer sworn to a dead house" -> has (descriptive), head
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Katsuro plants its feet and speaks the dead house's name, challenging a single foe. If that foe attacks, it must face Katsuro alone and its blows rebound into its own flesh; if it refuses and turns away, Katsuro closes the gap and punishes the cowardice with one measured cut." [action/save/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — aggro-curse (sworn)
[reskin] word match declined by the call: own-turn-punisher — the key word does not mean the mechanic here
[reskin] value check: "Dead House's Challenge" EV 6.3 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Dead House's Challenge" ("the foe is challenged alone; attacking means facing Katsuro, turning away invite [verb: sworn:concept, challenge:idea]")
[reskin] keys spent by the action: sworn
[reskin] signature idea (trait): "Armor worn for a master who no longer breathes has become an oath in iron. The first telling blow from a foe each fight rings against the lacquer and turns aside, teaching Katsuro the angle of that enemy's steel; every later strike from the same foe finds the gap." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Iron Oath" — bound only on the idea's own words (turns aside:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Katana = longsword; Bow = longbow
[reskin] weapon declared: "Katana" is a longsword — the call's own answer
[reskin] weapon declared: "Bow" is a longbow — the call's own answer (the name alone read bow)
[reskin] weapon table: "Bow" rolls Dexterity — +7 → +4
[reskin] weapon table: "Bow" damage off Dexterity — 22 (4d8 + 4) → 19 (4d8 + 1)
[reskin] weapon table: "Bow" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---


### Standing Stone Druid — in the run

**Concept:** a druid of the standing stones who calls the briars

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Standing Stone Druid | 6 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 7 → 5.5; sustained 48 (2 × Vine Staff); nova none; dmg 48

```
Standing Stone Druid

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 104 (19d8 + 19)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+1
MOD
SAVE
DEX
18
+4
+7
WIS
16
+3
+3
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Perception +6, Stealth +7

Senses Passive Perception 16

Languages Common, Druidic, Sylvan

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination. It can replace one attack with a use of Creeping Dread.

Vine Staff. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage plus 2 (1d4) Poison damage.

Verdant Wisp. Ranged Attack Roll: +7, range 90 ft. 17 (3d8 + 4) Radiant damage.

Creeping Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the druid's next turn. If the target was already Frightened by this ability, it also takes 21 (6d6) Psychic damage.

Spellcasting. The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Druidcraft, Speak with Animals
- 2/Day Each: Entangle, Thunderwave
- 1/Day Each: Animal Messenger, Longstrider, Moonbeam

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Vine Staff — print's row, renamed; weapon whip
- Actions/Verdant Wisp — print's own row, renamed; weapon dart
- Actions/Creeping Dread — library seed escalating-dread
- Actions/Spellcasting — print's own row

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=snare — caster-binder: ✓ ("calls the briars") | caster-binder: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=verdant/grasping mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: snare
[concept] signature elements: briar-curses that snare and strip actions [behavior] | standing-stone-bound druid [body] | thorned vines erupting from earth and hide [aura]
[concept] identity: The druid opens by seeding the battlefield with briar-curses — thorned hexes that root, slow, and blind — then every round after, it drags one more enemy action out of the fight, denying reactions, stripping bonus actions, and choking spells in the throat. It fights like a gardener pruning a hedge: patient, methodical, never chasing, and it does not flee — it merely retreats to a ring of standing stones and lets the briars finish what its curses started.
[concept] lore: A druid who bound their spirit to a ring of standing stones and now speaks only through the briars that grow from the cracks — it wants nothing more than to reclaim the wild places one stolen action at a time.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Druid's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Druid is not a caster first and keys DEX 12 over STR 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 10, DEX 18, CON 13, INT 12, WIS 16, CHA 11 — the Druid's, DEX fitted to +7
[reskin] donor: skirmisher-3 -> CR 6
[reskin] print canon: "a druid of the standing stones who calls the briars" heads on the Druid — print's rows ride along; the seat stays
[reskin] implied class refused: the call answered "druid", which is not one of the eight on the shelf (rogue, fighter, monk, paladin, cleric, mage, bard, barbarian)
[reskin] inline declared: "the druid" — the call's own answer (kind), built from the name
[reskin] inline form: "the druid" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "None listed" quotes nothing the user typed
[reskin] clauses: "a druid of the standing stones" -> has (descriptive), head | "calls the briars" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The druid calls a thorned seed into one creature it can see, and the seed takes root in that creature's shadow. Until the druid loses sight of it or chooses a new host, the seeded creature cannot use its reaction, and whenever it tries to cast a spell or take a bonus action it must first tear free of the roots, losing that action; the roots tighten and the curse strips one more action from the fig" [action/save/condition] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — lure (call)
[reskin] word match declined by the call: lure, disarm — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown lure, which the GM's words keyed
[reskin] key match declined: action — "lure" was ranked first on the call's own menu for call, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The druid calls a thorned seed into one creature it can see, and the seed takes root in that creature's shadow. Until the druid loses sight of it or chooses a new host, the seeded creature cannot use its reaction, and whenever it tries to cast a spell or take a bonus action it must first tear free of the roots, losing that action; the roots tighten and the curse strips one more action from the fig" [action/save/condition] — the model found no template that holds it (offered: lure, trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, focus)
[reskin] fallback respects the call: lure, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a druid of the standing stones who calls the briars" heads on the Druid and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 14.4 vs floor 10.9 (one attack of 2) — dice 11 → 21
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A creature that strikes the druid in melee finds its weapon and limbs trailed by thorned briars that root it to the spot, preventing it from moving away from the druid on its next turn and slowing its speed to a crawling pace." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: aberrant-ground, faultless-tracker, false-appearance, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "A creature that strikes the druid in melee finds its weapon and limbs trailed by thorned briars that root it to the spot, preventing it from moving away from the druid on its next turn and slowing its speed to a crawling pace." [trait/on_being_hit/movement] — the model found no template that holds it (offered: false-appearance, absorption, bloodied-burst, resonant-body, aberrant-ground, faultless-tracker)
[reskin] concept-first trait skipped: false-appearance — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bramble Whip = none; Thorn Dart = none
[reskin] weapon table: "Thorn Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common, Druidic, Sylvan" — the Druid's
[reskin] print canon attack: "Bramble Whip" -> "Vine Staff" — the Druid's own row
[reskin] print canon attack: "Thorn Dart" -> "Verdant Wisp" — the Druid's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Druid's
[reskin] print canon: chassis row leaves — Traits/"Thornward Step" is the seat's, not the Druid's
[reskin] print canon row: Actions/Spellcasting — the Druid's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] audit rename blocked — "Earthen Grasp of Judgment" promises the Grappled condition that "Creeping Dread" does not deliver
[reskin] weapon reach: "Vine Staff" reaches 10 ft. — print's whip has Reach
```


---


### Sootpearl — in the run

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sootpearl | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Sootpearl

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+2
MOD
SAVE
CON
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Sootpearl has Advantage on attack rolls against any creature that hasn't taken a turn. If Sootpearl hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Sootpearl is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Sootpearl instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Sootpearl makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sootpearl takes the Dash, Disengage, or Hide action.

Answering Sting. One creature within 5 feet that hit Sootpearl with an attack roll since the end of Sootpearl's last turn takes 7 (2d6) Bludgeoning damage.

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

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "stalks the rooftops of the old quarter"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "a tiefling rogue"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=fiendish/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking via uncanny climb [behavior] | fiend-blooded tiefling heritage [body] | paired hand crossbows and throwing knives [object]
[concept] identity: A tiefling rogue who shadows the rooftops of the old quarter, opening combat with a sudden crossbow bolt or thrown knife from a hidden perch, then using *Cunning Action* to relocate and *Uncanny Dodge* to blunt retaliation. Each round she repositions via alleys and chimney stacks to regain *Sneak Attack*, targeting the most isolated or bloodied foe. Bloodied, she vanishes into the quarter's maze, preferring to escape and stalk again rather than duel to the death—and she toys with prey she believes outmatched.
[concept] lore: Cast out from the lower city for the fiend-blood in her veins, she now haunts the old quarter's rooftops, exacting a quiet toll in coin and fear from those who cross her domain.
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] row evicted for the cap: Traits/"Rooftop Stalker" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "a tiefling rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Sootpearl" — the call's own answer (person), built from the name
[reskin] inline form: "Sootpearl" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Sootpearl becomes one with the rooftop silence: she pulls herself up any wall or overhang with unnatural ease, freezing in place just below the skyline. While she remains motionless there, she blends into the dark and distant, nearly impossible to pick out even by those searching for her." [action/always/movement] — menu: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sootpearl becomes one with the rooftop silence: she pulls herself up any wall or overhang with unnatural ease, freezing in place just below the skyline. While she remains motionless there, she blends into the dark and distant, nearly impossible to pick out even by those searching for her." [action/always/movement] — the model found no template that holds it (offered: focus, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Sootpearl's footing on ledges, chimneys, and narrow beams is preternatural; slopes and loose tiles are as solid as a floor. She can stalk along any rooftop edge at full speed without slipping or slowing." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, aberrant-ground, spider-climb, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Sootpearl's footing on ledges, chimneys, and narrow beams is preternatural; slopes and loose tiles are as solid as a floor. She can stalk along any rooftop edge at full speed without slipping or slowing." [trait/always/movement] — the model picked "terrain-walk" (no verb, and it quotes nothing the GM typed) over a concept-verb template (faultless-tracker)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Kukri = kukri; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Kukri" -> "Shortsword" — the Spy's own row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
audit finding below confidence gate: Answering Sting The entry's name promises a piercing venomous sting (consistent with the Shortsword's poison), but the text deals Bludgeoning damage, a type with no shared physical cause with the rest of the block.
[reskin] species kit: resistance Fire — the tiefling's
```


---


### Oathwound Vangard — in the run

**Concept:** a berserker who flies into an unstoppable rage once per day when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathwound Vangard | 8 | skirmisher-8-winged | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Greataxe: +8 derives from DEX, but an attack row rolls STR
- **dropped clause:** "flies into an unstoppable rage once per day when wounded"
- read: def 5 / off 9 → 7; sustained 42 (3 × Greataxe); nova Skyfall Dive 44; dmg 57

```
Oathwound Vangard

Medium Humanoid, Neutral

AC 17
Initiative +5 (15)

HP 120 (16d8 + 48)

Speed 30 ft., Fly 70 ft.

MOD
SAVE
STR
16
+3
+3
INT
9
-1
-1
MOD
SAVE
DEX
20
+5
+8
WIS
11
+0
+3
MOD
SAVE
CON
17
+3
+3
CHA
9
-1
-1

Skills Perception +3, Stealth +8

Senses Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the vangard has Advantage on attack rolls and saving throws.

Swooping Flight. The vangard doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. The vangard makes three Greataxe attacks.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Slashing damage. If the vangard flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Skyfall Dive (Recharge 5-6). The vangard flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 16. Failure: 44 (8d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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

**Where each row came from**

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a berserker"
- Traits/Swooping Flight — the chassis
- Actions/Multiattack — the chassis
- Actions/Greataxe — print's row, renamed
- Actions/Skyfall Dive — the chassis

**Engine trace**

```
[route] skirmisher-winged type=Humanoid mechanics=none — brute: ✓ ("a berserker who flies into an unstoppabl") | brute -> skirmisher-winged: the concept's VERB outranks the noun (key "flies", class verb) | skirmisher-winged: key "flies" (class verb)
[concept] hints: winged→style ✗ ("flies into an unstoppable rage")
[concept] resolve: archetype=skirmisher type=Humanoid themes=aerial/bestial mind=sapient style=winged energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: one rage per day when wounded [behavior] | swooping snatch-and-drop attacks on the wing [behavior] | wings of blood and rage [body]
[concept] identity: On the wing, the rage-wounded berserker dives from above to snatch a foe, carries them aloft, and releases them to fall — repeating the swooping strike each round until blood is drawn. Once per day, the first wound it suffers triggers an unstoppable rage: it stops disengaging, fights to the death, and hurls itself into unrelenting, suicidal dives rather than ever fleeing.
[concept] lore: Born of a blood-oath sworn on a mountaintop, these winged warriors spend their lives waiting for the one wound that will finally let them stop holding back.
[reskin] nova capped: "Diving Attack" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] print canon array: STR 16, DEX 20, CON 17, INT 9, WIS 11, CHA 9 — the Berserker's, DEX fitted to +8
[reskin] donor: skirmisher-8-winged -> CR 8 (invented — no printed peer)
[reskin] print canon: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — name "Talons" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "a berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] inline declared: "the vangard" — the call's own answer (kind), built from the name
[reskin] inline form: "the vangard" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "a berserker" carries no trigger word, so the call's "when_bloodied" has no receipt in the GM's own clause
[reskin] asked field dropped: "a berserker" carries no frequency word, so the call's "per_day" has no receipt in the GM's own clause
[reskin] clauses: "a berserker" -> has (mechanical), head [asked: buff_self] | "flies into an unstoppable rage once per day when wounded" -> has (mechanical) [asked: when_bloodied/per_day/buff_self]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The vangard marks the foe that first drew its blood, swearing a blood-oath only death can break. While that foe lives, the vangard fights on past the point where its body should have given out, each new wound only driving it faster and more savagely toward the one who opened the vein. When the marked foe finally falls, so too does the rage that held the vangard upright, and it collapses." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] word match declined by the call: aggro-curse, delayed-brand, affliction — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The vangard marks the foe that first drew its blood, swearing a blood-oath only death can break. While that foe lives, the vangard fights on past the point where its body should have given out, each new wound only driving it faster and more savagely toward the one who opened the vein. When the marked foe finally falls, so too does the rage that held the vangard upright, and it collapses." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, aggro-curse, delayed-brand, exploiter, riposte)
[reskin] fallback stands down: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.9 vs floor 38 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The vangard was born of a blood-oath sworn on a mountaintop, and its wings remember that vow. Whenever a wound is dealt to it, the spilled blood lifts it — it flies faster, strikes harder, and no fear of death can slow its dive." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (wounded, rage)
[reskin] word match declined by the call: bloodied-burst, absorption, resonant-body, death-burst, uncanny-sense, phobia — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for wounded+rage, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The vangard was born of a blood-oath sworn on a mountaintop, and its wings remember that vow. Whenever a wound is dealt to it, the spilled blood lifts it — it flies faster, strikes harder, and no fear of death can slow its dive." [trait/on_being_hit/movement] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body, phobia, uncanny-sense, death-burst)
[reskin] concept-first trait skipped: bloodied-fury — the GM's words key it, but the call was offered it against those words and declined
[reskin] repair: 1 clause(s) with no row — "flies into an unstoppable rage once per day when wounded"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Talons = none; Skyfall Dive = none
[reskin] chassis nova: "Skyfall Dive (Recharge 5-6)" — the skirmisher-8-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon attack: "Talons" -> "Greataxe" — the Berserker's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Aerial Agility" is the seat's, not the Berserker's
[reskin] asked but unanswered: "flies into an unstoppable rage once per day when wounded" asked for when_bloodied/per_day and no row binds the clause
```


---


### Vexmoor the Thinshade — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vexmoor the Thinshade | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Vexmoor the Thinshade

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+6
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vexmoor makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. Vexmoor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Vexmoor casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). Vexmoor teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Vexmoor is hit by an attack roll. Response: Vexmoor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Phase Slip — template phase-slip; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: step+vanish+shadow

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Humanoid themes=arcane/beguiling mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands [behavior] | step sideways out of harm [behavior] | courtly robes of woven shadow [body]
[concept] identity: The Court Wizard opens by never being where the blade fell — a shimmer of displaced air and a whispered syllable, and the strike passes through an afterimage. Every round after, it steps sideways out of harm's way and answers with a needle of force that finds the seam in armor, fighting to the death only when cornered and otherwise toying with prey who cannot pin it down.
[concept] lore: A royal sorcerer who traded his own solidity for the perfect evasion, he now haunts the throne room he once served, unable to reclaim the chair but unwilling to leave it.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Force Needle" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "Vexmoor" — the call's own answer (person), built from the name
[reskin] inline form: "Vexmoor" — the model's own reading of the name
[reskin] energy withheld on a base row: "Force Needle" Force -> Piercing (the row's own noun; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vexmoor picks one enemy it can see and steps into that enemy's shadow, vanishing from where it stood. Until the start of its next turn, that enemy sees and hears only Vexmoor, and Vexmoor's force needles strike from impossible angles. Other creatures still perceive Vexmoor normally." [action/always/condition] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: self-invisibility — the key word does not mean the mechanic here
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" ("stepping into the target's shadow and vanishing from where it stood, then striki [verb: step:concept, vanish:idea, shadow:idea]")
[reskin] keys spent by the action: step
[reskin] signature idea (trait): "Vexmoor's courtly robes are woven from his own discarded shadow. When he is missed by an attack, the robe drinks the afterimage, allowing him to instantly take a … that leaves no trace." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion, absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Blurred Form" — bound only on the idea's own words (afterimage:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Force Needle = none
[reskin] languages by mind: "Common plus two others" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Force Needle" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] row binds its clause: "Phase Slip" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
```

