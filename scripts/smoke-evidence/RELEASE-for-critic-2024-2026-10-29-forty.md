# Release table for the critic — 2026-10-29

One run: a forty, taken as the regression gate at the close of the augmentation
and trait-shape work. Forty concepts spanning every path the generator has —
print-exact, twist, class NPC, homebrew, and one blank with no input at all —
across CR 1 to 24 and both rules editions.

## What landed since the last package

1. **A closed set of augmentations.** Five trait templates may now carry one of
   four extra clauses — a squeeze allowance, a space-hold, sight in its own
   medium, and a terrain boon — each cited to a print row, each written by the
   template itself rather than by prose assembly. The model picks the kind by
   name from a menu the template advertises; anything off the menu is refused.
2. **Two new trait shapes.** `pack-tactics` (print's Hobgoblin Warrior) and
   `death-restoration` ("reforms after death", which covered 21 of print's 32
   death-triggered traits and was the only real gap in a sweep of print's 324
   traits).
3. **Mimicry takes a slot.** Its frame is now "The creature can mimic
   {mimicked}", so a concept's own words can reach it.
4. **A row now records what it wrote.** The clause a row answers, the condition
   it imposes, what it requires, and when it ends are all stamped on the row by
   the writer instead of being read back out of the text later.
5. **A 2014 conversion fix.** Converting a 2024 row that imposes a condition
   into a 2014 saving throw was dropping any text that followed the condition.

## The gate — four FAIL rows of forty, one of them ours to discount

| block | gate | our read |
|---|---|---|
| Adult Red Dragon | `two-novas` | real. "Threshold Execute" and "Fire Breath" on one sheet. |
| Black Iron Vigil | `name-mechanic` | real. "Warded Charge" names a movement its text does not have. |
| Reliquary-Glut | `escape-dc` ×2 | real but invisible: escape DC 15 written where 16 derives, on Adhesive and Hooked Lash. |
| Granite Exile | `lack-honored` | **false positive.** The GM asked for "understands no Common"; the sheet's Languages line reads `Giant`, with no Common. The predicate wants an absence to be positively expressed somewhere on the sheet, and a header cannot prove a negative by containing a row. Hand-derive the rest of that row, not this cell. |

Standing rate across forties is 1–3 FAIL, so three real failures is inside the
band and none of them is new.

## Our own read of the forty: 22 ship / 15 fix-lite / 3 fix

The previous forty read 20 / 17 / 3. Three blocks we would call standouts, all
because the GM's own words reached a mechanic:

- **Vampire**, asked "who keeps a garden of thorns" — *Sure Footing. Difficult
  Terrain composed of its garden of thorns doesn't cost the vampire extra
  movement.*
- **Vesp Lord**, asked "commands lesser swarms" — an invented reaction,
  *Sovereign of the Swarm*, keyed on creatures with the Swarm tag within 60 feet.
- **Bogwitch Molra**, asked "curses trespassers" — an invented action,
  *Trespasser's Bane*.

The three we would send back:

- **Adult Red Dragon** — the two novas above.
- **Black Iron Vigil** — the name above.
- **Ashen Trophykeeper** — the blank path, no input at all. It minted three
  melee rows named *Claw*, *Fang*, and *Claws*, and the third deals **Psychic
  damage off a claw**. Two complaints in one sheet: a near-duplicate name pair,
  and a flesh limb dealing energy, which the generator's own instructions forbid
  (melee deals the limb's physical type unless the body itself is energy) and
  which nothing currently checks.

## The one pattern we want judged

**The blind fill.** Four of the fifteen fix-lite blocks are a parameterised
trait whose slot had the GM's phrase available and filled it generically
anyway:

- **Air Elemental**, asked "that carries stolen voices" — the first Mimicry
  draw since the slot was added, and it wrote *"can mimic animal sounds and
  humanoid voices"*.
- **Bog Hound** ("a mud-caked bog hound that drags fishermen under") and
  **Well-Drowned** ("the thing in the well") both got *"indistinguishable from
  an ordinary object"*.
- **False Form** on the Well-Drowned is a hardcoded row with no slot at all,
  unlike its sibling False Appearance, whose slot fills from the concept 72% of
  the time.

Our question for the critic: is the right move to widen the slots (more rows
parameterised), or to tighten the fill (a slot that cannot be filled from the
concept refuses rather than defaults)? The second costs rows; the first costs
nothing but may raise the rate of slots filled with something merely adjacent.

## Two things we could not measure, offered as open, not as findings

1. **An unmotivated element.** The concept call answers one `energy` field, and
   the engine writes it on the melee rider *and* the resistance line, so one
   wrong word appears twice — a knife ball came back resisting Fire and dealing
   it. There is exactly one guard against this and it covers Humanoids only.
   We tried three times to put a rate on it and discarded all three: the first
   two used our own cognate word-lists to judge whether a concept warrants an
   element (which is the thing this project does not do), and the third
   collapsed when the commonest "flesh limb dealing energy" offenders turned
   out to be print's own rows — Devilish Claw, Fiery Mace, Withering Touch,
   Paralyzing Touch. We have no rate we trust. Judge the two sheets in this run
   that show it (Ashen Trophykeeper's Psychic claw; Pit Fiend's added Searing
   Aura on a concept about oaths) and tell us whether it reads as a defect.
2. **Rampage above CR 1.** We draw it to CR 12. Print prints it twice, both at
   CR 1 or below, and both as `Rampage (1/Day)` — so the cap is print's, not
   ours. Whether a 1/Day bonus action still earns its line at CR 5–12 is a
   calibration question print gives no answer to.

## What not to spend time on

- Row counts. We are above print's rows at every CR band and the owner has
  ruled that longer is wanted; sameness, not length, is the complaint.
- The escape-DC off-by-one. It is a lint, already queued.
- Whether a mechanic may exist. Print rules calibration — saves, sizes, damage,
  ranges — and never existence. If a concept needs a row print does not have,
  the generator is expected to invent one that fits.

---

# 2024 blocks

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


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 3 → 1.5625; sustained 16 (2 × Bite); nova none; dmg 16

```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

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
15
+2
+4
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

Skills Perception +5, Stealth +4

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks. It can replace one attack with a use of Sundering Shove.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Sundering Shove. Strength Saving Throw: DC 13, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the dire wolf and has the Prone condition.

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

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Actions/Sundering Shove — template push-prone; library draw (seed unstamped)

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack tactics feint-and-flank hunt [behavior] | frost-rimed hide [body] | cold bleeding from its coat [aura]
[concept] identity: The frost-rimed dire wolf opens by circling at the edge of the pack's reach, letting the cold of its hide bleed the warmth out of the air before any fang lands. Every round after, it darts in behind the nearest target to snap and withdraw, using its packmates as a moving wall to shear off any chase. It is a patient opportunist: it will break off and lope away once bloodied, only to wheel back when the pack has the prey surrounded and bleeding.
[concept] lore: Born of a wolf pack that denned too long in a rime-locked valley, these beasts carry winter in their hides and hunt to drive the warmth of living things out of their territory.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, spew, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] signature idea (action): "The dire wolf flicks a feint to one side, then snaps at a target within reach from an unexpected angle. The target must succeed on a Dexterity saving throw or fall Prone as the frost-slick earth betrays its footing, leaving it exposed to the pack's next rush." [action/save/condition] [family: mark] — menu: shield-bash, lure, sensory-strike, disarm, thrown-burst-seed, slow-bolt, pacify, escalating-dread, terror-pulse, push-prone, reveal (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, riposte, contagion, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), sensory-strike (save/condition)
[reskin] keys would have bound: action — slow-bolt (frost)
[reskin] word match declined by the call: shield-bash, lure, sensory-strike, pacify, escalating-dread, terror-pulse, reveal, disarm, thrown-burst-seed, slow-bolt, focus, feint-slip — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest; it lands rather than the row being dropped (what it wanted: A feint that imposes disadvantage on the target's next attack or grants advantag)
[reskin] pick kept on the GM's own words: action — "push-prone" has no key-table verb, but the call quotes "with a frost rimed hide" from the description
[reskin] signature template: push-prone -> Actions/"Rime-Feint Snap" ("The dire wolf flicks a feint to one side, then snaps at a target within reach from an unexpected angle. The target must succeed on a Dexterity saving throw or f [shape fit, no verb match]")
[reskin] signature idea (trait): "The frost-rimed hide bleeds a creeping chill into the air at the start of each of the dire wolf's turns. Each creature within reach of its frost-rimed body must succeed on a Constitution saving throw or have its Speed reduced until the start of the dire wolf's next turn as the cold stiffens joints and numbs limbs." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] word match declined by the call: fear-aura, truth-aura, energy-aura, phobia — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The frost-rimed hide bleeds a creeping chill into the air at the start of each of the dire wolf's turns. Each creature within reach of its frost-rimed body must succeed on a Constitution saving throw or have its Speed reduced until the start of the dire wolf's next turn as the cold stiffens joints and numbs limbs." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, faultless-tracker, kill-denial, spider-climb, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] one mechanic, one name: Actions/"Rime-Feint Snap" -> "Sundering Shove" — this row is push-prone and does what every push-prone row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Slip" is the seat's, not the Dire Wolf's
[reskin] multiattack replacement clause: It can replace one attack with a use of Sundering Shove.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] A feint that imposes disadvantage on the target's next attack or grants advantage to pack attacks, without moving it out — "The dire wolf flicks a feint to one side, then snaps at a target within reach from an unexpected angle. The target must succeed on a Dexterity saving throw or fall Prone as the frost-slick earth betrays its footing, leaving it exposed to the pack's next rush." — Dire Wolf [seat: action [action/save/condition]] (closest offered: push-prone) [effect: condition] [menu: shield-bash lure sensory-strike pacify escalating-dread terror-pulse push-prone reveal disarm thrown-burst-seed slow-bolt focus feint-slip] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:legality gaze-single:legality snare:legality reel:legality condition-payoff:legality execute:role seal:role hook-drag:role active-toll:role pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:legality herd:role drain:role curse-debt:role wind-up:role exploiter:legality blighted-ground:role] [landed: push-prone]
[reskin] [gap] a zone save that reduces the target's Speed instead of applying a full condition from the minor list — "The frost-rimed hide bleeds a creeping chill into the air at the start of each of the dire wolf's turns. Each creature within reach of its frost-rimed body must succeed on a Constitution saving throw or have its Speed reduced until the start of the dire wolf's next turn as the cold stiffens joints and numbs limbs." — Dire Wolf [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia faultless-tracker kill-denial spider-climb bloodied-fury blood-frenzy pack-tactics shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:legality warded-mending:legality gaze-aura:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path twist
```


---


### Trench Hymn Leviathan — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trench Hymn Leviathan | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- gates · soft · control-aoe-ungated: Actions/Luring Presence: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Jaws + legendary Deep Surge); nova Trench Hymn 78; dmg 180

```
Trench Hymn Leviathan

Gargantuan Monstrosity, Neutral

AC 21
Initiative +0 (10)

HP 542 (31d20 + 217)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
28
+9
+16
INT
10
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
14
+2
+9
MOD
SAVE
CON
24
+7
+14
CHA
14
+2
+2

Skills Athletics +16, Perception +9

Senses blindsight 120 ft., darkvision 240 ft., tremorsense 120 ft.; Passive Perception 19

Languages None

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The hymn leviathan can breathe air and water.

Legendary Resistance (3/Day). If the hymn leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The hymn leviathan makes two Jaws attacks. It can replace one attack with a use of Luring Presence.

Jaws. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.

Trench Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Luring Presence. Wisdom Saving Throw: DC 24, each creature of the hymn leviathan's choice in a 120-foot Emanation originating from the hymn leviathan that can see or hear it. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the hymn leviathan by the safest available route on its turn and can't take Reactions.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the hymn leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deep Surge. The hymn leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Jaws attack.

Tail Sweep. Strength Saving Throw: DC 24, each creature within 10 feet of the hymn leviathan. Failure: The target has the Prone condition.

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

- Traits/Amphibious — print's own row
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Jaws — the chassis
- Actions/Trench Hymn — the chassis
- Actions/Luring Presence — template lure; library draw (seed unstamped); the GM's clause "a leviathan of the trench whose song drowns fleets"; binds the GM's words: song
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Deep Surge — the chassis
- Legendary Actions/Tail Sweep — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Beast themes=aquatic/voice mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a song that drowns fleets [behavior] | trench-born leviathan body [body] | crushing pressure of the deep [aura]
[concept] identity: It announces itself with a subsonic trench-hymn that rolls through hulls and skulls alike, fighting the fleet before it ever breaches, then lunges to seize the largest vessel in its jaws and drag it down until the bones of the sea take it. Every round it sings again, layering crushing pressure over a lunging bite and a sweeping tail that founders anything still afloat, and under fire it never retreats — it descends into the cold dark to re-emerge where the fleet is thickest, patient and implacable as the trench itself.
[concept] lore: Born in the lightless pressure of the deepest trench, it has learned that the hulls crossing above ring sweetly when it sings, and it has spent ages learning exactly which notes make them fall.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] type honesty: Beast above CR 10 -> Monstrosity (print ceiling: CR 8)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hymn leviathan" — the call's own answer (kind), built from the name
[reskin] inline form: "the hymn leviathan" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 10 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area] [askMechanic: dazzle]
[reskin] body verdicts: 25 of 25 answered; not true of this body: drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan's song changes key, and every creature that can hear it within a wide sphere is drawn to the sound as though it were the sweetest thing in the world — each must make a Wisdom saving throw or have the Charmed condition, unable to willingly move away from the leviathan and unable to attack it, staggering toward the water's edge unless its allies hold it back. A Charmed target repeats t" [action/save/condition] [family: zone] — menu: shield-bash, escalating-dread, terror-pulse, herd, exploiter, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "charm"
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), shield-bash (save/condition)
[reskin] keys would have bound: action — lure (song)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: sensory-strike, reveal, shield-bash, escalating-dread, terror-pulse, pacify, herd, exploiter, execute, curse-debt — the key word does not mean the mechanic here
[reskin] value check: "Drowning Hymn (Recharge 5-6)" EV 41.8 vs floor 19.8 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Drowning Hymn (Recharge 5-6)" ("The song draws every creature that hears it toward the leviathan, charming them  [verb: song:concept]")
[reskin] keys spent by the action: song
[reskin] signature idea (trait): "The pressure of the deep travels with it: the air around the hymn leviathan is thick as the trench floor, and a creature that starts its turn near it has its Speed reduced and cannot take Reactions until the start of its next turn as the crushing weight bows its shoulders and slows its limbs. The leviathan ignores this pressure entirely." [trait/start_of_turn/movement] [family: zone] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: resonant-body, weapon-lodge)
[reskin] signature miss: trait — "The pressure of the deep travels with it: the air around the hymn leviathan is thick as the trench floor, and a creature that starts its turn near it has its Speed reduced and cannot take Reactions until the start of its next turn as the crushing weight bows its shoulders and slows its limbs. The leviathan ignores this pressure entirely." [trait/start_of_turn/movement] — no template on the shelf shares a verb with the concept or the idea (offered: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, resonant-body, weapon-lodge)
[reskin] one mechanic, one name: Actions/"Drowning Hymn (Recharge 5-6)" -> "Luring Presence (Recharge 5-6)" — this row is lure and does what every lure row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Jaws = none; Trench Hymn = none; Drag Down = none; Deep Surge = none; Tail Sweep = none
[reskin] chassis nova: "Trench Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Jaws" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] dead control row: "Luring Presence" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
[reskin] row binds its clause: "Luring Presence" answers "a leviathan of the trench whose song drowns fleets" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Legendary Action Uses: 3. The legendary action timing omits the standard 'must be at the end of another creature's turn, within the last round' qualifier sufficiently? Actually it's fine. — DISREGARD.
audit finding below confidence gate: Trench Hymn The entry name 'Trench Hymn' promises an ongoing sonic/hymnal mechanic but the text is a one-shot cone damage+deafen burst; the 'Hymn' framing in the monster's own name is carried by Luring Presence, not this action.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
```


---


### Chapel Bell-Toller — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chapel Bell-Toller | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova none; dmg 38

```
Chapel Bell-Toller

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+3
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Resonant Body. A creature that hits the chapel bell-toller with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The chapel bell-toller can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel bell-toller can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel bell-toller makes two Withering Touch attacks. It can replace one attack with a use of Debt of Ruin.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Debt of Ruin. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: The target is cursed until the end of the chapel bell-toller's next turn. The first time the cursed target deals damage to any creature before then, it takes 7 (2d6) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the chapel bell-toller and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the chapel bell-toller's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the chapel bell-toller can see within 5 feet. Failure: The target is possessed by the chapel bell-toller; the chapel bell-toller disappears, and the target has the Incapacitated condition and loses control of its body. The chapel bell-toller now controls the body, but the target retains awareness. The chapel bell-toller can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The chapel bell-toller's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the chapel bell-toller leaves as a Bonus Action. When the possession ends, the chapel bell-toller appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The chapel bell-toller casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The chapel bell-toller is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Withering Touch — print's own row, renamed
- Actions/Debt of Ruin — template curse-debt; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Resonant Body — template resonant-body; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "a chapel bell-ringer's ghost who tolls f…" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/uncanny mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling the bell for the doomed [behavior] | passage through walls [behavior] | a phantom bell cast in shadow [object]
[concept] identity: The bell-ringer's ghost opens a fight by drifting through the chapel wall and tolling its phantom bell, marking one living soul as 'the dying' so that all its strikes home on that target. Each round it hangs back behind stone and stalls, ringing again to drain warmth and breath until the marked victim fails, then it glides on to the next. It will not be cornered: if turned or bloodied it slips through a wall and waits, patient and unhurried, as if the death were already scheduled.
[concept] lore: A bell-ringer who rang for plague-dead until the plague took him, this ghost still keeps the death-roll and tolls only for those whose hour it has decided is come.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the chapel bell-toller" — the call answered "the toller" (kind), which the name does not support
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: start_of_turn/save_area] [askMechanic: drain]
[reskin] body verdicts: 37 of 37 answered; not true of this body: gaze-single, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The bell-toller marks one living creature it can see as the dying — a soul whose hour it has rung. Until the mark ends, the target has Disadvantage on Death Saving Throws, and when it drops to 0 Hit Points it dies outright as the toll claims it, the shadow of a bell closing over its body." [action/save/condition] [family: mark] — menu: execute, wail, lure, active-toll, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, shield-bash, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, blink, patient-defense, self-invisibility, focus, feint-slip, riposte, charge-push, pounce, isolation, life-drain)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_area when=start_of_turn
[reskin] word match declined by the call: lure, pacify, escalating-dread, wail — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "curse-debt" as nearest; it lands rather than the row being dropped (what it wanted: a mark on one creature that worsens Death Saving Throws and kills it outright wh)
[reskin] row kept the template's own name: action — "Debt of Ruin" is curse-debt's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template: curse-debt -> Actions/"Debt of Ruin" ("The idea is a mark that worsens Death Saving Throws and kills at 0 HP — a linger [verb: toll:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "The bell-toller's phantom bell hangs over it as a shadowy corona; while it is in Bright Light, that bell rings of its own accord — every living creature that starts its turn within the …'s reach has its warmth drawn away, taking Necrotic damage and having its Speed reduced until the start of its next turn, as though its hour were already scheduled." [trait/start_of_turn/damage] [family: zone] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: composed:zone:damage (start_of_turn/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_area when=start_of_turn
[reskin] word match declined by the call: truth-aura, fear-aura, blood-frenzy, pack-tactics — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:damage: the call picked it off the menu (what no printed template did: unstated)
[reskin] row kept the template's own name: trait — "Composed Row" is composed:zone:damage's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature miss: trait — "composed:zone:damage" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] trait bound to the concept's verb (concept-first): resonant-body — toll+bell in the user's words; the idea path had nothing
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Bell-Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Bell-Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the chapel bell-toller makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Debt of Ruin" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Debt of Ruin.
[reskin] row binds its clause: "Debt of Ruin" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Resonant Body" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "tolls for the dying" -> "Debt of Ruin" — trigger: asked start_of_turn, row reads at_will
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a mark on one creature that worsens Death Saving Throws and kills it outright when it drops to 0 Hit Points — "The bell-toller marks one living creature it can see as the dying — a soul whose hour it has rung. Until the mark ends, the target has Disadvantage on Death Saving Throws, and when it drops to 0 Hit Points it dies outright as the toll claims it, the shadow of a bell closing over its body." — Chapel Bell-Toller [seat: action [action/save/condition]] (closest offered: curse-debt) [effect: condition] [menu: lure pacify escalating-dread terror-pulse sensory-strike shield-bash push-prone reveal execute active-toll ground-burst obstacle-pull slow-bolt drain thrown-burst-seed curse-debt wind-up wail delayed-brand blink] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality trample:role leap:legality thrown-burst:role gaze-single:legality snare:role reel:role condition-payoff:legality seal:legality hook-drag:legality pull-through:legality random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality disarm:role herd:role exploiter:legality blighted-ground:legality] [landed: curse-debt]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path twist
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant [seed 1/2] | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Brass Fist + legendary Crushing Advance); nova Furnace Breath 72; dmg 170

```
Brass Tyrant

Huge Construct, Neutral Evil

AC 19
Initiative -1 (9)

HP 230 (20d12 + 100)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
INT
6
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
20
+5
+11
CHA
4
-3
-3

Skills Athletics +12, Perception +6

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Searing Aura. At the end of each of the tyrant's turns, each creature in a 5-foot Emanation originating from the tyrant takes 13 (3d8) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Brass Fist attacks.

Brass Fist. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Breath (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Molten Retort. One creature within 5 feet that hit the tyrant with an attack roll since the end of the tyrant's last turn takes 14 (4d6) Fire damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crushing Advance. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.

Siege Stride. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Tremor Slam. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

- Traits/Searing Aura — template energy-aura; library draw (seed unstamped); binds the GM's words: aura
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Brass Fist — the chassis
- Actions/Furnace Breath — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Crushing Advance — the chassis
- Legendary Actions/Siege Stride — the chassis
- Legendary Actions/Tremor Slam — the chassis
- Bonus Actions/Molten Retort — library seed own-turn-punisher

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: molten brass body and furnace heart [body] | rules a city of forges as its domain [behavior] | slag that pools and hardens around its feet [aura]
[concept] identity: The Brass Tyrant opens by wading straight through the forge-city's own walls and workshops, each stride shedding molten slag that pools and hardens around its enemies' feet; it then fights as a slow, grinding siege-engine, seizing the nearest foe and crushing them in brass fists while its furnace-heart scorches everything within reach. It never retreats: a tyrant unmade is a tyrant dethroned, so it fights to the death and toys with survivors by herding them toward the hottest forge-pits.
[concept] lore: Poured from the city's first furnace and crowned by the forge-lords it was meant to serve, the Brass Tyrant still runs the foundries as its private domain, consuming slaves and ore alike to keep its own molten core burning.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Brass Tyrant = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] body verdicts: 27 of 27 answered; not true of this body: herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The Brass Tyrant issues a molten command to the forges themselves. Each creature within reach of a forge, furnace, or fire must succeed on a Wisdom saving throw or be Frightened of the tyrant for 1 minute, believing the flames themselves have turned against it." [action/save/condition] [family: mark] — menu: condition-payoff, escalating-dread, terror-pulse, exploiter, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike)
[reskin] verb gate stands down: action — no template shares a verb, but 6 template(s) whose declared stamps match the idea (save/condition): escalating-dread, terror-pulse, lure, pacify, sensory-strike, reveal; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), lure (save/condition)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: escalating-dread, lure, pacify, sensory-strike, reveal, condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] row kept the template's own name: action — "Horrid Display" is terror-pulse's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] pick kept on the GM's own words: action — "terror-pulse" has no key-table verb, but the call quotes "a tyrant of burning brass who rules a city of forges" from the description
[reskin] value check: "Horrid Display (2/Day)" EV 19.3 vs floor 59.2 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: condition-payoff, escalating-dread, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] value check: "Answering Sting" EV 7.7 vs floor 5.7 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The tyrant's brass body is pitted with vents that exude a constant aura of searing heat. A creature that starts its turn within reach of the tyrant takes Fire damage as the air itself scorches it." [trait/start_of_turn/damage] [family: zone] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: pack-tactics (always/damage), energy-aura (start_of_turn/damage), composed:zone:damage (start_of_turn/damage)
[reskin] keys would have bound: trait — heated-body (burn, brass)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: pack-tactics, composed:zone:damage — the key word does not mean the mechanic here
[reskin] free signature row: "Searing Vents" — the trait seat cannot quote the GM, but the call names the element it expresses: "molten brass body and furnace heart". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): energy-aura -> Traits/"Searing Vents" ("the constant heat aura that scorches creatures starting their turn within reach, [verb: aura:idea]")
[reskin] one mechanic, one name: Traits/"Searing Vents" -> "Searing Aura" — this row is energy-aura and does what every energy-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Brass Fist = none; Furnace Breath = none; Furnace Grip = none; Crushing Advance = none; Siege Stride = none; Tremor Slam = none
[reskin] chassis nova: "Furnace Breath (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Searing Aura" [trait/start_of_turn/damage]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] element expressed: Searing Aura carries "molten brass body and furnace heart" — "takes 13 (3d8) Fire damage"
[reskin] audit rename: "Answering Sting" -> "Molten Retort"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Molten Retort) — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
```


---


### Ashen Trophykeeper — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Trophykeeper | 4 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- **dropped clause:** "A gaunt"
- **dropped clause:** "soot-grey thing of matted astral fur"
- **dropped clause:** "too many jointed"
- **dropped clause:** "with the raw"
- **dropped clause:** "flaying grief of the Astral Sea that soaks through its pelt"
- **dropped clause:** "It opens by dropping from a ceiling onto the largest target"
- **dropped clause:** "out their eyes"
- **dropped clause:** "every round after"
- **dropped clause:** "it drags its stunned prize toward its hoard"
- **dropped clause:** "striking at anyone who follows"
- **dropped clause:** "shrieking the concentrated terror of every soul it has ever collected"
- **dropped clause:** "Bloodied"
- **dropped clause:** "fighting to the death to protect the collection it clearly believes it owns"
- **dropped clause:** "it is a hoarder that drags its kills back to a lair of trophies"
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

```
Ashen Trophykeeper

Medium Monstrosity, Neutral Evil

AC 14
Initiative -1 (9)

HP 82 (11d8 + 33)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
18
+4
+6
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
16
+3
+3
CHA
4
-3
-3

Skills Athletics +6, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Spider Climb. The trophykeeper can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The trophykeeper makes two attacks, using Claw, Fang, or Claws in any combination.

Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Slashing damage.

Fang. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Claws. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Psychic damage.

Bonus Actions

Swallow. The trophykeeper swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the trophykeeper, and takes 6 (1d12) Psychic damage at the start of each of the trophykeeper's turns. The trophykeeper can have only one creature swallowed at a time. If the trophykeeper takes 12 damage or more in a single turn from the swallowed creature, the trophykeeper must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the trophykeeper. If the trophykeeper dies, a swallowed creature exits the body Prone by using 5 feet of movement.

Driving Bellow (Recharge 5-6). Wisdom Saving Throw: DC 13, each creature of the trophykeeper's choice in a 30-foot Emanation originating from the trophykeeper. Failure: The target immediately moves up to half its Speed in a direction of the trophykeeper's choice, using the safest available route.

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
- Actions/Claw — authored for this sheet; a named part; the GM's clause "claw-tipped limbs"
- Actions/Fang — authored for this sheet; a named part; the GM's clause "it kills not with fang"
- Actions/Claws — authored for this sheet; a named part; the GM's clause "pinning them while its claws press that psychic dread straight through their skull"
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Bonus Actions/Driving Bellow — template herd; library draw (seed unstamped); the GM's clause "herding survivors away from its lair with pulses of the same awful memory"; binds the GM's words: herd
- Traits/Spider Climb — template spider-climb; library draw (seed unstamped); the GM's clause "the Trophy Climber moves like a bankrupt noble picking through a ruin"; binds the GM's words: climb+climbs+climbing+ceiling+walls+wall+ceilings+sheer

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, gaze — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning them while its claws press" | brute-grappler: ✓ ("pinning them while its claws press that ") | brute-grappler: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Monstrosity themes=mind/grasping mind=sapient style=grappler lore=✓
[concept] synthesis text: A gaunt, soot-grey thing of matted astral fur and too many jointed, claw-tipped limbs, the Trophy Climber moves like a bankrupt noble picking through a ruin, and it kills not with fang but with the raw, flaying grief of the Astral Sea that soaks through its pelt. It opens by dropping from a ceiling onto the largest target, pinning them while its claws press that psychic dread straight through their skull and out their eyes; every round after, it drags its stunned prize toward its hoard, striking at anyone who follows and shrieking the concentrated terror of every soul it has ever collected. Bloodied, it does not flee — it climbs the walls and circles, herding survivors away from its lair with pulses of the same awful memory, fighting to the death to protect the collection it clearly believes it owns. It is fully sapient (INT 10-14), and it is a hoarder that drags its kills back to a lair of trophies.
[concept] signature elements: psychic-dread claws that pin the mind [body] | herds survivors away from the hoard with pulses of memory [behavior] | lair piled with stolen trophies and bones [object]
[concept] name proposal: Grasping Climber
[concept] lore: Born in the drifting debris of the Astral Sea, the Grasping Climber came through a shimmering fracture into the mortal world and now builds a nest of stolen relics and polished bones, hoarding them as if the trophies were the only proof it was ever real.
[reskin] donor: brute-5-grappler -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] repair round 1: 1 defect(s) — engulf_style "grapple" is not on the menu — swallow, engulf, smother, whelm, cage, entomb, or cocoon
[reskin] repair round 2: 1 defect(s) — engulf_style "grapple" is not on the menu — swallow, engulf, smother, whelm, cage, entomb, or cocoon
[reskin] engine interior scaled — CR 4 sits below the brute-5-grappler seat
[reskin] named parts: Claw (slot), Fang (clone), Claws (clone) — the user's words, the engine's numbers
[reskin] named parts landed: 3 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the trophykeeper" — the call's own answer (kind), built from the name; the rules would have said "Trophykeeper"
[reskin] inline on kit rows: "Trophykeeper" -> "the trophykeeper"
[reskin] inline form: "the trophykeeper" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "it kills not with fang" reads like a lack to the words, and the call's list did not name it
[reskin] lacks not claimed: "it does not flee — it climbs the walls and circles" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A gaunt" -> has (mechanical) [asked: attack] | "soot-grey thing of matted astral fur" -> has (mechanical) [asked: attack] | "too many jointed" -> has (mechanical) [asked: attack] | "claw-tipped limbs" -> has (mechanical) [asked: attack] | "the Trophy Climber moves like a bankrupt noble picking through a ruin" -> has (mechanical) [asked: on_hit/condition] | "it kills not with fang" -> has (mechanical) [asked: on_hit/condition] | "with the raw" -> has (mechanical) [asked: on_hit/condition] | "flaying grief of the Astral Sea that soaks through its pelt" -> has (mechanical) [asked: on_hit/condition] | "It opens by dropping from a ceiling onto the largest target" -> has (mechanical) [asked: movement] [askMechanic: charge] | "pinning them while its claws press that psychic dread straight through their skull" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple] | "out their eyes" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple] | "every round after" -> has (mechanical) [asked: start_of_turn/movement] [askMechanic: grapple] | "it drags its stunned prize toward its hoard" -> has (mechanical) [asked: start_of_turn/movement] [askMechanic: grapple] | "striking at anyone who follows" -> has (mechanical) [asked: attack] | "shrieking the concentrated terror of every soul it has ever collected" -> has (mechanical) [asked: save_area] [askMechanic: fear] | "Bloodied" -> has (mechanical) [asked: when_bloodied/movement] [askMechanic: climb] | "it does not flee — it climbs the walls and circles" -> has (mechanical) [asked: when_bloodied/movement] [askMechanic: climb] | "herding survivors away from its lair with pulses of the same awful memory" -> has (mechanical) [asked: save_area] [askMechanic: fear] | "fighting to the death to protect the collection it clearly believes it owns" -> has (mechanical) [asked: buff_self] [askMechanic: escalate] | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a hoarder that drags its kills back to a lair of trophies" -> has (mechanical) [asked: on_death/condition] [askMechanic: harvest]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] signature idea (action): "As it fights, the trophykeeper shrieks with the stored grief of every soul it has collected, and each creature of its choice within reach that can hear it must succeed on a Wisdom saving throw or be Frightened of it until the end of its next turn; a Frightened creature is also herded — it can't willingly move closer to the trophykeeper, and the keeper can pull it to a space adjacent to itself as p" [action/save/condition] — menu: condition-payoff, shield-bash, ground-burst, herd, thrown-burst-seed, wind-up, exploiter, execute, wail, lure, pull-through, pacify, slow-bolt, sensory-strike, disarm (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, rampage, patient-defense, lay-on-hands, feint-slip, riposte, affliction, contagion, charge-push, pounce)
[reskin] lead by this seat's own clause: action — "fear" from the clause this seat serves, not the sheet's "grapple"
[reskin] declared mechanic leads the menu: action — fear: wail
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: wail (once_per_fight/damage), shield-bash (save/condition), lure (save/condition)
[reskin] keys would have bound: action — wail, execute, rampage (shriek, shrieks, kill, death, bloodied, blood)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, gaze shape=attack
[reskin] word match declined by the call: lure, pacify, sensory-strike, wail — the key word does not mean the mechanic here
[reskin] value check: "Grief Shriek (2/Day)" EV 2.7 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Grief Shriek" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 2.7 vs floor 2.3 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Grief Shriek (Recharge 5-6)" ("each creature of its choice within reach that can hear it must succeed on a Wisd [verb: herd:concept]")
[reskin] keys spent by the action: herd
[reskin] signature idea (trait): "The trophykeeper's limbs find purchase anywhere: it climbs sheer walls and ceilings at its Speed without an ability check, and while it is on a ceiling or wall above a creature it has not yet struck, its drop is a dread-borne ambush — the first Claw or Fang attack it makes against that creature in the round has Advantage, and on a hit the target is pinned under its claws, Grappled (escape DC equal" [trait/always/condition] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), kill-denial (always/condition)
[reskin] keys would have bound: trait — spider-climb (climb, climbs, climbing, ceiling, walls, wall)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, gaze shape=attack
[reskin] word match declined by the call: phobia, berserk, kill-denial, terrain-walk, blood-frenzy, fear-aura — the key word does not mean the mechanic here
[reskin] seat owes nothing: the grappler line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): spider-climb -> Traits/"Trophy Climber" ("The trophy climber climbs sheer walls and ceilings at its Speed without an abili [verb: climb:concept, climbs:concept, climbing:concept, ceiling:concept, walls:concept, wall:concept, ceilings:idea, sheer:idea]")
[reskin] one mechanic, one name: Bonus Actions/"Grief Shriek (Recharge 5-6)" -> "Driving Bellow (Recharge 5-6)" — this row is herd and does what every herd row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Trophy Climber" -> "Spider Climb" — this row is spider-climb and does what every spider-climb row does; a bespoke name would promise more than the text delivers
[reskin] repair: 2 clause(s) with no row — "A gaunt", "soot-grey thing of matted astral fur"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:A gaunt","description:soot-grey thing of matted astral fur"]
[reskin] clause answered in prose: "A gaunt" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] clause answered in prose: "soot-grey thing of matted astral fur" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Claw = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Deep Speech" -> "None" (sapient)
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack normalised: "The trophykeeper makes two attacks, using Claw, Fang, or Claws in any combination."
[reskin] row binds its clause: "Driving Bellow" answers "herding survivors away from its lair with pulses of the same awful memory" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Spider Climb" answers "the Trophy Climber moves like a bankrupt noble picking through a ruin" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "the Trophy Climber moves like a bankrupt noble picking through a ruin" -> "Spider Climb" — trigger: asked on_hit, row reads at_will
[reskin] ask vs row MISMATCH: "it kills not with fang" -> "Fang" — trigger: asked on_hit, row reads at_will
[reskin] asked but unanswered: "with the raw" asked for on_hit and no row binds the clause
[reskin] asked but unanswered: "flaying grief of the Astral Sea that soaks through its pelt" asked for on_hit and no row binds the clause
[reskin] ask vs row MISMATCH: "pinning them while its claws press that psychic dread straight through their skull" -> "Claws" — trigger: asked on_hit, row reads at_will
[reskin] asked but unanswered: "out their eyes" asked for on_hit and no row binds the clause
[reskin] asked but unanswered: "every round after" asked for start_of_turn and no row binds the clause
[reskin] asked but unanswered: "it drags its stunned prize toward its hoard" asked for start_of_turn and no row binds the clause
[reskin] asked but unanswered: "Bloodied" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "it does not flee — it climbs the walls and circles" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "it is a hoarder that drags its kills back to a lair of trophies" asked for on_death and no row binds the clause
audit finding below confidence gate: Multiattack Multiattack references three attack options while the block provides a Claw and a Claws entry that differ only in name and damage type, so the sentence is ambiguous as to what distinguishes them.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path blank
[reskin] record reconciled: "Claw" no longer imposes Grappled, Restrained — the clause left, so the record goes with it
```


---


### Air Elemental — in the run

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Air Elemental | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 28 (2 × Thunderous Slam); nova Whirlwind 24; dmg 28

```
Air Elemental

Large Elemental, Neutral

AC 15
Initiative +5 (15)

HP 90 (12d10 + 24)

Speed 10 ft., Fly 90 ft. (hover)

MOD
SAVE
STR
14
+2
+5
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
6
-2
-2

Skills Athletics +5, Perception +3

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Mimicry. The elemental can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Dazzling Burst.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Dazzling Burst. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Blinded condition until the end of its next turn.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. Success: Half damage only.

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
- Actions/Thunderous Slam — print's own row, renamed
- Actions/Dazzling Burst — template sensory-strike; library draw (seed unstamped); binds the GM's words: deafen+scream
- Actions/Whirlwind — print's own row
- Traits/Mimicry — template mimicry; library draw (seed unstamped); the GM's clause "carries stolen voices"; binds the GM's words: stolen voice+stolen voices+voices
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental themes=voice/elemental mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: a chorus of stolen voices screaming in its winds [body] | snatching and hoarding the voices of those it fights [behavior] | a buffeting gale that staggers and deafens [aura]
[concept] identity: An Air Elemental of stolen voices opens by loosing a spiraling gale that carries a chorus of trapped screams, confusing and staggering foes before it closes to crush them with fists of compressed wind. Every round it snatches another fragment of an opponent's voice — a grunt, a curse, a battle-cry — to thicken its own cacophony and add weight to its blows. It fights to the death in defense of its hoard of voices, never fleeing, because to flee is to lose the sound of itself.
[concept] lore: Born in the howling throat of a storm that swallowed a village's last words, this elemental drifts the ruined places of the world, hoarding speech and screaming back the voices of everyone it has ever crushed.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 89 -> 90, AC 14 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: brute-5 -> CR 5
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the elemental" — the call answered "the elemental" (kind), which the name does not support
[reskin] inline form: "the elemental" — the model's own reading of the name
[reskin] the sheet's declared ask: dazzle — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "carries stolen voices" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (mechanical) [asked: at_will/save_single] [askMechanic: dazzle]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The elemental looses a spiraling gale thick with a chorus of trapped screams. Each creature in a cone must succeed on a Constitution saving throw; on a failure it takes Thunder damage and is Deafened and has disadvantage on attack rolls until the end of its next turn as the stolen voices drown out its own senses." [action/save/condition] [family: nova] — menu: trample, leap, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), shield-bash (save/condition)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: sensory-strike, reveal, terror-pulse, pacify, trample, ground-burst — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "sensory-strike" as nearest; it lands rather than the row being dropped (what it wanted: a cone-area Constitution save that both deals damage and imposes Deafened plus a)
[reskin] signature template: sensory-strike -> Actions/"Chorus of Screams" ("The idea is a cone-area Constitution save that deals Thunder damage and Deafens  [verb: deafen:idea, scream:idea]")
[reskin] signature idea (trait): "Whenever a creature within the elemental's reach speaks, shouts, or casts a spell with a verbal component, the elemental snatches a fragment of that voice — it regains Hit Points and the next Slam it makes before the end of its next turn deals extra Thunder damage. Its hoard thickens with every cry it takes." [trait/always/resource] [family: heal] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura (+ shelf: resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: spider-climb (always/movement), phobia (always/condition), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: mimicry, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "mimicry" as nearest; it lands rather than the row being dropped (what it wanted: regains Hit Points and charges its next Slam with stolen sound)
[reskin] signature template (trait): mimicry -> Traits/"Stolen Voices" ("regaining Hit Points and adding Thunder damage on a later Slam is a resource/dam [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] one mechanic, one name: Actions/"Chorus of Screams" -> "Dazzling Burst" — this row is sensory-strike and does what every sensory-strike row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Stolen Voices" -> "Mimicry" — this row is mimicry and does what every mimicry row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Dazzling Burst.
[reskin] row binds its clause: "Mimicry" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "carries stolen voices" -> "Mimicry" — trigger at_will
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a cone-area Constitution save that both deals damage and imposes Deafened plus attack-roll disadvantage until the target — "The elemental looses a spiraling gale thick with a chorus of trapped screams. Each creature in a cone must succeed on a Constitution saving throw; on a failure it takes Thunder damage and is Deafened and has disadvantage on attack rolls until the end of its next turn as the stolen voices drown out its own senses." — Air Elemental [seat: action [action/save/condition]] (closest offered: sensory-strike) [effect: condition] [menu: sensory-strike reveal shield-bash escalating-dread terror-pulse push-prone lure pacify trample leap ground-burst thrown-burst-seed wind-up execute curse-debt] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality thrown-burst:legality gaze-single:role snare:role reel:role condition-payoff:legality seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:role slow-bolt:role disarm:role herd:legality drain:legality exploiter:legality blighted-ground:role] [landed: sensory-strike]
[reskin] [gap] regains Hit Points and charges its next Slam with stolen sound — "Whenever a creature within the elemental's reach speaks, shouts, or casts a spell with a verbal component, the elemental snatches a fragment of that voice — it regains Hit Points and the next Slam it makes before the end of its next turn deals extra Thunder damage. Its hoard thickens with every cry it takes." — Air Elemental [seat: trait [trait/always/resource]] (closest offered: mimicry) [effect: resource] [menu: spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [landed: mimicry]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path twist
```


---


### Ramshackle Siege Golem — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ramshackle Siege Golem | 8 | brute-5-juggernaut | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Sundering Shove: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 7 / off 8 → 7.5; sustained 50 (2 × Iron-Shod Beam); nova none; dmg 50

```
Ramshackle Siege Golem

Large Construct, Neutral

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

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
16
+3
+6
CHA
4
-3
-3

Skills Athletics +8, Perception +3

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Resonant Body. A creature that hits the siege golem with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Thunder Absorption. Whenever the siege golem is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The siege golem can't shape-shift.

Magic Resistance. The siege golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The siege golem makes two Iron-Shod Beam attacks. It can replace one attack with a use of Sundering Shove.

Iron-Shod Beam. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Thunder damage.

Sundering Shove. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target is pushed up to 15 feet away from the siege golem and has the Prone condition.

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

- Traits/Resonant Body — template resonant-body; library draw (seed unstamped); binds the GM's words: iron
- Traits/Thunder Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Iron-Shod Beam — the chassis
- Actions/Sundering Shove — template push-prone; library draw (seed unstamped); binds the GM's words: knock

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "siege-engine golem of lashed timber…" is the description, not a name
[concept] hints: golem→canon ✓ ("a siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/grasping mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | body of lashed and bound timber [body] | iron-shod ramming head [object]
[concept] identity: A ramshackle battering-ram given legs, it trundles forward in a straight line and simply does not stop for walls, doors, or defenders — it lowers its lashed-timber shoulder and drives through, splintering masonry and scattering anyone caught in the breach. Every round after the first it pivots to the next obstruction, ignoring strikes that would fell a softer golem, because a body of bound beams and iron dogs flexes and gives rather than shattering. It never flees and never toys; it is a patient engine that has one motion, and that motion is forward until the structure — or the line — comes down.
[concept] lore: Built by a besieging army that ran out of siege towers, the last ram-golem was lashed together from felled trees, wagon axles, and the iron bands of broken doors, and it still walks the ruined road, trying to finish a siege that ended with no one left to surrender.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the siege golem" — the call's own answer (kind), built from the name
[reskin] inline form: "the siege golem" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: shove — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: save_single] [askMechanic: shove]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, phase-slip, heated-body, false-appearance, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "When the siege golem moves and ends that move adjacent to a structure, obstacle, or a creature no smaller than itself, it lowers its timber shoulder and drives through: each creature in a line toward that target must succeed on a Dexterity saving throw or be knocked Prone and shoved to the far side of the golem's path, while doors, palisades, and flimsy walls in the line are smashed to splinters a" [action/save/condition] [family: breach] — menu: leap, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pacify, sensory-strike (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — shove: shield-bash, push-prone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), push-prone (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — own-turn-punisher (lash)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: shield-bash, escalating-dread, terror-pulse, lure, pacify, sensory-strike — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest; it lands rather than the row being dropped (what it wanted: each creature in a line is caught, knocked Prone, shoved to the far side of the )
[reskin] value check: "Siege Shoulder" EV 29.7 vs floor 14 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: push-prone -> Actions/"Siege Shoulder" ("The idea is a shoulder-charge that knocks creatures Prone and shoves them aside  [verb: knock:idea]")
[reskin] signature idea (trait): "The lashed beams that make up the siege golem's body flex and give under a blow rather than shattering, so when it is struck by a bludgeoning or slashing attack, the golem loses only half the damage and the attacker's weapon rings off the iron bands in a deafening Thunder clang; lashed timber springs through the strike, and the golem is unimpeded." [trait/on_being_hit/defense] [family: body-reaction] — menu: absorption, resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does defense; leading: absorption (on_being_hit/defense), resonant-body (on_being_hit/damage), weapon-lodge (on_being_hit/resource)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: halves bludgeoning and slashing damage taken while dealing Thunder damage to the)
[reskin] free signature row: "Lashed Timber Give" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): resonant-body -> Traits/"Lashed Timber Give" ("The idea is a defense: bludgeoning and slashing damage is halved and the attacke [verb: iron:idea]")
[reskin] one mechanic, one name: Traits/"Lashed Timber Give" -> "Resonant Body" — this row is resonant-body and does what every resonant-body row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Siege Shoulder" -> "Sundering Shove" — this row is push-prone and does what every push-prone row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Iron-Shod Beam = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] absorption re-keyed: Lightning -> Thunder (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Construct -> Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Sundering Shove.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Resonant Body" [trait/on_being_hit/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Resonant Body")
audit finding below confidence gate: Sundering Shove The cone has no origin or direction specified relative to the golem, so the GM cannot determine which creatures fall within it.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] each creature in a line is caught, knocked Prone, shoved to the far side of the path, and structures in the line are sma — "When the siege golem moves and ends that move adjacent to a structure, obstacle, or a creature no smaller than itself, it lowers its timber shoulder and drives through: each creature in a line toward that target must succeed on a Dexterity saving throw or be knocked Prone and shoved to the far side of the golem's path, while doors, palisades, and flimsy walls in the line are smashed to splinters a" — Ramshackle Siege Golem [seat: action [action/save/condition]] (closest offered: push-prone) [effect: movement] [menu: shield-bash push-prone escalating-dread terror-pulse lure pacify sensory-strike leap ground-burst thrown-burst-seed wind-up trample thrown-burst execute throw-retrieve] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt reveal] [same-seat rejected: swallow:legality gaze-single:role snare:role reel:role condition-payoff:legality seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:role slow-bolt:role disarm:role herd:legality drain:legality curse-debt:role reveal:role exploiter:legality blighted-ground:role] [landed: push-prone]
[reskin] [gap] halves bludgeoning and slashing damage taken while dealing Thunder damage to the melee attacker — "The lashed beams that make up the siege golem's body flex and give under a blow rather than shattering, so when it is struck by a bludgeoning or slashing attack, the golem loses only half the damage and the attacker's weapon rings off the iron bands in a deafening Thunder clang; lashed timber springs through the strike, and the golem is unimpeded." — Ramshackle Siege Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: defense] [menu: absorption resonant-body weapon-lodge] [same-cell unoffered: interpose] [same-seat rejected: heated-body:legality bloodied-burst:legality] [landed: resonant-body]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path homebrew
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova Trample 35; dmg 55

```
Stone Golem

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 220 (21d10 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+10
INT
3
-4
-4
MOD
SAVE
DEX
9
-1
-1
WIS
11
+0
+0
MOD
SAVE
CON
20
+5
+9
CHA
1
-5
-5

Skills Athletics +10, Perception +4

Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands Common plus two other languages but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Weapon Lodge. When a creature hits the golem with a nonmagical weapon, the weapon lodges in the golem's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 17 Strength (Athletics) check as an action; while lodged, the golem can use it: its Slam attacks deal an extra 17 (5d6) Force damage per lodged weapon (maximum two).

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Trample (Recharge 5-6). The golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 35 (10d6) Force damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

Bonus Actions

Slow (Recharge 5-6). The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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
- Actions/Slam — print's own row, renamed
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Actions/Trample — template trample; library draw (seed unstamped)
- Traits/Weapon Lodge — template weapon-lodge; library draw (seed unstamped)
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=mindless style=juggernaut energy=Force mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: a weeping stone saint carved into a living golem [body] | grief that never stops and never kneels [aura] | walking through walls and doorways as if they were air [behavior]
[concept] identity: A statue of a saint mid-weep, the Stone Golem opens by walking straight through cover and presses inexorably toward the nearest living thing, grinding stone fists down in heavy two-handed blows while tears of dust and grit trail from its unchanging face. Each round it advances without hesitation, shoving through walls and furniture instead of around them, and any who strike it feel the strike rebound off bodies that were carved, not grown. It neither flees nor gloats; it fights to the last chip of its stone, grief carved so deeply it has become weight.
[concept] lore: A cathedral mason carved a saint to mourn a drowned congregation, and something answered the tears by pouring itself into the finished stone so that the grief could keep moving — it walks because sorrow would not stay kneeling.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the golem" — the call answered "the golem" (kind), which the name does not support
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: harden — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem shoves its way forward. It moves its speed in a straight line, passing through stone, earth, and mortar as if they were air. Each wall or barrier it passes through collapses into rubble behind it, and any creature or structure in its path must make a Dexterity saving throw, taking Force damage and being shoved aside on a failed save." [action/always/movement] [family: breach] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, feint-slip, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: throw-retrieve (always/damage), trample (save/damage), leap (save/damage)
[reskin] word match declined by the call: push-prone, ground-burst, thrown-burst — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "trample" as nearest; it lands rather than the row being dropped (what it wanted: a straight-line burrow that collapses walls into rubble behind it and shoves cre)
[reskin] free signature row: action — "trample" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] decoration renamed: "Weeping Saint" borrowed the GM's own words "weeping, saint" for a row that expresses nothing — it takes "Trample", the template's own name
[reskin] seat takes its clause: "Trample (Recharge 5-6)" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: trample -> Actions/"Trample (Recharge 5-6)" ("The golem shoves its way forward. It moves its speed in a straight line, passing through stone, earth, and mortar as if they were air. Each wall or barrier it p [shape fit, no verb match]")
[reskin] signature idea (trait): "The golem's carved body is proof against mundane assault. When it is hit by a nonmagical weapon, it reduces the damage by an amount equal to its Constitution modifier." [trait/on_being_hit/defense] [family: body-reaction] — menu: weapon-lodge (+ shelf: false-appearance, spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does defense; leading: weapon-lodge (on_being_hit/resource)
[reskin] keys would have bound: trait — false-appearance (stone)
[reskin] word match declined by the call: weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "weapon-lodge" as nearest; it lands rather than the row being dropped (what it wanted: reduces incoming nonmagical weapon damage by a flat amount when hit)
[reskin] pick kept on the GM's own words: trait — "weapon-lodge" has no key-table verb, but the call quotes "carved as a weeping saint" from the description
[reskin] signature template (trait): weapon-lodge -> Traits/"Carved Saint's Solidity" ("The idea is damage reduction against nonmagical weapons — the golem's carved bod [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Carved Saint's Solidity" -> "Weapon Lodge" — this row is weapon-lodge and does what every weapon-lodge row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Stone Fist = none; Grit Spray = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Grit Spray" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Trample" [action/save/damage]
[reskin] save re-derived after a retype: Actions/Trample — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Trample")
audit finding below confidence gate: Weapon Lodge The clause requires the GM to track per-weapon lodged state and stacking damage mid-combat, with no cap on how many weapons can lodge at once and an ambiguous free extraction for the attacker.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a straight-line burrow that collapses walls into rubble behind it and shoves creatures aside — "The golem shoves its way forward. It moves its speed in a straight line, passing through stone, earth, and mortar as if they were air. Each wall or barrier it passes through collapses into rubble behind it, and any creature or structure in its path must make a Dexterity saving throw, taking Force damage and being shoved aside on a failed save." — Stone Golem [seat: action [action/always/movement]] (closest offered: trample) [effect: movement] [menu: throw-retrieve trample leap thrown-burst shield-bash ground-burst escalating-dread terror-pulse push-prone thrown-burst-seed wind-up charge] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: zone-seed:role] [landed: trample]
[reskin] [gap] reduces incoming nonmagical weapon damage by a flat amount when hit — "The golem's carved body is proof against mundane assault. When it is hit by a nonmagical weapon, it reduces the damage by an amount equal to its Constitution modifier." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: weapon-lodge) [effect: defense] [menu: weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality resonant-body:legality] [landed: weapon-lodge]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path twist
```


---


### Vesp Lord — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vesp Lord | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 15 → 12; sustained 87 (3 × Scepter); nova none; dmg 87

```
Vesp Lord

Large Celestial, Neutral Evil

AC 18
Initiative +2 (12)

HP 190 (20d10 + 80)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
13
+1
+1
MOD
SAVE
CON
18
+4
+9
CHA
18
+4
+9

Skills Athletics +10, Persuasion +9

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Halo of Pestilence. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the vesp lord. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Aura of Authority. While in a 10-foot Emanation originating from the vesp lord, the vesp lord and its allies have Advantage on attack rolls and saving throws, provided the vesp lord doesn't have the Incapacitated condition.

Actions

Multiattack. The vesp lord makes three attacks, using Scepter or Claw in any combination. It can replace one attack with a use of Leaden Touch.

Scepter. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Poison damage.

Claw. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Slashing damage.

Leaden Touch. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target's Speed is halved and it can't take Reactions until the end of the vesp lord's next turn.

Reactions

Sovereign of the Swarm. While a creature with the Swarm tag is within 60 feet of the vesp lord and can hear it, the vesp lord issues a command to one such swarm; the swarm uses its Reaction to move up to its Speed or make one attack against a target the vesp lord names.

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

- Traits/Halo of Pestilence — template composed:zone:condition:poisoned; library draw (seed unstamped)
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Scepter — weapon mace
- Actions/Claw — the chassis
- Actions/Leaden Touch — template slow-bolt; library draw (seed unstamped)
- Reactions/Sovereign of the Swarm — authored for this sheet; the GM's clause "commands lesser swarms"

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Celestial mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] hints: winged→style ✓ ("archon of flies that commands") | swarm→body ✗ ("commands lesser swarms")
[concept] resolve: archetype=defender type=Celestial themes=celestial/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commands a swarm of lesser flies [behavior] | a halo of pestilence that sickens those nearby [aura] | a fallen archon's hollowed body of buzzing void [body]
[concept] identity: The Plaguefather opens a fight by loosing its fly-swarm vassals in a crawling tide while it hangs back on droning wings, then wades in with a stinging scepter-strike to finish what the swarm began. Each round it reasserts command — driving its swarm over one target, and healing its own wounds from the flies that return fat and blood-hot — and it anchors the field with a halo of pestilence that sickens anyone who tries to stand beside it. It does not flee; when bloodied it turns its own failing body into a burst of flies, scattering to re-form rather than admit defeat.
[concept] lore: A lesser seraph cast down into the corpse-pits of a ruined heaven, it now reigns as archon over the flies that fed on its celestial flesh — it wants worshippers and hosts in equal measure, all of them breathing.
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the vesp lord" — the call's own answer (kind), built from the name
[reskin] inline form: "the vesp lord" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "commands lesser swarms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "commands lesser swarms" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: at_will/at_will/save_area] [askMechanic: command]
[reskin] body verdicts: 29 of 29 answered; not true of this body: seal, active-toll, random-ray, shell-withdraw, heated-body, false-appearance, absorption, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura
[reskin] signature idea (action): "The vesp lord commands one of its fly swarms to crawl over a creature it can see within 60 feet. The target must succeed on a Constitution saving throw or take Poison damage and have the Poisoned condition until the start of the vesp lord's next turn. A creature Poisoned this way also has its Speed halved." [action/save/condition] [family: mark] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, trample, thrown-burst, execute, lure, pacify, escalating-dread (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider, life-drain, contagion)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: herd (save/movement), shield-bash (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — contagion (plague, plagued)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: escalating-dread, pacify, lure, reveal, terror-pulse, push-prone, shield-bash — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "slow-bolt" as nearest; it lands rather than the row being dropped (what it wanted: a ranged Constitution save that deals Poison damage and inflicts Poisoned with S)
[reskin] pick kept on the GM's own words: action — "slow-bolt" has no key-table verb, but the call quotes "a plague bearing archon of flies that commands lesser swarms" from the description
[reskin] value check: "Swarm of Flies" EV 33 vs floor 15.6 (one attack of 3) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: slow-bolt -> Actions/"Swarm of Flies" ("The idea is a ranged save-or-be-Poisoned strike with a Speed-halving rider, at w [shape fit, no verb match]")
[reskin] signature idea (trait): "A halo of pestilence drifts around the vesp lord. At the start of each of its turns, each creature of its choice within 10 feet of it must succeed on a Constitution saving throw or have the Poisoned condition until the start of the vesp lord's next turn." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: bloodied-burst, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: pack-tactics (always/damage), noxious-aura (start_of_turn/condition), truth-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: fear-aura, truth-aura, pack-tactics, phobia — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:condition:poisoned" has no key-table verb, but the call quotes "a plague bearing archon of flies that commands lesser swarms" from the description
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Halo of Pestilence" ("A halo of pestilence drifts around the vesp lord; each creature of its choice wi [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Swarm of Flies" -> "Leaden Touch" — this row is slow-bolt and does what every slow-bolt row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "commands lesser swarms"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Sovereign of the Swarm" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scepter = mace; Claw = none; Plague Halo = none
[reskin] weapon declared: "Scepter" is a mace — the call's own answer
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] section moved: Traits/"Sovereign of the Swarm" spends its Reaction, so it sits under Reactions — print puts every such row there
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Leaden Touch.
[reskin] ask vs row ok: "commands lesser swarms" -> "Sovereign of the Swarm" — trigger at_will, limit at_will
audit finding below confidence gate: Halo of Pestilence The Poisoned target has no written way to end the condition early, but the fixed 'until start of its next turn' clause does supply a duration, so this is fine — retained for audit trail.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a ranged Constitution save that deals Poison damage and inflicts Poisoned with Speed halved until the start of the sourc — "The vesp lord commands one of its fly swarms to crawl over a creature it can see within 60 feet. The target must succeed on a Constitution saving throw or take Poison damage and have the Poisoned condition until the start of the vesp lord's next turn. A creature Poisoned this way also has its Speed halved." — Vesp Lord [seat: action [action/save/condition]] (closest offered: slow-bolt) [effect: condition] [menu: herd shield-bash terror-pulse push-prone reveal lure pacify escalating-dread ground-burst obstacle-pull slow-bolt disarm curse-debt wind-up trample thrown-burst execute throw-retrieve] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt sensory-strike] [same-seat rejected: swallow:legality leap:role gaze-single:role snare:role reel:role condition-payoff:role seal:legality hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:role burrow-ambush:legality snare-bolt:role sensory-strike:role thrown-burst-seed:role drain:role exploiter:legality blighted-ground:role] [landed: slow-bolt]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path homebrew
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 12 → 12; sustained 51 (1 × Tail Stinger); nova Bloodied Burst 42; dmg 62

```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+14
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
-1
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Bloodied Burst. The first time the worm is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 21, each creature in a 30-foot Emanation originating from the worm. Failure: 42 (12d6) Slashing damage, and the target has the Prone condition. Success: Half damage only.

Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the worm hit with a melee attack this turn. Failure: 42 (12d6) Piercing damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 22 (5d8) Acid damage at the start of each of the worm's turns. If the worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the worm and has the Prone condition. If the worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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
- Actions/Bite — print's own row
- Actions/Tail Stinger — print's own row
- Actions/Swallow — template swallow; library draw (seed unstamped); the GM's clause "swallowed a war-band's armoury"; binds the GM's words: swallow+swallows+swallowed+whole
- Traits/Bloodied Burst — template bloodied-burst; library draw (seed unstamped); binds the GM's words: bloodied+wounded
- Traits/Tunneler — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "swallowed a war-band's armoury" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole [behavior] | a gut packed with undigested armoury [body] | blades and mail shrapnel surfacing from its hide [object]
[concept] identity: A Purple Worm grown vast and wrong on a war-band's swallowed armoury, its hide studded from within by the blades and mail it cannot digest — it surfaces beneath a formation to engulf, then fights every round after as a grinding, spiked gullet, dragging prey down and letting the swallowed steel do the chewing. It never retreats; pain only makes it thrash and swallow harder, flinging half-digested weapons from its maw in sprays of iron and bile.
[concept] lore: A purple worm that took a mercenary company whole along with their wagons of blades and mail, it now wears the arms inside its flesh and hungers for the clatter of armoured prey, hoarding iron in its belly like a dragon hoards gold.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the worm" — the call answered "the worm" (kind), which the name does not support
[reskin] inline form: "the worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (mechanical) [asked: attack] [askMechanic: retaliate]
[reskin] body verdicts: 28 of 28 answered; not true of this body: herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the worm hits a Large or smaller creature with its Bite, it can attempt to engulf the target instead of dealing damage — the prey is swallowed whole into the spiked gullet, taking acid and grinding iron damage at the start of each of the worm's turns while it remains swallowed, and the worm can only hold one such creature at a time. A creature that deals enough damage to the worm from inside," [rider/on_hit/condition] [family: drag] — menu: contagion, stunning-strike, charge-push, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — swallow: swallow
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: swallow (save/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] keys would have bound: action — swallow (swallow, swallows, swallowed)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: contagion, stunning-strike, pounce, charge-push, charge, condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] signature template: swallow -> Actions/"Swallow Whole" ("the worm engulfs a creature it hits, swallowing it whole into the spiked gullet [verb: swallow:concept, swallows:concept, swallowed:concept, whole:idea]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "The worm's gut is packed with blades, mail, and spearheads it cannot digest; when it is Bloodied, its thrashing forces the … steel outward, and the worm's Bite and Iron Spray both gain a rending edge as the packed iron grinds through its own flesh into every wound it opens." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial, assassinate (+ shelf: bloodied-burst, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "retaliate" from the clause this seat serves, not the sheet's "swallow"
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), death-burst (always/damage)
[reskin] keys would have bound: trait — tunneler (worm)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: blood-frenzy, pack-tactics, death-burst, assassinate, spider-climb, phobia, terrain-walk, bloodied-fury, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, undead-fortitude, kill-denial, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] free signature row: "Iron Burst" — the trait seat cannot quote the GM, but the call names the element it expresses: "blades and mail shrapnel surfacing from its hide". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Iron Burst" is HANDED "swallowed a war-band's armoury" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-burst -> Traits/"Iron Burst" ("when Bloodied, the worm's packed iron forces outward in a rending burst around i [verb: bloodied:idea, wounded:idea]")
[reskin] one mechanic, one name: Actions/"Swallow Whole" -> "Swallow" — this row is swallow and does what every swallow row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Iron Burst" -> "Bloodied Burst" — this row is bloodied-burst and does what every bloodied-burst row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none; Iron Spray = none; Grinding Gullet = none
[reskin] chassis nova: "Iron Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Iron Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] multiattack replacement clause: It can replace one attack with a use of Swallow.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Bloodied Burst" [trait/on_being_hit/damage]
[reskin] row binds its clause: "Swallow" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] element claim revoked: "Bloodied Burst" claims "blades and mail shrapnel surfacing from its hide" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Bloodied Burst")
audit rewrite meta-language, dropped: Multiattack The worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "collects the oaths of dying knights"
- read: def 21 / off 10 → 15.5; sustained 43 (1 × Fiery Mace); nova none; dmg 43

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
26
+8
+14
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+2
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+13
CHA
24
+7
+7

Skills Perception +10, Persuasion +19

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Searing Aura. At the end of each of the pit fiend's turns, each creature in a 5-foot Emanation originating from the pit fiend takes 13 (3d8) Fire damage.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

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

- Traits/Searing Aura — template energy-aura; library draw (seed unstamped); binds the GM's words: aura
- Traits/Legendary Resistance — the chassis
- Traits/Diabolical Restoration — print's own row
- Traits/Fear Aura — print's own row
- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row, renamed
- Actions/Fiery Mace — print's own row; weapon mace
- Actions/Devilish Claw — print's own row
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | defender-leader: ✓ ("collects the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend themes=fiendish/armed mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of dying knights [behavior] | aura of command over sworn allies [aura] | iron hide forged from broken vows [body]
[concept] identity: The Pit Fiend opens by announcing itself as a collector of final vows; its aura of authority turns every dying knight's oath into a binding claim on their souls, and allies standing within that authority find their own blows steadied and their discipline sharpened. Each round it closes to claim the sworn, fighting beside its retinue like a warlord who parries for the troops and never lets a broken promise go unpunished. It toys with the bloodied, savoring the moment their resolve breaks, and fights to the death because every death is a debt collected.
[concept] lore: Born in the ash-pits where broken oaths congeal into iron, it descends onto battlefields to harvest the final vows of dying knights, each sworn promise binding another soul to its ledger.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (mechanical) [asked: buff_self] [askMechanic: harvest]
[reskin] body verdicts: 29 of 29 answered; not true of this body: seal, active-toll, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend speaks a word of command that seizes the final oath of a dying creature it can see. The creature must make a Charisma saving throw; on a failure, its oath binds it to the pit fiend's ledger, and until the end of the pit fiend's next turn, the creature has the Charmed condition and must use its reaction to make one weapon attack against a creature of the pit fiend's choice." [action/save/condition] [family: mark] — menu: shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, lure, pacify, escalating-dread, sensory-strike (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push)
[reskin] lead by this seat's own clause: action — "harvest" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), terror-pulse (save/condition), reveal (save/condition)
[reskin] keys would have bound: action — curse-debt, aggro-curse (oath)
[reskin] classification handed to the fit call: shape=buff_self
[reskin] word match declined by the call: curse-debt, terror-pulse, pacify, herd, escalating-dread, slow-bolt — the key word does not mean the mechanic here
[reskin] free signature row: action — "lure" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "collecting the oaths of dying knights" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Final Oath Claimed" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: lure -> Actions/"Final Oath Claimed" ("The creature's word seizes a dying creature's oath with a Charisma save, leaves  [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The pit fiend's presence steadies the discipline of sworn allies. Each ally within its aura of authority has advantage on saving throws against being charmed or frightened, and when such an ally hits with an attack, it deals extra fire damage." [trait/always/damage] [family: kill-growth] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, assassinate (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=buff_self
[reskin] closest accepted: trait — the call refused every template but named "energy-aura" as nearest; it lands rather than the row being dropped (what it wanted: grants sworn allies a saving throw bonus and extra fire damage on their hits)
[reskin] row kept the template's own name: trait — "Searing Aura" is energy-aura's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: "Searing Aura" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Searing Aura" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): energy-aura -> Traits/"Searing Aura" ("The pit fiend's presence steadies the discipline of sworn allies. Each ally within its aura of authority has advantage on saving throws against being charmed or [verb: aura:idea]")
[reskin] one mechanic, one name: Actions/"Final Oath Claimed" -> "Luring Presence" — this row is lure and does what every lure row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Oathbrand = longsword
[reskin] weapon declared: "Oathbrand" is a longsword — the call's own answer
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Oathbrand" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
[reskin] free row over budget: Actions/"Luring Presence" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] multiattack re-read — "Luring Presence" left; "Multiattack" now reads "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack."
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Searing Aura" [trait/start_of_turn/damage]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Searing Aura")
audit finding below confidence gate: Magic Resistance 2014-format wording: the 2024 statblock convention is lowercase 'advantage,' and 'Advantage' here is capitalized mid-sentence, which the format rules flag.
audit finding below confidence gate: Bite 2014-format save phrasing ('must make the following saving throw') rather than the 2024 inline save pattern, and the save is detached from the attack's trigger clause.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grants sworn allies a saving throw bonus and extra fire damage on their hits — "The pit fiend's presence steadies the discipline of sworn allies. Each ally within its aura of authority has advantage on saving throws against being charmed or frightened, and when such an ally hits with an attack, it deals extra fire damage." — Pit Fiend [seat: trait [trait/always/damage]] (closest offered: energy-aura) [effect: damage] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury death-restoration berserk shielded-mind relentless-pursuit bound guarded-stance undead-fortitude kill-denial evasion energy-aura heated-body truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:legality relic-object:legality mimicry:legality blurred-form:role death-burst:role] [landed: energy-aura]
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
```


---


### Owlbear — in the run

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
(not the page capture — the card showed the other edition; drawn from the saved JSON)
Owlbear
Large Monstrosity, Unaligned
AC 13
HP 59 (7d10 + 21)
Speed 40 ft., Climb 40 ft.
STR 20 DEX 12 CON 17 INT 3 WIS 12 CHA 7
Skills Perception +5
Senses darkvision 60 ft.; Passive Perception 15
Languages None
CR 3

Actions
Multiattack. The owlbear makes two Rend attacks.
Rend. *Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's own row, renamed

**Engine trace**

```
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/devouring mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: bear-and-raptor hybrid body [body] | crushing grapple that pins and tears [behavior] | feathered hide over heavy muscle [body]
[concept] identity: The Owlbear barrels in on four heavy limbs, a bear's mass driven by a raptor's fury, and opens with a crushing beak-snap meant to end the exchange before it starts. Every round after, it stands and trades — forelimb rakes, a hooking beak, and a bone-crushing bear hug that pins prey against its feathered chest while it tears. It is a bestial, short-tempered terrorsaur that never retreats once blood is drawn, fighting to the death over territory, food, or simply an intruder it has decided to hate.
[concept] lore: Owlbears are the hybrid offspring of a bear and a great hunting bird, quickened by old wizardry into a single savage predator that claims a stretch of forest or cave and kills anything that wanders into it.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (mechanical), head [asked: attack]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] weapons answered: Beak = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path exact
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "never breaks ranks"
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Longsword); nova none; dmg 44

```
Vashka the Red

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 93 (17d8 + 17)

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
12
+1
+1
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+4
CHA
9
-1
-1

Skills Athletics +7, Perception +3

Senses Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination. It can replace one attack with a use of Driving Shout.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 22 (4d8 + 4) Piercing damage.

Driving Shout. Wisdom Saving Throw: DC 15, each creature of Vashka's choice in a 30-foot Emanation originating from Vashka. Failure: The target immediately moves up to half its Speed in a direction of Vashka's choice, using the safest available route.

Reactions

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.

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

- Traits/Pack Tactics — print's own row; template pack-tactics; library draw (seed unstamped); the GM's clause "fights from a shield wall"; binds the GM's words: shield wall+ranks+never breaks ranks
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Longbow — print's own row, renamed; weapon longbow
- Actions/Driving Shout — template herd; library draw (seed unstamped)
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — Hobgoblin Warrior (resembles) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("a hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: fighting from an unbroken shield wall [behavior] | lacquered plate armor [body] | drilled ranks that never break [aura]
[concept] identity: Vashka the Red locks his lacquered plate shield wall and opens by advancing in step, letting his front rank eat the first charge while he calls the cadence that keeps the line dressed. Every round he fights as one body with his shield-brothers, hammering the gap anyone opens and punishing any foe who tries to slip past the wall rather than through it. He does not break: bloodied, he tightens the formation, trades ground for a better corridor, and grinds the fight to a standstill rather than flee or lose his ranks.
[concept] lore: Vashka the Red rose from a hobgoblin legion's iron discipline, and now he hires his drilled shield wall to whichever warlord will pay in plate and plunder — his one want being a battle line that never breaks.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 18, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Hobgoblin Warrior · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "fights from a shield wall" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: at_will/attack] [askMechanic: harden] | "never breaks ranks" -> has (mechanical) [asked: buff_self] [askMechanic: command]
[reskin] body verdicts: 25 of 25 answered; not true of this body: seal, active-toll, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka snaps out a cadence that his shield wall answers as one body: each ally of his choice within the wall's reach that can hear him can immediately use its Reaction to move up to half its Speed into a tighter formation, and until the end of the round any creature that tries to pass between them must succeed on a Strength saving throw or be knocked Prone and stop moving." [action/save/condition] [family: sentinel] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, lure, pacify, escalating-dread, sensory-strike (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, rampage, stunning-strike, charge-push)
[reskin] lead by this seat's own clause: action — "harden" from the clause this seat serves, not the sheet's "command"
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] keys would have bound: action — rally (shield)
[reskin] classification handed to the fit call: shape=attack often=at_will
[reskin] word match declined by the call: shield-bash, push-prone, terror-pulse — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "herd" as nearest; it lands rather than the row being dropped (what it wanted: lets allies use their Reaction to move into formation and blocks interlopers who)
[reskin] free signature row: action — "herd" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Close the Wall (2/Day)" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: herd -> Actions/"Close the Wall (2/Day)" ("The idea is a coordinated formation move for allies plus a pass-between-PrPone h [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Lacquered plate answers the cadence: whenever Vashka starts his turn adjacent to an ally who is not Incapacitated, his AC increases and he cannot be moved against his will until the start of his next turn, as the shield wall locks and braces around him." [trait/start_of_turn/defense] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does defense; leading: pack-tactics (always/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — pack-tactics (shield wall, ranks, never breaks ranks)
[reskin] classification handed to the fit call: shape=attack often=at_will
[reskin] word match declined by the call: guarded-stance, bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): pack-tactics -> Traits/"Shield Wall" ("The shield wall is an ally beside the target granting Advantage; the printed rul [verb: shield wall:concept, ranks:concept, never breaks ranks:concept]")
[reskin] one mechanic, one name: Traits/"Shield Wall" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Close the Wall (2/Day)" -> "Driving Bellow (2/Day)" — this row is herd and does what every herd row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Warhammer = warhammer; Shield Slam = shield
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Hobgoblin Warrior's
[reskin] print canon attack: "Warhammer" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Shield Slam" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] dead control row: "Driving Bellow" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Driving Bellow.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Driving Bellow" [action/save/movement]
[reskin] row binds its clause: "Pack Tactics" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "fights from a shield wall" -> "Pack Tactics" — limit at_will
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Driving Bellow")
audit finding below confidence gate: Driving Bellow Mid-combat, the GM must interpret 'safest available route' for every target in a 30-foot emanation simultaneously, a subjective clause with no defined criteria, making the action slow and inconsistent to resolve.
[reskin] audit rename: "Driving Bellow" -> "Driving Shout"
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] lets allies use their Reaction to move into formation and blocks interlopers who try to pass between them — "Vashka snaps out a cadence that his shield wall answers as one body: each ally of his choice within the wall's reach that can hear him can immediately use its Reaction to move up to half its Speed into a tighter formation, and until the end of the round any creature that tries to pass between them must succeed on a Strength saving throw or be knocked Prone and stop moving." — Vashka the Red [seat: action [action/save/condition]] (closest offered: herd) [effect: movement] [menu: shield-bash terror-pulse push-prone reveal lure pacify escalating-dread sensory-strike ground-burst obstacle-pull slow-bolt disarm herd curse-debt wind-up throw-retrieve own-turn-punisher] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality trample:role leap:role thrown-burst:role gaze-single:role snare:role reel:role condition-payoff:role execute:role seal:legality hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:role burrow-ambush:legality snare-bolt:role thrown-burst-seed:role drain:role exploiter:legality blighted-ground:role] [landed: herd]
[reskin] signature tally: 2 seat(s) -> 3 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path class_npc
```


---


### Scythe-Shell Harvester — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scythe-Shell Harvester | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "a shell that sheds acid"
- **dropped clause:** "carving with the others"
- read: def 7 / off 9 → 8; sustained 62 (2 × Spitting Maw); nova none; dmg 62

```
Scythe-Shell Harvester

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+8
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
12
+1
+1
MOD
SAVE
CON
17
+3
+7
CHA
6
-2
-2

Skills Athletics +8, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Acid-Dripping Shell. At the end of each of the scythe-shell harvester's turns, each creature in a 5-foot Emanation originating from the scythe-shell harvester takes 7 (2d6) Acid damage.

Actions

Multiattack. The scythe-shell harvester makes two Spitting Maw attacks. It can replace one attack with a use of Binding Lash.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Binding Lash. Dexterity Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the scythe-shell harvester's next turn.

Bonus Actions

Swallow. The scythe-shell harvester swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scythe-shell harvester, and takes 10 (3d6) Acid damage at the start of each of the scythe-shell harvester's turns. The scythe-shell harvester can have only one creature swallowed at a time. If the scythe-shell harvester takes 25 damage or more on a single turn from the swallowed creature, the scythe-shell harvester must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scythe-shell harvester. If the scythe-shell harvester dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
- Actions/Spitting Maw — authored for this sheet; a named part; the GM's clause "a spitting maw"
- Actions/Binding Lash — template snare-bolt; library draw (seed unstamped); the GM's clause "a spitting maw"; binds the GM's words: spit+restrain
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Acid-Dripping Shell — template composed:zone:damage; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, breath
[concept] signature elements: four scythe-arms that pin and carve [body] | acid-shedding shell [aura] | acid-spitting maw [body]
[concept] identity: The scythe-shell opens by surging into reach and slamming two scythe-arms down to pin the nearest victim flat, then carves with the remaining pair while its maw spits acid over the struggle. Every round it keeps one prey held and bleeding while its shed shell hisses acid at anything that tries to crowd it, and it never withdraws — a bloodied scythe-shell only pins harder, dragging the fight to a close in a knot of limbs and dissolving chitin.
[concept] lore: A colony-born horror of the shallow badlands, it sheds its outer shell after every molting-season feast and hunts living meat to harden the next, hoarding prey in acid-etched pits until the new plates set.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Spitting Maw (slot, Grappled) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scythe-shell harvester" — the call's own answer (kind), built from the name
[reskin] inline form: "the scythe-shell harvester" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple] | "a spitting maw" -> has (mechanical) [asked: save_single] [askMechanic: burst] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/save_area] [askMechanic: retaliate] | "It fights by pinning prey with two arms" -> has (descriptive) | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] body verdicts: 30 of 30 answered; not true of this body: active-toll, random-ray, herd, drain, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The harvester slams two of its scythe-arms down, pinning every creature in a line beneath them to the ground. Each creature in the line must succeed on a Strength saving throw or have the Prone and Restrained conditions (escape DC equal to the grapple DC); while Restrained this way, the creature is pinned in place by a scythe-arm and takes slashing damage at the start of each of its turns as the h" [action/save/condition] [family: drag] — menu: leap, condition-payoff, shield-bash, ground-burst, spew, thrown-burst-seed, wind-up, exploiter, trample, thrown-burst, execute, lure, pacify, snare-bolt (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — exploiter, snare-bolt, spew, shell-withdraw (pinned, spit, spits, shell)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, breath shape=condition when=on_hit
[reskin] word match declined by the call: shield-bash, lure, pacify, pounce — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "snare-bolt" as nearest; it lands rather than the row being dropped (what it wanted: pins every creature in a line with Restrained and deals recurring damage each tu)
[reskin] value check: "Scythe Pin" EV 17.6 vs floor 16.6 (one attack of 2) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Scythe Pin" ("The harvester pins every creature in a line beneath its scythe-arms, imposing Pr [verb: spit:concept, restrain:idea]")
[reskin] keys spent by the action: spit
[reskin] signature idea (trait): "The harvester's shell constantly weeps acid. At the start of each of its turns, each creature of its choice within 5 feet of it must succeed on a Constitution saving throw or take acid damage as the corrosive drippings eat through armor and flesh. Any creature that hits the harvester with a melee attack also risks a splash of acid from the cracked shell." [trait/start_of_turn/damage] [family: zone] — menu: spider-climb, phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: composed:zone:damage (start_of_turn/damage), noxious-aura (start_of_turn/condition), truth-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — fear-aura (horror)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, breath shape=condition when=on_hit
[reskin] word match declined by the call: noxious-aura, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:damage: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:damage" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "acid-shedding shell" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Acid-Dripping Shell" — the trait seat cannot quote the GM, but the call names the element it expresses: "acid-shedding shell". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): composed:zone:damage -> Traits/"Acid-Dripping Shell" ("the shell constantly weeps acid and damages each creature of its choice within 5 [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Scythe Pin" -> "Binding Lash" — this row is snare-bolt and does what every snare-bolt row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"carving with the others","row":"Spitting Maw"}], unplaced []
[reskin] clause already answered: "carving with the others" is carried by "Spitting Maw" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Scythe-Arm = none; Spit Acid = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Binding Lash.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Acid-Dripping Shell" [no template]
[reskin] row binds its clause: "Binding Lash" answers "a spitting maw" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "It has four scythe-arms" asked for on_hit and no row binds the clause
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit and no row binds the clause
[reskin] element expressed: Acid-Dripping Shell carries "acid-shedding shell" — "takes 7 (2d6) Acid damage"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] pins every creature in a line with Restrained and deals recurring damage each turn — "The harvester slams two of its scythe-arms down, pinning every creature in a line beneath them to the ground. Each creature in the line must succeed on a Strength saving throw or have the Prone and Restrained conditions (escape DC equal to the grapple DC); while Restrained this way, the creature is pinned in place by a scythe-arm and takes slashing damage at the start of each of its turns as the h" — Scythe-Shell Harvester [seat: action [action/save/condition]] (closest offered: snare-bolt) [effect: condition] [menu: shield-bash lure pacify snare-bolt leap condition-payoff ground-burst spew thrown-burst-seed wind-up exploiter trample thrown-burst execute pounce] [same-cell unoffered: swallow gaze-single snare seal random-ray escalating-dread terror-pulse sensory-strike push-prone reveal] [same-seat rejected: swallow:legality gaze-single:role snare:role reel:role seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality burrow-ambush:legality obstacle-pull:role escalating-dread:legality terror-pulse:legality slow-bolt:role sensory-strike:role disarm:role push-prone:legality herd:legality drain:legality curse-debt:role reveal:role blighted-ground:role] [landed: snare-bolt]
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
```


---


### Bogwitch Molra — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bogwitch Molra | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Trespasser's Bane
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Bogwitch Molra

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+3
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
+3

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Molra makes three Arcane Burst attacks. It can replace one attack with a use of (A) Creeping Dread or (B) Spellcasting to cast Ray of Sickness.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Molra casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Creeping Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of Molra's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Psychic damage.

Trespasser's Bane. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). Molra casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Molra casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Creeping Dread — template escalating-dread; library draw (seed unstamped)
- Actions/Trespasser's Bane — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("who curses trespassers") | caster-binder: key "curses" (class verb)
[concept] name: provided_name rejected — "a marsh witch who curses trespassers…" is the description, not a name
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=venomous/arcane mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: cursing trespassers with throttled action [behavior] | venom wrung from the standing mire [body] | sinking into reeds to resume the hex [behavior]
[concept] identity: The marsh witch opens with a serpent-lash of woven curse-venom, stripping her trespassers of their speed and their senses before a blade ever clears its sheath. Each round after she feeds the mire itself into her workings, wringing venom and confusion from the standing water to bind another attacker in place, so the fight is lost by inches of stolen action rather than by wounds. She is patient and delighted, and bloodied she will not flee a fight in her own swamp; she sinks into the reeds and starts the hexing again.
[concept] lore: A marsh witch is a swamp-dweller who traded her years to the mire for the power to punish those who cross it, and she wants nothing more than for every trespasser to leave a little of themselves behind in the water.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] name_element answered: Hex Bolt = literal; Venom Curse = literal
[reskin] repair round 1: 2 defect(s) — "Hex Bolt" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type | "Venom Curse" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "Molra" — the call's own answer (person), built from the name
[reskin] inline form: "Molra" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy withheld on a base row: "Hex Bolt" Poison -> Piercing (the row's own noun; a Humanoid deals no Poison its concept never gave it)
[reskin] energy withheld on a base row: "Venom Curse" Poison -> Necrotic (the row's own noun; a Humanoid deals no Poison its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] control spell gated to daily — Slow (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] [askMechanic: curse] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, active-toll, random-ray, spew, herd, drain, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] signature idea (action): "Molra drags a thread of mire-thick curse through the standing water and flicks it at one foe within range; on a failed Wisdom save the target is Cursed — it can take either an action or a bonus action on each of its turns, not both, until Molra is slain or lifts the hex. The air tastes of drowned leaves while the hex holds." [action/save/condition] [family: mark] — menu: condition-payoff, wail, lure, ground-burst, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, zone-seed, reveal, wind-up, blighted-ground, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, snap-shot, bolt-restrain, bolt-drag, bolt-mark, affliction, contagion, stunning-strike, pounce)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), lure (save/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: curse-debt, delayed-brand, pacify, escalating-dread, snare-bolt, sensory-strike, reveal, shield-bash, terror-pulse, push-prone, condition-payoff, ground-burst, obstacle-pull, slow-bolt, thrown-burst-seed, wind-up, blighted-ground, wail, zone-seed, bolt-drag — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "escalating-dread" as nearest; it lands rather than the row being dropped (what it wanted: applies a custom hex that limits the target to either an action or a bonus actio)
[reskin] free signature row: action — "escalating-dread" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Mire Curse" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: escalating-dread -> Actions/"Mire Curse" ("Molra drags a thread of mire-thick curse through the standing water and flicks it at one foe within range; on a failed Wisdom save the target is Cursed — it can [shape fit, no verb match]")
[reskin] signature idea (trait): "The bog answers Molra's trespassers: a creature that ends its turn standing in swamp water or marsh mud within her reach of the mire takes a creeping rot — it can't take Reactions and its Speed is reduced, its footing swapped for drowned ground, until the start of its next turn." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, warded-mending, undead-fortitude, truth-aura, fear-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key terrain-walk, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's marsh and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The bog answers Molra's trespassers: a creature that ends its turn standing in swamp water or marsh mud within her reach of the mire takes a creeping rot — it can't take Reactions and its Speed is reduced, its footing swapped for drowned ground, until the start of its next turn." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, warded-mending, phobia, kill-denial, berserk, spider-climb, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] one mechanic, one name: Actions/"Mire Curse" -> "Creeping Dread" — this row is escalating-dread and does what every escalating-dread row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 1, traits 0, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Thorn Nails = none; Hex Bolt = none; Venom Curse = none; Mire Hex = none
[reskin] weapon declined: "Hex Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Hex Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Thorn Nails" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Molra makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Hex Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] save follows the effect: Actions/"Trespasser's Bane" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Venom Curse" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Creeping Dread or (B) Spellcasting to cast *Ray of Sickness*.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Creeping Dread" [action/save/condition]
[reskin] save re-derived after a retype: Actions/Trespasser's Bane — a Dexterity save for a condition the row IMPOSES, which calls for Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Creeping Dread")
audit finding below confidence gate: Trespasser's Bane The Poisoned condition has a stated end but the entry has no reach/timing gap issue; however it is redundant that a save-based action appears without being usable in Multiattack—no, this is not the defect. Instead: Creeping Dread's secondary effect requires the target to already be Frightened by this ability, but nothing prevents a fresh Fearless resolution—actually the rider is functional. No defect.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] applies a custom hex that limits the target to either an action or a bonus action each turn until the caster dies or lif — "Molra drags a thread of mire-thick curse through the standing water and flicks it at one foe within range; on a failed Wisdom save the target is Cursed — it can take either an action or a bonus action on each of its turns, not both, until Molra is slain or lifts the hex. The air tastes of drowned leaves while the hex holds." — Bogwitch Molra [seat: action [action/save/condition]] (closest offered: escalating-dread) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread snare-bolt sensory-strike reveal shield-bash terror-pulse push-prone condition-payoff ground-burst obstacle-pull slow-bolt thrown-burst-seed wind-up blighted-ground wail zone-seed bolt-drag] [same-cell unoffered: swallow gaze-single snare seal random-ray] [same-seat rejected: swallow:role trample:role leap:role thrown-burst:style gaze-single:style snare:style reel:style execute:style seal:legality hook-drag:role active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality disarm:role herd:legality drain:legality exploiter:role] [landed: escalating-dread]
[reskin] [gap] removes the target's Reactions and cuts its Speed while it stands in mire or water — "The bog answers Molra's trespassers: a creature that ends its turn standing in swamp water or marsh mud within her reach of the mire takes a creeping rot — it can't take Reactions and its Speed is reduced, its footing swapped for drowned ground, until the start of its next turn." — Bogwitch Molra [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded warded-mending phobia kill-denial berserk spider-climb terrain-walk aberrant-ground bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: energy-aura:legality noxious-aura:legality gaze-aura:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path class_npc
```


---


### Ossuary Vigil — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Vigil | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Ossuary Vigil

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

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

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the vigil, the vigil and its allies have Advantage on attack rolls and saving throws, provided the vigil doesn't have the Incapacitated condition.

Actions

Multiattack. The vigil makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vigil's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the vigil can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace-and-shield line-holding [behavior] | iron plate and worn shield [object] | magicless, unbreakable devotion [behavior]
[concept] identity: A shield-and-plate templar steps into the gap and makes himself the door: he plants, weathers the first blows on his shield, then answers with short, crushing mace work aimed at knees, wrists, and the hands that reach past him. Every round he holds the line, shoving and hammering anyone who tries to slip by, and he never yields an inch while breath remains — a stubborn wall of iron faith that must be broken, not outsmarled.
[concept] lore: A templar priest stripped of his god's favor, he keeps his vows with the only liturgy left to him — the mace — guarding the order's reliquaries long after every colleague has fled or fallen, because a man who has lost his miracles must still keep his post.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Iron Cudgel" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the vigil" — the call's own answer (kind), built from the name
[reskin] inline form: "the vigil" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] body verdicts: 25 of 25 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The vigil slams his shield forward in a single, brutal shove. Each creature of his choice within reach must succeed on a Strength saving throw or be pushed back and knocked Prone, and the vigil moves with them to remain in their space, planting his shield line exactly where the enemy tried to slip through." [action/save/movement] [family: sentinel] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: obstacle-pull (save/movement), slow-bolt (save/movement), disarm (save/movement)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: obstacle-pull, disarm, shield-bash — the key word does not mean the mechanic here
[reskin] free signature row: "Shield Shove" — a print body takes only what the user's words ask, but the call names the element it expresses: "mace-and-shield line-holding". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: push-prone -> Actions/"Shield Shove" ("the shove pushes each chosen creature back and knocks it Prone, and the vigil ad [verb: shove:idea, slam:idea, knock:idea, push:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The vigil's shield is part of his reach: while he is wielding it, the first time each turn a creature moves within his reach, he can interpose the shield, imposing Disadvantage on that creature's attack roll against any target other than himself until the start of his next turn. He makes himself the door, and the line holds because he is the door." [trait/always/defense] [family: sentinel] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] verb gate stands down: trait — no template shares a verb, but 6 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, shielded-mind, relic-object, undead-fortitude, evasion; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: shielded-mind, relic-object, pack-tactics — the key word does not mean the mechanic here
[reskin] free signature row: trait — "guarded-stance" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "mace-and-shield line-holding" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Shield Wall" — the trait seat cannot quote the GM, but the call names the element it expresses: "mace-and-shield line-holding". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] signature template (trait): guarded-stance -> Traits/"Shield Wall" ("the vigil interposes his shield so attackers come at disadvantage until he is tr [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Shield Wall" -> "Guarded Stance" — this row is guarded-stance and does what every guarded-stance row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Actions/"Shield Shove" -> "Sundering Shove" — this row is push-prone and does what every push-prone row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Mace = mace; Iron Cudgel = mace
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the vigil makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
[reskin] free row over budget: Actions/"Sundering Shove" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Guarded Stance" [trait/always/defense]
[reskin] element expressed: Guarded Stance carries "mace-and-shield line-holding" — "While the vigil isn't Bloodied, melee attack rolls against it are made with Disa"
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] guarded stance withdrawn: Traits/"Guarded Stance" leaves the finished sheet — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the menu filter had checked an AC that print canon changed afterwards
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Swarm of Drowned Funeral Bells — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Drowned Funeral Bells | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a swarm of funeral bells"
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Iron Rim); nova Death Knell Toll 67; dmg 90

```
Swarm of Drowned Funeral Bells

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 40 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Blood Frenzy. The swarm has Advantage on attack rolls against any creature that doesn't have all its Hit Points.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Iron Rim. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Bludgeoning damage, or 45 (9d8 + 5) Bludgeoning damage if the swarm is Bloodied.

Death Knell Toll (1/Day). Dexterity Saving Throw: DC 17, one Bloodied creature the swarm can see within 90 feet. Failure: If the target has 67 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes 67 (15d8) Necrotic damage.

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

- Traits/Blood Frenzy — template blood-frenzy; library draw (seed unstamped); binds the GM's words: blood
- Traits/Swarm — the chassis
- Actions/Iron Rim — the chassis
- Actions/Death Knell Toll — template execute; library draw (seed unstamped); binds the GM's words: finish

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: self-ringing funeral toll [behavior] | swarm of tarnished iron bells [body] | gathering over the dying [behavior]
[concept] identity: A churning flock of tarnished funeral bells drifts in over the dying, tolling in rising waves that mark the last moments of a life — it clusters above a fallen creature and peals louder the closer it comes to death, driving its rimmed iron mouths down to bleed the final breath. It opens by hovering just out of reach and layering its ringing into a numbing, disorienting knell, then descends as one mass of clappers and rims to batter and drain. Under pressure it does not flee — it answers injury by swelling its toll to a deafening din, and it keeps ringing long after the body beneath it stops breathing.
[concept] lore: These bells were cast for a hundred funerals in a drowned cathedral town and never rung when the flood took it; now they fly in search of the dying they were denied, so that every death gets its final toll.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Drowned Funeral Bells" -> "Swarm of Drowned Funeral Bells" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the funeral bells" (kind), which the name does not support
[reskin] the sheet's declared ask: drain — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (mechanical) [asked: attack] | "ring themselves over the dying" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, snare, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, adhesive, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm sets every clapper swinging in a rising funeral peal aimed at one dying creature it can sense. The target must make a Constitution saving throw; on a failure it takes Necrotic damage and its Hit Point maximum is reduced by an amount equal to the damage, and this reduction lasts until it finishes a long rest — the toll is rung for it, and the bells intend to collect." [action/save/damage] [family: payoff] — menu: thrown-burst, execute, shield-bash, wail, lure, active-toll, ground-burst (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: thrown-burst (save/damage), execute (save/damage), active-toll (save/damage)
[reskin] keys would have bound: action — active-toll (ring, bell)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: active-toll, ground-burst, thrown-burst, lure, wail — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "execute" as nearest; it lands rather than the row being dropped (what it wanted: reduces the target's Hit Point maximum until it finishes a long rest)
[reskin] value check: "Funeral Peal (1/Day)" EV 99.6 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: execute -> Actions/"Funeral Peal (1/Day)" ("The idea is a save-or-suffer toll aimed at one dying creature that reduces its H [verb: finish:idea]")
[reskin] signature idea (trait): "The bells keep pealing over the dying. While the swarm is within reach of a creature that is Bloodied, it has Advantage on its attack rolls against that creature and its Iron Rim deals extra Necrotic damage, as the toll finds the failing breath." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: bloodied-burst, resonant-body)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: bloodied-fury, blood-frenzy, pack-tactics, assassinate — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "blood-frenzy" as nearest; it lands rather than the row being dropped (what it wanted: grants Advantage and bonus Necrotic damage on the swarm's attacks only against a)
[reskin] row kept the template's own name: trait — "Blood Frenzy" is blood-frenzy's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: "Blood Frenzy" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): blood-frenzy -> Traits/"Blood Frenzy" ("The idea changes the swarm's own attack rolls (Advantage against Bloodied creatu [verb: blood:idea]")
[reskin] one mechanic, one name: Actions/"Funeral Peal (1/Day)" -> "Threshold Execute (1/Day)" — this row is execute and does what every execute row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "ring themselves over the dying"; one targeted call with the sheet as context
[reskin] authored trait refused: "Death Ring" — no mechanic in the effect; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:ring themselves over the dying"]
[reskin] clause answered in prose: "ring themselves over the dying" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Iron Rim = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] bloodied half re-derived: "Iron Rim" — 14 (4d6) -> 45 (9d8 + 5), half of the main 90 on the main's own +5 (print's ratio and print's modifier)
[reskin] nova capped: Actions/Threshold Execute (1/Day) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Blood Frenzy" [trait/always/damage]
[reskin] threshold re-derived after the cap: Actions/Threshold Execute (1/Day) — 75 over the row's own 67 damage, so the kill branch beat the damage branch; threshold to 67
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Blood Frenzy")
[reskin] audit rename: "Threshold Execute (1/Day)" -> "Death Knell Toll (1/Day)"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] reduces the target's Hit Point maximum until it finishes a long rest — "The swarm sets every clapper swinging in a rising funeral peal aimed at one dying creature it can sense. The target must make a Constitution saving throw; on a failure it takes Necrotic damage and its Hit Point maximum is reduced by an amount equal to the damage, and this reduction lasts until it finishes a long rest — the toll is rung for it, and the bells intend to collect." — Swarm of Drowned Funeral Bells [seat: action [action/save/damage]] (closest offered: execute) [effect: resource] [menu: thrown-burst execute active-toll ground-burst shield-bash lure wail] [same-cell unoffered: trample leap condition-payoff spew burrow-ambush thrown-burst-seed drain curse-debt wind-up exploiter blighted-ground] [same-seat rejected: swallow:legality trample:legality leap:legality gaze-single:legality snare:legality reel:legality condition-payoff:legality seal:legality hook-drag:legality pull-through:legality random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality push-prone:role herd:role curse-debt:role reveal:role wind-up:role exploiter:legality blighted-ground:legality] [landed: execute]
[reskin] [gap] grants Advantage and bonus Necrotic damage on the swarm's attacks only against a Bloodied target within reach — "The bells keep pealing over the dying. While the swarm is within reach of a creature that is Bloodied, it has Advantage on its attack rolls against that creature and its Iron Rim deals extra Necrotic damage, as the toll finds the failing breath." — Swarm of Drowned Funeral Bells [seat: trait [trait/always/damage]] (closest offered: blood-frenzy) [effect: damage] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia faultless-tracker bloodied-fury death-restoration berserk shielded-mind evasion relentless-pursuit bound guarded-stance undead-fortitude bloodied-burst resonant-body truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role relic-object:legality mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [landed: blood-frenzy]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path homebrew
```


---


### Thunderhead Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thunderhead Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 36 (2 × Talons); nova Thunder Wall 42; dmg 52

```
Thunderhead Drake

Large Dragon, Chaotic Neutral

AC 18
Initiative +1 (11)

HP 105 (14d10 + 28)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
12
+1
+4
WIS
12
+1
+4
MOD
SAVE
CON
15
+2
+2
CHA
14
+2
+2

Skills Perception +4, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Traits

Resonant Body. A creature that hits the thunderhead drake with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Actions

Multiattack. The thunderhead drake makes two Talons attacks.

Talons. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage. If the thunderhead drake moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 9 (2d8) Thunder damage and, if it is Large or smaller, has the Prone condition.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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
- Actions/Talons — binds the GM's words: charge
- Actions/Thunder Wall — the chassis
- Traits/Resonant Body — template resonant-body; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/aerial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: a rolling wall of thunder breath [behavior] | storm-charged scales and wingbeats [body] | the booming pressure front that precedes it [aura]
[concept] identity: A young storm drake announces itself by exhaling a rolling wall of thunder that slams across the battlefield, bowling over clustered foes before it wheels overhead on wind-torn wings. It then stoops in biting, raking passes, using its breath to break formations and herd prey into the open, and it fights on with hair-trigger fury when pressed, unwilling to yield its sky.
[concept] lore: Hatched in the roiling cumulonimbus above shattered highlands, a storm drake rides the leading edge of thunderheads and seeks to claim the tallest peak as its thunderhead throne.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Thunderhead Drake = imagery; Thunder Wall = literal; Staggering Crack = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the thunderhead drake" — the call answered "the head drake" (kind), which the name does not support
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "a young storm drake whose breath is a rolling wall of thunder" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: at_will/save_area] [askMechanic: breath]
[reskin] body verdicts: 33 of 33 answered; not true of this body: gaze-single, snare, seal, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, pacify, sensory-strike, curse-debt, reveal, aggro-curse, own-turn-punisher, self-invisibility, focus (the sheet cannot render them)
[reskin] signature idea (action): "The drake's thunder-charged wingbeat slams a creature that moves within its reach, forcing a Strength saving throw; on a failure, the target is pushed back and knocked Prone as the concussive gust bowls it over." [reaction/on_being_hit/condition] [family: sentinel] — menu: EMPTY (+ shelf: zone, execute, shield-bash, lure, rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does condition; leading: charge (on_hit/damage)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area when=at_will
[reskin] word match declined by the call: charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "charge" as nearest; it lands rather than the row being dropped (what it wanted: an at-will area breath that forces a save against a rolling thunder wall)
[reskin] signature rider: charge -> Talons (appended; The idea is a reaction triggered by a creature moving within reach that forces a [verb: charge:idea])
[reskin] signature idea (trait): "Storm-charged scales crackle with latent thunder; whenever the drake takes Thunder damage, its next Talons attack deals an extra 2d6 Thunder damage as the energy is absorbed and released." [trait/on_being_hit/damage] [family: body-reaction] — menu: absorption, resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage), composed:body-reaction:damage:t1 (on_being_hit/damage)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area when=at_will
[reskin] word match declined by the call: resonant-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: absorbs thunder damage taken and stores it to boost its next attack)
[reskin] pick kept on the GM's own words: trait — "resonant-body" has no key-table verb, but the call quotes "a young storm drake whose breath is a rolling wall of thunder" from the description
[reskin] signature template (trait): resonant-body -> Traits/"Storm Retort" ("The idea is about absorbing Thunder damage and releasing it into its next Talons [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Storm Retort" -> "Resonant Body" — this row is resonant-body and does what every resonant-body row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Talons = none; Thunder Wall = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] asked but unanswered: "a young storm drake whose breath is a rolling wall of thunder" asked for at_will and no row binds the clause
audit finding below confidence gate: Resonant Body The Deafened condition's timing is anchored to the attacker's next turn with no clause handling what happens if the attacker's turn order has already passed or is otherwise unclear, leaving the end point ambiguous at the table.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an at-will area breath that forces a save against a rolling thunder wall — "The drake's thunder-charged wingbeat slams a creature that moves within its reach, forcing a Strength saving throw; on a failure, the target is pushed back and knocked Prone as the concussive gust bowls it over." — Thunderhead Drake [seat: action [reaction/on_being_hit/condition]] (closest offered: charge) [effect: damage] [menu: charge] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:legality snap-shot:legality riposte:role interpose:legality] [landed: charge]
[reskin] [gap] absorbs thunder damage taken and stores it to boost its next attack — "Storm-charged scales crackle with latent thunder; whenever the drake takes Thunder damage, its next Talons attack deals an extra 2d6 Thunder damage as the energy is absorbed and released." — Thunderhead Drake [seat: trait [trait/on_being_hit/damage]] (closest offered: resonant-body) [effect: damage] [menu: resonant-body composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 absorption weapon-lodge] [same-cell unoffered: heated-body bloodied-burst ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality bloodied-burst:legality] [landed: resonant-body]
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path homebrew
[reskin] record reconciled: "Talons" no longer imposes Prone — the clause left, so the record goes with it
```


---


### Well-Drowned — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Well-Drowned [seed 1/2] | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Grab); nova none; dmg 38

```
Well-Drowned

Medium Undead, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft.

MOD
SAVE
STR
16
+3
+6
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
16
+3
+3
MOD
SAVE
CON
17
+3
+3
CHA
6
-2
-2

Skills Perception +6, Stealth +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 5 (XP 1,800; PB +3)

Traits

Uncanny Sense. The well-drowned can pinpoint the location of moving creatures within 60 feet of itself.

Actions

Multiattack. The well-drowned makes two Grab attacks. It can replace one attack with a use of Drowning Terror.

Grab. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the well-drowned), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Drowning Terror. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the well-drowned's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Necrotic damage.

Bonus Actions

False Form. The well-drowned shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Grab — the chassis
- Actions/Drowning Terror — library seed escalating-dread
- Bonus Actions/False Form — the chassis
- Traits/Uncanny Sense — template uncanny-sense; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "the thing in the well" | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "the thing in the well" is written in lowercase inside a description; the generator names it
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ambush from beneath the well water [behavior] | grave-cold grip that drags prey down [behavior] | the black water it never leaves [aura]
[concept] identity: The thing in the well is a drowned, grave-fed lurker that hangs in the black water just below the coping stones, wearing the shape of a pale hand or a lost face until a bucket line drops and a wrist comes within reach. It fights by snapping shut around the limb with its grave-cold grip and dragging the victim down under the water, then holds and presses until the struggle stops. Half-starved and hollow, it does not pursue past the rim of the well; if the fight turns against it, it sinks to the bottom and waits, patient as the water, for the next hand that reaches in.
[concept] lore: It is what the well gave back — a body drowned or thrown there long ago, salted with other peoples' grief and small offerings, that learned to hunger and stayed below to feed on whatever came to draw water.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the well-drowned" — the call's own answer (kind), built from the name
[reskin] inline form: "the well-drowned" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] body verdicts: 34 of 34 answered; not true of this body: seal, wail, active-toll, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst
[reskin] signature idea (action): "When the well-drowned hits a creature with its Grab while it is hidden in or beneath water, the target is yanked down with it — pulled off whatever it stands on and hauled into the water with the well-drowned, where it must start its turn in that water or begin drowning. The well-drowned does not need to be seen for this; only the wrist that reaches in." [rider/on_hit/movement] [family: drag] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain (+ shelf: swallow, condition-payoff, lure, hook-drag, pull-through, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, delayed-brand, exploiter, patient-defense, self-invisibility, focus, feint-slip, riposte)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider, hook-drag, pull-through
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: hook-rider (on_hit/movement), hook-drag (save/movement), pull-through (save/movement)
[reskin] word match declined by the call: hook-drag, pull-through, charge-push, pounce — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: pulls the target into the creature's water space and leaves it there, forcing it)
[reskin] free signature row: "Well-Dragged Under" — a rider rides the user's own attack, so it needs the user's own ask, but the call names the element it expresses: "ambush from beneath the well water". Earns no clause credit; the budget settles on the finished sheet
[reskin] rider refused — duplicate trigger: "hook-rider" opens with "If the target is a Large or smaller creature…", which "Grab" already carries; the slot leaves and the seat looks elsewhere
[reskin] value check: "Creeping Dread" EV 12.4 vs floor 9.4 (one attack of 2) — dice 9 → 18
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The well-drowned can always feel the ripple of anything breaking the surface of water within a wide reach of it, and it knows the exact weight, size, and direction of every bucket, hand, or body that touches the water. It is never surprised by anything touching its water, and while it is submerged it can Hide even without cover or concealment." [trait/always/condition] [family: mark] — menu: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, blurred-form, kill-denial, berserk
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), kill-denial (always/condition), berserk (always/condition)
[reskin] pick kept on the GM's own words: trait — "uncanny-sense" has no key-table verb, but the call quotes "the thing in the well" from the description
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): uncanny-sense -> Traits/"Water Sense" ("The well-drowned feels the ripple of anything breaking the water and knows the w [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Water Sense" -> "Uncanny Sense" — this row is uncanny-sense and does what every uncanny-sense row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Grab = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
audit finding below confidence gate: Creeping Dread The saving throw is missing the target/range preamble phrasing expected of an action's save line; it reads as a stat label rather than an action effect, though range and target follow.
[reskin] audit rename: "Creeping Dread" -> "Drowning Terror"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Drowning Terror) — the sameness metric
[reskin] [gap] pulls the target into the creature's water space and leaves it there, forcing it to start its turn in the water or drown — "When the well-drowned hits a creature with its Grab while it is hidden in or beneath water, the target is yanked down with it — pulled off whatever it stands on and hauled into the water with the well-drowned, where it must start its turn in that water or begin drowning. The well-drowned does not need to be seen for this; only the wrist that reaches in." — Well-Drowned [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider hook-drag pull-through charge-push stunning-strike pounce isolation life-drain obstacle-pull exploiter] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:legality contagion:legality snatch:legality bolt-restrain:role bolt-drag:legality bolt-mark:role charge:role] [VETOED AFTER ACCEPTANCE: hook-rider never reached the sheet — died at the weld (duplicate trigger) (Well-Dragged Under)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the weld (duplicate trigger)
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the weld (duplicate trigger)) · path homebrew
```


---


### Arena Relict — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Arena Relict | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova Shockwave 21; dmg 44

```
Arena Relict

Medium Undead, Lawful Evil

AC 14
Initiative +3 (13)

HP 117 (18d8 + 36)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+5
CHA
5
-3
-3

Skills Athletics +7, Perception +2

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Great Weapon Master. When the relict hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The relict makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Shockwave (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the relict. Failure: 21 (6d6) Necrotic damage. Success: Half damage.

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
- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "a skeleton with a greatsword"; weapon greatsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Actions/Shockwave — template ground-burst; library draw (seed unstamped); binds the GM's words: around it
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: an oversized greatsword swung in wide arcs [object] | relentless, tireless advance that never routs [behavior] | bare bone frame that takes blows a living body couldn't [body]
[concept] identity: A greatsword skeleton wades in blade-first, sweeping its oversized weapon in wide arcs to keep multiple foes at reach before stepping in to trade blow for blow. Round after round it simply presses forward, absorbing hits that would fell a living soldier and answering each with a heavier overhead chop. It never tires, never routs, and never negotiates — it fights until its bones are shattered, silent and implacable.
[concept] lore: Raised from the unburied bones of an executed champion by a necromancer's careless ritual, it still believes it is fighting for its life in an arena that no longer exists.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the relict" — the call's own answer (kind), built from the name
[reskin] inline form: "the relict" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The relict plants its feet and sweeps its greatsword in a wide, grinding arc that scythes through everything around it. Each creature within its reach must make a Dexterity saving throw; on a failure it takes Slashing damage and is knocked Prone as the flat of the blade drives it down into the sand." [action/save/condition] [family: nova] — menu: thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: push-prone, shield-bash, snare, seal, thrown-burst — the key word does not mean the mechanic here
[reskin] free signature row: "Whirling Sweep (Recharge 5-6)" — a print body takes only what the user's words ask, but the call names the element it expresses: "an oversized greatsword swung in wide arcs". Earns no clause credit; the budget settles on the finished sheet
[reskin] free signature row: "Whirling Sweep (Recharge 5-6)" — a whole-round ability the GM never asked for, but the call names the element it expresses: "an oversized greatsword swung in wide arcs". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: ground-burst -> Actions/"Whirling Sweep (Recharge 5-6)" ("The relict sweeps its greatsword in a wide, grinding arc through everything arou [verb: around it:idea]")
[reskin] signature idea (trait): "The relict has no pain to heed and no wound that stays shut; at the start of each of its turns it regains Hit Points unless it has taken Radiant damage since its last turn. Shattered bone knits and splinters crawl back into the sockets while it presses the fight, tireless until holy fire is set to it." [trait/start_of_turn/resource] [family: heal] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does resource; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), spider-climb (always/movement)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: truth-aura, fear-aura, blood-frenzy, bloodied-fury, death-restoration — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "undead-fortitude" as nearest; it lands rather than the row being dropped (what it wanted: regains Hit Points each turn unless it took Radiant damage since its last turn)
[reskin] free signature row: trait — "undead-fortitude" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Radiant-Bane Reknitting" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): undead-fortitude -> Traits/"Radiant-Bane Reknitting" ("The idea is a start-of-turn regeneration gated by Radiant damage — a resource re [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Whirling Sweep (Recharge 5-6)" -> "Shockwave (Recharge 5-6)" — this row is ground-burst and does what every ground-burst row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Radiant-Bane Reknitting" -> "Undead Fortitude" — this row is undead-fortitude and does what every undead-fortitude row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Greatsword = greatsword; Hurlbone = none
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurlbone" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] free row over budget: Traits/"Undead Fortitude" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shockwave" [action/save/damage]
[reskin] element claim revoked: "Shockwave" claims "an oversized greatsword swung in wide arcs" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Shockwave")
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] regains Hit Points each turn unless it took Radiant damage since its last turn — "The relict has no pain to heed and no wound that stays shut; at the start of each of its turns it regains Hit Points unless it has taken Radiant damage since its last turn. Shattered bone knits and splinters crawl back into the sockets while it presses the fight, tireless until holy fire is set to it." — Arena Relict [seat: trait [trait/start_of_turn/resource]] (closest offered: undead-fortitude) [effect: resource] [menu: truth-aura fear-aura spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: warded-mending] [same-seat rejected: energy-aura:legality noxious-aura:legality warded-mending:legality gaze-aura:legality] [VETOED AFTER ACCEPTANCE: undead-fortitude never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path twist
[reskin] multiattack re-read — "Shortbow" joins the combination; "The relict makes two attacks, using Greatsword or Shortbow in any combination."
```


---

