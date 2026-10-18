# Case: stage 4b step 3 — a key gate becomes a receipt gate

Runs: `smoke-out/cues-2026-10-17T00-36-41` (10 blocks, built to make the new field
answer both ways) and `smoke-out/holds-2026-10-17T00-21-12` (8 blocks, the
critic's own release conditions).
Gates: 71 suites / 2804 passed; `npm run build` clean; 48 pins in
`reskin/__tests__/stage34-pins.spec.js`.

**Read §1 and §6 first.** §1 is the only real evidence for the new field, and §6
is where I was wrong about my own work.

## 1. The cue verdict, measured both ways

The route call ranks picks AND now verdicts the keys the engine found, in the
same call — no new call, so no cost change. The override reads the VERDICT, not
the key. `verbHits` is deterministic from the text, so the engine computes its
own hits and asks about them.

Ten prompts, six where the override must survive (drawn from the corrections
measured below) and four traps:

| # | prompt | expected | result |
|---|---|---|---|
| 01 | "crushes the drowned against the stones" | keep | `brute-grappler ✓` kept |
| 02 | "charges down the chapel gate" | keep | `brute-charger ✓` kept |
| 03 | "guards the only bridge" | keep | `defender ✓`; "sergeant" refused as a job noun |
| 05 | "surfaces beneath a traveller" | keep | `lurker ✓` kept |
| 06 | "a giant crab that rules the tidepool" | keep (BODY key) | `brute-grappler ✓` kept |
| 07 | "**charges a fee** for every wagon" | REFUSE | `the call read "charges" as not meaning that mechanic here` |
| 09 | "**crushes his rivals in the courts of law**" | REFUSE | `the call read "crushes" as not meaning that mechanic here` |
| 10 | half-dragon duellist | REFUSE | dragon line refused by the existing deny |
| 08 | knight in a **winged helmet** | REFUSE | landed `defender`; the winged line never competed |
| 04 | battle-chaplain who **blesses** | keep (warpriest) | **MISS — see §3** |

**The verdict fired `false` exactly twice, on the two metaphors, and on none of
the six legitimate cases.** That is the whole claim for this field, and it is one
run of ten. It has not been measured across several runs per prompt, which is
what every other new field here has needed.

### Why this, and not a precedence flip

Measured before building anything: **497 overrides across 5097 saved blocks
(9.8%)**, and most read as corrections — `"crushes" -> grappler` x55,
`"charges" -> charger` x44, `"guards" -> defender` x35, `"crab" -> grappler` x14.
`"flies" -> skirmisher-winged` is 11 of them.

I first tried refusing the override whenever the call's pick carried a verified
quote. It fixed the berserker and **broke six pins** encoding earlier critic
reads: a glass ox that charges IS a charger, a BODY noun may win where a job noun
may not, the Headless Horseman's mounted seat, the caster/martial key gates. I
reverted rather than rewrite six pins to make my change pass.

The revert is what found the real shape: **the route call was being asked WHICH
LINE and never WHETHER THIS KEY MEANS ITS MECHANIC.** The verdict that answers
that already existed (`hint_verdicts: winged -> style ✗`) but came from the
identity call, after routing, and was read only by the name-canon stamp.

## 2. The flying berserker, fixed

`holds-2026-10-17T00-21-12` block 01, the owner's own example: *"a berserker who
flies into an unstoppable rage once per day when wounded"* now ships **`30 ft.`,
donor `brute-5`**, with Greataxe, Wounded Rage, Bloodied Frenzy and Rampage.

```
the call read "flies" as not meaning that mechanic here
Bloodvowed Hull stands: every key that would override it was read as a figure of speech
```

Before: `Fly 70 ft.`, DEX 20, donor `skirmisher-8-winged` at CR 8.

The other release conditions in the same run: Patient Defense LANDS (hold 2);
Assassinate + Evasion + Cunning Action all survive the trait ceiling; the troll
keeps Regeneration; Thurivald records its clauses.

## 3. Step 3 is ONE DOOR OF FOUR

The override now asks. Three line gates still refuse a line on a missing word,
before the cue question is reachable:

- **`MAGIC_WORD`** — block 04 is its reproducing prompt. *"a battle-chaplain who
  blesses the faithful before the charge"* traced
  `caster-warpriest: a caster line needs a magic word in the words — none here`,
  landed `skirmisher-3`, and then failed `attack-stat: Censer-Staff: +7 derives
  from DEX`. A word list refused the right line and the stat fault is downstream.
- **`ARCHER_NOUN`** — `skirmisher-archer` needs a bow noun.
- **`SWARM_WORDS`** — `swarm` needs a mass word.

Each is defended by a pin from an earlier critic read, which is why I have not
changed them: the precedence flip already taught me what rewriting six of those
costs. They are inventory section A entries and they need the owner's call.

## 4. The attack-stat family is routing, not arithmetic — three instances

The critic's hypothesis, tested:

| sheet | mechanism | symptom |
|---|---|---|
| berserker (stage34 block 07) | keyword override on "flies" | `Greataxe +8 derives from DEX` — **gone once the route was fixed** |
| druid (holds block 02) | line→donor mismatch: `caster-binder ✓` accepted, `skirmisher-3` landed | `Vine Staff +7 derives from DEX` |
| chaplain (cues block 04) | `MAGIC_WORD` refused the warpriest line | `Censer-Staff +7 derives from DEX` |

Three different routing mechanisms, one symptom. **I had filed the first as an
unrelated pre-existing family** on the strength of its frequency (12 of 188
runs, 7 of them the same "Mace derives from DEX").

## 5. Also landed since the gate-4 package

- **Hold 2 was three cap paths.** `e.rules` was in `evictForCap`'s never-evict
  list, so `Fleet Agility` — the brief's own example of chassis filler — was
  protected and Patient Defense yielded. Fixing that exposed the **trait
  ceiling**, which evicted a rogue's OWED Assassinate for a signature, because a
  kit row carries a template id too. `classes.spec.js` caught both of my wrong
  attempts.
- **Coverage's input was missing on every 2014 sheet.** `convertEdition` returns
  a fresh object and `generation` was not carried across, so coverage scored
  every 2014 block against an empty clause list. Kaelen and Thurivald were the
  only two 2014 blocks in the gate run and the only two with no clauses.
- **Defensive traits are priced**, sized from print: no-trait blocks read −0.60
  (the reader's baseline), Magic Resistance −1.07, Legendary Resistance −1.09.
  One rung on the defensive half brings each to the baseline; the DMG prices
  Magic Resistance at +2 effective AC and a rung is 2 AC. 187 → 176 soft band
  notes over 74 runs, **zero FAIL changed**.
- **Dame Oriel is shaped, not deleted.** `disadv-to-hit` is in 0 of 329 print
  blocks, so there is no price to calibrate. The guard stays and the AC drops to
  print's number for the CR; print bodies are exempt, because a print body's AC
  is print's own. A pin caught me overwriting the Gladiator's AC 16.
- **A rename may not re-weapon a row.** `audit rename: "Lance" -> "Oathspear"`
  shipped a lance's reach 10 and a range that is no spear's, under a name a GM
  reads as a spear. Blocked only when both names name real weapons and disagree.

## 6. Corrections to my own earlier claims

1. **"Both calls were right and the table overruled both"** — half wrong. The
   identity call answered `themes=aerial` because the prompt told it to: *"The
   identity IS that chassis embodied"*, handed a chassis named `skirmisher-winged`.
   Measured: `aerial 0/5` without the line, **`5/5` with it**. One parameter.
2. **"The classifier is nondeterministic"** — it is 5/5 stable asked cleanly. I
   was comparing two runs whose prompts differed.
3. **"The archetype primes it"** — flatly wrong. `skirmisher` gives `aerial 0/5`,
   identical to `brute`. The channel was `line`.
4. **"No prompt work could have prevented this"** — wrong; see 1.
5. **"The table decides before the call is asked"** — wrong. The route call runs
   first and IS overruled. I had read one trace line carrying both events as one.
6. **"Identical verdicts, 0 FP and 0 FN introduced"** for the dangling-ref regex
   tightening — scoped to 12 runs and written as if settled. On the full 74-run
   list it was carrying **3 false `dangling-ref` failures**: bounding the capture
   to capitalised words made `"a use of Vow of Silence"` capture `"Vow"`, which
   matches no row. Fixed, and pinned in both directions.
7. **The `attack-stat` family** — see §4.
8. I reported the Dame Oriel gate as working on the strength of a trace line that
   fired. The trait shipped anyway on two of three blocks: the trace said the gate
   ran, not that the row was gone.
9. I reported "precedence flipped" and launched three batches on a **dead edit** —
   `quotedPick` was declared and read but never assigned, because I asserted on
   one substitution and not the other.

## 7. Known and not fixed

- step 3's other three doors (§3)
- `engine-needs-key` on a grapple row with no key in the words — the same family
- `alignment-fit`: Unaligned on a Monstrosity with INT 12
- `print-range`: `Hurlblade`, a melee weapon on a ranged-only row
- the re-roll path skipping main-path rules (critic's §5, untouched)
- Mira's Cutpurse's Finisher priced as if its Incapacitated precondition held
- `lurker-5` under print's CR 5 HP band in 4 of 4 runs (owner's parked question 1)
- three word rules I added before the ruling arrived (`soloLen: 5`,
  `SAYS_WHEN`/`SAYS_OFTEN`, the darkvision `gmSaid`) — listed in
  `plans/stage4b-inventory.md` §C, pending the owner's call

---

# 2024 blocks

## Review batch — cues-2026-10-17T00-36-41

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Troll | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Chapel-Glass Ox | 5 | 2024 | brute-5-charger | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Bridge Warden | 4 | 2024 | defender-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Sanctified Charger | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 1/5 |
| Dune Grasper | 7 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 1/2 | 2/5 |
| Tidepool Grasper | 3 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Tallyman | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/5 |
| Oathbound Sentinel | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Marquis Corvane | 4 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Sire Vaelros | 7 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: print-range | FAIL (1) | 0/1 | 3/5 |

**Dropped 4 of 12 user clauses** (coverage 67%); concept share 47% (22/47 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- lurker-5 / reader: 1
- skirmisher-3 / reader: 1



---


### Tidepool Grasper — lowest CR

**Concept:** a giant crab that rules the tidepool shallows

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tidepool Grasper | 3 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (1 × Claw); nova none; dmg 24

```
Tidepool Grasper

Medium Beast, Unaligned

AC 12
Initiative +1 (11)

HP 67 (15d8)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
1
-5
-5
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
11
+0
+0
CHA
3
-4
-4

Skills Athletics +5, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages None

CR 3 (XP 700; PB +2)

Traits

Amphibious. The grasper can breathe air and water.

Actions

Claw. Melee Attack Roll: +5, reach 5 ft. 24 (6d6 + 3) Slashing damage. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the grasper. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws.

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

- Actions/Claw — binds the GM's words: drag+drags
- Traits/Amphibious — print's own row

**Engine trace**

```
[route] brute-grappler type=Beast mechanics=grapple, engulf — brute-grappler: ✓ ("a giant crab that rules the tidepool sha") | brute-grappler: key "crab" (class body)
[concept] name: provided_name rejected — "giant crab that rules the tidepool shall…" is the description, not a name
[concept] resolve: archetype=brute type=Beast themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: tidepool ambusher [behavior] | crushing claws [body] | chitinous armor [body]
[concept] identity: The giant crab emerges from the deepest tidepool, its chitinous bulk blocking the sun as it snatches its prey in one massive claw. Every round it tries to crush and hold its victim, dragging them toward its snapping mouthparts while ignoring lighter attacks. It fights to the death in defense of its pool, but will retreat into the water if badly wounded.
[concept] lore: A patient ambusher grown fat on a decade of drowned sailors and careless fishermen, it claims the tidepool shallows as its personal larder and will not surrender them while life remains.
[reskin] print canon route: the Giant Crab's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 16, DEX 13, CON 11, INT 1, WIS 9, CHA 3 — the Giant Crab's, STR fitted to +5
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "a giant crab that rules the tidepool shallows" heads on the Giant Crab — print's rows ride along; the seat stays
[reskin] inline declared: "the grasper" — the call's own answer (kind), built from the name
[reskin] inline form: "the grasper" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a giant crab" -> has (descriptive), head | "rules the tidepool shallows" -> has (descriptive)
[reskin] signature idea (action): "The Grasper lunges with a crushing claw, snapping shut on one target it can reach. A creature caught is pinned in place and dragged bodily toward the Grasper's grinding mouthparts, so it cannot wriggle free while the crab holds it and is drawn closer each moment the grip lasts. The hold can be broken only by tearing the victim free with raw strength." [action/save/condition] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — shell-withdraw (crab)
[reskin] signature rider: hook-rider -> Claw (appended; the Grasper's claw snaps shut on one target and drags it bodily toward the mouth [verb: drag:idea, drags:idea])
[reskin] signature idea (trait): "The Grasper's shell is thick and armor-plated; blows from light weapons glance off it, and whenever an attacker strikes the crab with a light, finesse, or ranged weapon, the impact shudders up their arm and leaves them briefly staggered." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (shallows)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for shallows, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The Grasper's shell is thick and armor-plated; blows from light weapons glance off it, and whenever an attacker strikes the crab with a light, finesse, or ranged weapon, the impact shudders up their arm and leaves them briefly staggered." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Claw = none
[reskin] print canon size: Large -> Medium — the Giant Crab's
[reskin] print canon type: Beast stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] attack name by anatomy: "Claw" -> "Claw" — claw deals Slashing, not Bludgeoning
[reskin] languages held: None stands — INT 1 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Amphibious — "a giant crab that rules the tidepool shallows" is the Giant Crab (print's own row)
[reskin] escape dc: Claw → DC 13 (8 + PB + STR; a late row wore another number)
```


---


### Sire Vaelros — highest CR

**Concept:** a half-dragon duellist who fights with two curved blades

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sire Vaelros | 7 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: print-range |

- reader · fail · print-range: Actions/Hurlblade: a melee weapon on a ranged-only row
- **dropped clause:** "fights with two curved blades"
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Sweeping Blades); nova none; dmg 52

```
Sire Vaelros

Medium Monstrosity, Neutral

AC 16
Initiative +3 (13)

HP 117 (18d8 + 36)

Speed 50 ft.

MOD
SAVE
STR
18
+4
+4
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+6
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
8
-1
-1

Skills Perception +4, Stealth +6

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Vaelros makes two attacks, using Sweeping Blades or Hurlblade in any combination.

Sweeping Blades. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Hurlblade. Ranged Attack Roll: +7, range 20/60 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Fleet Agility. Vaelros takes the Dash or Disengage action.

Momentum Slash (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Vaelros moves up to half its Speed without provoking Opportunity Attacks, and it makes one Sweeping Blades attack.

Reactions

Riposte. Trigger: A creature within 5 feet of Vaelros misses it with a melee attack roll. Response: Vaelros makes one Sweeping Blades attack against that creature.

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
- Actions/Sweeping Blades — weapon scimitar
- Actions/Hurlblade — weapon scimitar
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Momentum Slash — library seed rampage
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "duellist"

**Engine trace**

```
[route] skirmisher type=Monstrosity mechanics=breath — skirmisher: ✓ ("fights with two curved blades") | skirmisher: no line key in the words — the model's read of its quote
[concept] hints: dragon→body ✓ ("half-dragon duellist with two curved bla")
[concept] resolve: archetype=skirmisher type=Monstrosity themes=draconic/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: twin curved blades [object] | half-dragon duelist's mobility [body] | toying, hit-and-run swordplay [behavior]
[concept] identity: The half-dragon opens by taking the high ground or circling at a sprint, then commits to a whirling two-blade exchange, peeling away after each pass to reset the angle. It fights with a duelist's patience, parrying and repositioning rather than tanking, and it toys with slower prey until bloodied — at which point it breaks off only to return on its own terms.
[concept] lore: Born of a dragon's vanity and a mortal duelist's ambition, it haunts the old dueling terraces seeking opponents who can make it feel alive.
[reskin] donor: skirmisher-3 -> CR 7
[reskin] species kit: dragonborn — "a half-dragon duellist": header lines only; darkvision 60 ft.; resistance Fire
[reskin] implied class kept: "fighter" on the GM's own words "duellist" — the key table found none
[reskin] row evicted for the cap: Traits/"Whirlwind Step" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "duellist": Riposte (riposte)
[reskin] inline declared: "Vaelros" — the call's own answer (person), built from the name
[reskin] inline form: "Vaelros" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] clauses: "a half-dragon duellist" -> has (descriptive), head | "fights with two curved blades" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vaelros starts every exchange by testing his opponent: the first time each round he lands a blade on a creature that has not yet hit him this fight, the strike does not cut deep — instead it rings off the enemy's guard and the shock steals their momentum, leaving them flat-footed and clumsy until the end of their next turn while Vaelros circles to a new angle. Those who have already drawn his bloo" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot)
[reskin] word match declined by the call: disarm, charge, charge-push, pounce, stunning-strike, bolt-mark, isolation, hook-rider, contagion, affliction — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Vaelros starts every exchange by testing his opponent: the first time each round he lands a blade on a creature that has not yet hit him this fight, the strike does not cut deep — instead it rings off the enemy's guard and the shock steals their momentum, leaving them flat-footed and clumsy until the end of their next turn while Vaelros circles to a new angle. Those who have already drawn his bloo" [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, disarm)
[reskin] fallback respects the call: disarm left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: gaze-single (EV 3.4 vs 13)
[reskin] fallback skipped by the floor: sensory-strike (EV 3.4 vs 13)
[reskin] value check: "Rampage (1/Day)" EV 21.1 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The two curved blades are one weapon in his hands: when he makes two attacks in the same turn, the second follows through the first blade's line, opening a wound the first only tested — any creature hit by both attacks in one turn takes an extra gash that worsens until it is treated, and creatures already bleeding from that gash are easier for Vaelros to read, letting him slip past their guard." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, guarded-stance, assassinate, marking-light, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The two curved blades are one weapon in his hands: when he makes two attacks in the same turn, the second follows through the first blade's line, opening a wound the first only tested — any creature hit by both attacks in one turn takes an extra gash that worsens until it is treated, and creatures already bleeding from that gash are easier for Vaelros to read, letting him slip past their guard." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Sweeping Blades = scimitar; Hurlblade = scimitar
[reskin] weapon declared: "Sweeping Blades" is a scimitar — the call's own answer (the name alone read longsword)
[reskin] weapon declared: "Hurlblade" is a scimitar — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Hurlblade" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] audit rename: "Rampage (1/Day)" -> "Momentum Slash (1/Day)"
[reskin] species kit: resistance Fire — the dragonborn's
```


---


### Bog Troll — a 2024 sheet

**Concept:** a bog troll that crushes the drowned against the stones

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Troll | 6 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Rend: a Restrained rider on every hit with no save
- **dropped clause:** "crushes the drowned against the stones"
- read: def 4 / off 6 → 5; sustained 44 (2 × Rend); nova none; dmg 44

```
Bog Troll

Large Giant, Chaotic Evil

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+5
CHA
7
-2
-2

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The bog troll regains 15 Hit Points at the start of each of its turns. If the bog troll takes Acid or Fire damage, this trait doesn't function on the bog troll's next turn. The bog troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the bog troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the bog troll's limbs is severed, falls into the bog troll's space, and becomes a Troll Limb. The limb acts immediately after the bog troll's turn. The bog troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The bog troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage. While Grappled, the target has the Restrained condition.

Bonus Actions

Answering Sting. One creature within 5 feet that hit the bog troll with an attack roll since the end of the bog troll's last turn takes 7 (2d6) Bludgeoning damage.

Charge. The bog troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Rend — print's row, renamed
- Bonus Actions/Answering Sting — library seed own-turn-punisher
- Bonus Actions/Charge — print's own row
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row

**Engine trace**

```
[route] brute-grappler type=Giant mechanics=grapple, engulf — brute-grappler: ✓ ("crushes the drowned against the stones") | brute-grappler: key "crushes" (class verb)
[concept] name: provided_name rejected — "a bog troll that crushes the drowned aga…" is the description, not a name
[concept] hints: grappler→style ✓ ("crushes the drowned against stones") | troll→canon ✓ ("a bog troll (canon troll)")
[concept] resolve: archetype=brute type=Giant themes=grave/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: crushing drowned prey against stones [behavior] | bog-drowned amphibious giant [body] | submerged stone crushing ground [object]
[concept] identity: The bog troll opens by ambushing from the mire, seizing prey in a bone-crushing grip before it can flee. Every round it drags its catch toward a submerged stone and slams it down with bone-shattering force, pinning corpses in the rot. Under pressure it fights to the death, never fleeing, driven by a dim need to feed the bog.
[concept] lore: Born from the drowned dead of a cursed swamp, the bog troll seeks only to add more bodies to its grisly collection beneath the stones.
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] donor: brute-5-grappler -> CR 6
[reskin] print canon: "a bog troll that crushes the drowned against the stones" heads on the Troll — print's rows ride along; the seat stays
[reskin] engulf engine: Entomb — the body's own verb
[reskin] inline by rule: "the bog troll" — the call answered "the bog troll" (kind), which the name does not support
[reskin] inline form: "the bog troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a bog troll" -> has (descriptive), head | "crushes the drowned against the stones" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The bog troll drives its grappled victim straight down into the submerged stone, crushing bones against it like a millstone. When it has a creature grappled or entombed, it can slam that captive into the rock, and the impact leaves the victim broken and moving sluggishly on the troll's next turn." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, pull-through, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — condition-payoff, pull-through (crush, drown)
[reskin] word match declined by the call: condition-payoff, pull-through, exploiter, hook-drag, push-prone, herd, stunning-strike, charge-push, hook-rider — the key word does not mean the mechanic here
[reskin] signature miss: action — "The bog troll drives its grappled victim straight down into the submerged stone, crushing bones against it like a millstone. When it has a creature grappled or entombed, it can slam that captive into the rock, and the impact leaves the victim broken and moving sluggishly on the troll's next turn." [rider/on_hit/damage] — the model picked "pounce" (no verb, and it quotes nothing the GM typed) over a concept-verb template (condition-payoff, pull-through)
[reskin] fallback respects the call: condition-payoff, pull-through, push-prone, herd, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a bog troll that crushes the drowned against the stones" heads on the Troll and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bog troll is a drowned thing itself, so the mire clings to its wounds and mends them. Whenever it is standing in bog, marsh, or water, the swamp fouls attacks against it and the cold wet of its body knits its flesh shut at the start of its turn." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk, false-appearance (bog, stone)
[reskin] word match declined by the call: terrain-walk, false-appearance, noxious-aura, bloodied-fury, bloodied-burst, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for bog, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The bog troll is a drowned thing itself, so the mire clings to its wounds and mends them. Whenever it is standing in bog, marsh, or water, the swamp fouls attacks against it and the cold wet of its body knits its flesh shut at the start of its turn." [trait/always/defense] — the model found no template that holds it (offered: terrain-walk, false-appearance, adhesive, phobia, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, warded-mending)
[reskin] repair: 1 clause(s) with no row — "crushes the drowned against the stones"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Slam = none
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon attack: "Slam" -> "Rend" — the Troll's own row
[reskin] print canon rows: Crush the Drowned leave — the Troll has one melee row (Rend), and Multiattack reads print's
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] print canon trait: Loathsome Limbs — "a bog troll that crushes the drowned against the stones" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Entomb" yields to the Troll's Charge
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---


### Chapel-Glass Ox — a homebrew with a nova

**Concept:** a glass ox that charges down the chapel gate

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chapel-Glass Ox | 5 | brute-5-charger | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 22 (1 × Horns); nova Shatter Spray 28; dmg 33

```
Chapel-Glass Ox

Large Construct, Unaligned

AC 14
Initiative +0 (10)

HP 102 (12d10 + 36)

Speed 40 ft.

MOD
SAVE
STR
16
+3
+6
INT
4
-3
-3
MOD
SAVE
DEX
10
+0
+0
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
4
-3
-3

Skills Athletics +6, Perception +4

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Fracture Storm. The first time the chapel-glass ox is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the chapel-glass ox. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn.

Actions

Horns. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 10 (3d6) Thunder damage. If the target is a Large or smaller creature and the chapel-glass ox moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

Shatter Spray (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: 28 (8d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Gatebreak Shockwave. Strength Saving Throw: DC 14, one creature within 30 feet that is Deafened. Failure: 19 (3d12) Thunder damage. Success: Half damage.

Bonus Actions

Trample. Dexterity Saving Throw: DC 14, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

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

- Actions/Horns — the chassis
- Actions/Shatter Spray — the chassis
- Actions/Gatebreak Shockwave — template exploiter; library draw (seed unstamped); binds the GM's words: downed+caught
- Bonus Actions/Trample — the chassis
- Traits/Fracture Storm — template bloodied-burst; library draw (seed unstamped); binds the GM's words: ring+crack+shatter

**Engine trace**

```
[route] brute-charger type=Construct mechanics=none — brute-charger: ✓ ("a glass ox that charges down the chapel ") | brute-charger: key "charges" (class verb)
[concept] hints: charger→style ✓ ("the creature charges down the chapel gat")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=charger energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: straight-line charge that shatters guards and gates [behavior] | body of fused, brittle glass [body] | trampling and goring the prone [behavior]
[concept] identity: The glass ox is a construct of fused, near-unbreakable glass shaped like a massive bull, and its only purpose is to smash through thresholds — it lowers its head and charges in a straight line, gaining terrible momentum before shattering the gate (and anyone in its path) at the point of impact. It repeats this loop without fear or strategy, goring and trampling the fallen, and fights until destroyed; it never flees and shows no anger, only relentless forward pressure.
[concept] lore: Kiln-forged by a forgotten chapel order as a living reliquary of glass, the ox was sealed behind the very gate it now smashes, driven to escape and shatter every barrier that holds it.
[reskin] nova capped: "Area Breath Attack" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] donor: brute-5-charger -> CR 5
[reskin] inline by rule: "the chapel-glass ox" — the call answered "the glass ox" (kind), which the name does not support
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a glass ox" -> has (descriptive), head | "charges down the chapel gate" -> has (mechanical)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The chapel-glass ox slams its fused-glass skull into the ground at the end of a charge, and the shockwave ripples outward in a wide ring. Every other creature caught in that ring is shoved away and thrown off balance, leaving them sitting ducks for the horns or a trampling." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, hook-rider (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — exploiter (downed)
[reskin] value check: "Gatebreak Shockwave" EV 14.7 vs floor 12.5 (one attack of 1) — worth the trade
[reskin] signature template: exploiter -> Actions/"Gatebreak Shockwave" ("the slam's shockwave shoves every other creature in the ring away and throws the [verb: downed:concept, caught:idea]")
[reskin] keys spent by the action: downed
[reskin] signature idea (trait): "Its body is never whole — hairline cracks and stress-fractures run through the fused glass, and every time it is struck they widen with a silvery ringing chime. When the fractures finally reach the breaking point, it shatters into a spinning storm of glass shards that tears through everyone nearby, then the pieces slam back together and the ox charges on." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body (glass)
[reskin] word match declined by the call: resonant-body, heated-body, aberrant-ground, death-burst — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Fracture Storm" ("the ox's fractures widen as it is struck until it shatters into a storm of glass [verb: ring:idea, crack:idea, shatter:idea]")
[reskin] weapons answered: Horns = none; Shatter Spray = none; Relentless Charge = none
[reskin] chassis nova: "Shatter Spray (Recharge 5-6)" — the brute-5-charger's own nova row (its "Area Breath Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] defenses by material: a glass body is vulnerable to Thunder and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
```


---


### Bridge Warden — one marked soft

**Concept:** a gate sergeant who guards the only bridge into the city

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bridge Warden | 4 | defender-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.25 (print at 4 reads 1–6, n=66)
- read: def 1/2 / off 4 → 2.25; sustained 26 (2 × Shield Boss); nova none; dmg 26

```
Bridge Warden

Medium Humanoid, Lawful Neutral

AC 14
Initiative +0 (10)

HP 65 (10d8 + 20)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +6, Perception +3

Senses Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Guarded Stance. While the warden isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. The warden makes two attacks, using Shield Boss or Javelin in any combination.

Shield Boss. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Javelin. Ranged Attack Roll: +6, range 30/120 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Shield Retort. One creature within 5 feet that hit the warden with an attack roll since the end of the warden's last turn takes 6 (1d12) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the warden misses it with a melee attack roll. Response: The warden makes one Shield Boss attack against that creature.

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

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "guards the only bridge into the city"
- Actions/Multiattack — the chassis
- Actions/Shield Boss — the chassis
- Actions/Javelin — weapon javelin
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "gate sergeant"
- Bonus Actions/Shield Retort — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("guards the only bridge into the city") | defender-leader: "sergeant" is a noun (a title), not a verb — no override | defender: key "guards the" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bridge-guard duty [behavior] | iron-banded shield [object] | immovable stance [aura]
[concept] identity: The gate sergeant plants its shield at the bridge's mouth and does not move: it opens by slamming the shield boss into the first comer, then holds the line, using its iron-banded shield to shove and pin anyone who tries to slip past. It fights to the death with the flat calm of a soldier who has already decided the bridge is the only thing that matters, and it punishes any attempt to flank or bypass it with a short, brutal shield-bash and a command to fall back.
[concept] lore: A veteran of the city's outer watch, it has stood this bridge so long that the stone under its boots has worn to the shape of its stance, and it wants nothing more than to die before it lets a single unauthorized soul cross.
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] implied class kept: "fighter" on the GM's own words "gate sergeant" — the key table found none
[reskin] class kit: fighter — "gate sergeant": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a gate sergeant" -> has (descriptive), head | "guards the only bridge into the city" -> has (descriptive)
[reskin] signature idea (action): "The warden slams its iron-banded shield into an enemy in front of it, then plants its feet and refuses to yield ground. Anyone caught by the slam is shoved back and pinned in place at the bridge's mouth, unable to advance past the warden until it chooses to release them or they break free with raw strength." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot)
[reskin] value check: "Sundering Shove" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: push-prone (EV 1.9 vs 7.3)
[reskin] fallback skipped by the floor: herd (EV 5.5 vs 23.7)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The warden's iron-banded shield is a wall of its own: while it is standing in a chokepoint, anyone trying to slip past it or flank it finds the shield already there, and the attempt costs them dearly. The shield denies the easy path and turns every sidestep into a mistake." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bound (guards the)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bound, which the GM's words keyed
[reskin] key match declined: trait — "bound" was ranked first on the call's own menu for guards the, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The warden's iron-banded shield is a wall of its own: while it is standing in a chokepoint, anyone trying to slip past it or flank it finds the shield already there, and the attempt costs them dearly. The shield denies the easy path and turns every sidestep into a mistake." [trait/always/defense] — the model found no template that holds it (offered: bound, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] concept-first trait skipped: bound — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Shield Boss = shield; Javelin = javelin; Hold the Line = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] AC lowered for a disadvantage trait: "Guarded Stance" makes this creature harder to hit, so its AC comes down to print's 14 at CR 4 (was 19) — print ships no persistent Disadvantage-to-be-hit trait (0 of 329), and the two together read as a trap
[reskin] audit rename: "Answering Sting" -> "Shield Retort"
```


---


### Sanctified Charger — in the run

**Concept:** a battle-chaplain who blesses the faithful before the charge

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sanctified Charger | 6 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Censer-Staff: +7 derives from DEX, but an attack row rolls STR
- **dropped clause:** "blesses the faithful before the charge"
- read: def 4 / off 6 → 5; sustained 44 (2 × Censer-Staff); nova none; dmg 44

```
Sanctified Charger

Medium Humanoid, Neutral Good

AC 16
Initiative +4 (14)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+7
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
8
-1
-1

Skills Perception +4, Stealth +7

Senses Passive Perception 14

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Faithful Step. The charger ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The charger makes two attacks, using Censer-Staff or Censer in any combination.

Censer-Staff. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Censer. Ranged Attack Roll: +7, range 20/60 ft. 17 (3d8 + 4) Bludgeoning damage.

Bonus Actions

Fleet Agility. The charger takes the Dash or Disengage action.

Lay on Hands (2/Day). The charger touches a creature within 5 feet of itself and restores 21 (6d6) Hit Points to it.

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

- Traits/Faithful Step — the chassis
- Actions/Multiattack — the chassis
- Actions/Censer-Staff — the chassis
- Actions/Censer — the chassis
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Lay on Hands — library seed lay-on-hands; binds the GM's words: blessing

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to skirmisher's plain line | skirmisher: no line key in the words — the model's read of its quote
[concept] hints: charger→style ✓ ("before the charge") | warpriest→style ✓ ("blesses the faithful")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/voice mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: blessing the faithful before the charge [behavior] | martial weapon and armor [object] | inspiring presence [aura]
[concept] identity: The battle-chaplain advances with the line, then uses pack tactics to dart in and out of melee, blessing the faithful before each charge. In combat it alternates between a rousing war-blessing and swift, punishing strikes against those who break rank. Under pressure it does not flee; it rallies its allies with a final, desperate benediction and fights to the last breath.
[concept] lore: A veteran of a hundred holy wars, the battle-chaplain seeks to sanctify the battlefield by leading the faithful in one last, glorious charge.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 6
[reskin] name_element answered: Sanctified = imagery
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a battle-chaplain": nothing to add — the sheet already answers it
[reskin] inline declared: "the charger" — the call's own answer (kind), built from the name; the rules would have said "Charger"
[reskin] inline on kit rows: "Charger" -> "the charger"
[reskin] inline form: "the charger" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a battle-chaplain" -> has (descriptive), head | "blesses the faithful before the charge" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The charger raises its censer and bellows a benediction that sharpens the aim and resolve of every ally within sight of it. This blessing lasts as long as the charger keeps fighting, and it fades from any ally who retreats out of its presence." [action/always/resource] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] word match declined by the call: rally, focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for blessing+bless, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The charger raises its censer and bellows a benediction that sharpens the aim and resolve of every ally within sight of it. This blessing lasts as long as the charger keeps fighting, and it fades from any ally who retreats out of its presence." [action/always/resource] — the model found no template that holds it (offered: rally, trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, focus)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] value check: "Lay on Hands (2/Day)" EV 11.6 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: lay-on-hands -> Bonus Actions/"Lay on Hands (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Once the charger has blessed its allies, it can carry that same hallowed force into its own blows for a short time; each strike that lands then also staggers the enemy." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Once the charger has blessed its allies, it can carry that same hallowed force into its own blows for a short time; each strike that lands then also staggers the enemy." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Censor = none; Censer = none
[reskin] weapon table: "Censer" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Censor" -> "Censer-Staff"
[reskin] audit rename blocked — "Sacred Anointment" claims an element "Lay on Hands (2/Day)" does not pay (no damage)
```


---


### Dune Grasper — in the run

**Concept:** a sand-lurker that surfaces beneath a traveller and drags them under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dune Grasper | 7 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit |

- reader · fail · alignment-fit: Unaligned on a Monstrosity with INT 12 that speaks None — Unaligned is for a creature with no capacity for ethics
- **dropped clause:** "drags them under"
- read: def 4 / off 8 → 6; sustained 52 (2 × Claw); nova none; dmg 52

```
Dune Grasper

Large Monstrosity, Unaligned

AC 15
Initiative +4 (14)

HP 105 (14d10 + 28)

Speed 40 ft., Burrow 30 ft.

MOD
SAVE
STR
12
+1
+1
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
13
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +10

Senses tremorsense 60 ft., darkvision 30 ft.; Passive Perception 14

Languages None

CR 7 (XP 2,900; PB +3)

Traits

Sand-Strider Hide. Difficult Terrain composed of sand doesn't cost the grasper extra movement, and the grasper can move across sand without needing to make an ability check.

Assassinate. During the first round of each combat, the grasper has Advantage on attack rolls against any creature that hasn't taken a turn. If the grasper hits a creature during that round, the target takes an extra 13 (3d8) Slashing damage.

Actions

Multiattack. The grasper makes two Claw attacks. It can replace one attack with a use of Sand-Siphon.

Claw. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Sand-Siphon. Constitution Saving Throw: DC 15, one creature within 30 feet. Failure: 24 (7d6) Necrotic damage, and the grasper regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the grasper takes the Hide action.

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
- Actions/Claw — the chassis
- Actions/Sand-Siphon — library seed drain
- Bonus Actions/Umbral Step — the chassis
- Traits/Sand-Strider Hide — template terrain-walk; library draw (seed unstamped); binds the GM's words: sand+never slows
- Traits/Assassinate — template assassinate; library draw (seed unstamped)

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=grapple — lurker: ✓ ("surfaces beneath a traveller and drags t") | lurker: key "surfaces beneath" (class verb)
[concept] hints: engulf→mechanics ✓ ("seizes and holds")
[concept] resolve: archetype=lurker type=Monstrosity themes=subterranean/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: ambush from beneath the sand [behavior] | drags prey under [behavior] | stone-hard hide [body]
[concept] identity: The sand-lurker waits beneath the dunes for the weight of a traveler, then erupts from directly below and drags the victim down into the shifting sand. Once it has prey, it clamps and burrows, pulling the victim under the surface to suffocate in the grip of the sand. It is a patient, ambush predator that fights only to secure its meal and will retreat beneath the sand if the struggle becomes costly.
[concept] lore: Born in the deep desert where sand and stone meet, it survives by ambushing caravans and lone travelers, pulling them beneath the dunes to consume at leisure.
[reskin] donor: lurker-5 -> CR 7
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] inline declared: "the grasper" — the call's own answer (kind), built from the name
[reskin] inline form: "the grasper" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "drags them under" carries no trigger word, so the call's "on_hit" has no receipt in the GM's own clause
[reskin] clauses: "a sand-lurker" -> has (descriptive), head | "surfaces beneath a traveller" -> has (descriptive) | "drags them under" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The grasper waits hidden beneath the sand, and the moment it senses a creature's weight moving directly overhead it erupts from the ground in a surge of sand and stone, dragging that victim down into the collapsing grit with it. The grabbed traveler is hauled partway underground, held fast and unable to move away while the grasper clamps on, and the surrounding sand caves in around them so that on" [action/always/movement] — menu: swallow, gaze-single, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, burrow-ambush, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: leap, lure, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — burrow-ambush (beneath, sand, surface)
[reskin] word match declined by the call: burrow-ambush, hook-drag, obstacle-pull, ground-burst, sensory-strike, blighted-ground — the key word does not mean the mechanic here
[reskin] signature miss: action — "The grasper waits hidden beneath the sand, and the moment it senses a creature's weight moving directly overhead it erupts from the ground in a surge of sand and stone, dragging that victim down into the collapsing grit with it. The grabbed traveler is hauled partway underground, held fast and unable to move away while the grasper clamps on, and the surrounding sand caves in around them so that on" [action/always/movement] — the model picked "swallow" (no verb, and it quotes nothing the GM typed) over a concept-verb template (burrow-ambush, hook-drag, hook-rider, obstacle-pull, sensory-strike)
[reskin] fallback respects the call: burrow-ambush, hook-drag, obstacle-pull, sensory-strike left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 27.5 vs 42.3)
[reskin] value check: "Vitality Leech" EV 18.6 vs floor 13 (one attack of 2) — added Success: Half; dice 14 → 24
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is armored in pebbled plates of fused sand and desert stone, so sand, grit, or abrasive terrain never slows it and it flows through loose ground as easily as it walks. When the grasper is hit, fragments of that stone-hard hide spray outward, cutting and blinding whoever struck it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (sand)
[reskin] word match declined by the call: false-appearance, earth-glide, heated-body, absorption, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): terrain-walk -> Traits/"Sand-Strider Hide" ("Its sand-and-stone plating means sand, grit, or abrasive terrain never slows it; [verb: sand:concept, never slows:idea]")
[reskin] weapons answered: Claw = none
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
[reskin] audit rename: "Vitality Leech" -> "Sand-Siphon"
```


---


### Tallyman — in the run

**Concept:** a tollkeeper who charges a fee for every wagon and kills those who refuse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tallyman | 5 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Iron Mace); nova Toll Demanded 18; dmg 35

```
Tallyman

Medium Humanoid, Lawful Evil

AC 16
Initiative +2 (12)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
11
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
15
+2
+5

Skills Athletics +6, Persuasion +5

Senses Passive Perception 10

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The tallyman makes two attacks, using Iron Mace, Shortbow, or Fee for Every Wagon in any combination.

Iron Mace. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 16 (4d6 + 2) Piercing damage.

Toll Demanded (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the tallyman. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Fee for Every Wagon. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the tallyman misses it with a melee attack roll. Response: The tallyman makes one Iron Mace attack against that creature.

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
- Actions/Iron Mace — weapon mace
- Actions/Shortbow — weapon shortbow
- Actions/Toll Demanded — template active-toll; library draw (seed unstamped)
- Actions/Fee for Every Wagon — authored for this sheet; the GM's clause "charges a fee for every wagon"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "kills those who refuse"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("charges a fee for every wagon and kills ") | brute-charger: the call read "charges" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: charger→style ✗ ("charges a fee, not a charger")
[concept] resolve: archetype=defender type=Humanoid themes=armed/fiendish mind=sapient style=leader energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: demands a toll from every wagon [behavior] | kills those who refuse to pay [behavior] | heavy iron mace and shield [object]
[concept] identity: The Tollkeeper opens with a demand for payment, and if refused, closes to melee with a heavy iron mace and a shield, parrying blows while it barks orders at its levied guards. Each round it alternates between a crushing strike and a command that lets an ally attack as a reaction, fighting methodically and without mercy; it never flees, extracting its fee in blood if coin is denied.
[concept] lore: Once a minor customs official, the Tollkeeper sold its soul to a devil of contracts and now patrols a lonely bridge, bound to collect a toll in coin or corpses from every wagon that crosses.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 5
[reskin] implied class kept: "fighter" on the GM's own words "kills those who refuse" — the key table found none
[reskin] row evicted for the cap: Traits/"Aura of Authority" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "kills those who refuse": Riposte (riposte)
[reskin] inline declared: "the tallyman" — the call's own answer (kind), built from the name; the rules would have said "Tallyman"
[reskin] inline form: "the tallyman" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tollkeeper" -> has (descriptive), head | "charges a fee for every wagon" -> has (mechanical) | "kills those who refuse" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The tallyman plants its shield and names its price out loud, demanding coin from every foe that can hear it. Anyone who refuses to pay at that instant is marked as a debtor — the tallyman's blows against a marked debtor land heavier, and a debtor who strikes the tallyman feels the weight of the unpaid fee sharpened back onto itself. The mark persists until the tallyman collects, either in coin or " [action/save/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: curse-debt, aggro-curse, herd, disarm, obstacle-pull, seal — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "active-toll" has no key-table verb, but the call quotes "a tollkeeper who charges a fee for every wagon and kills those who refuse" from the description
[reskin] value check: "Toll Demanded (Recharge 5-6)" EV 47.7 vs floor 30.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Toll Demanded (Recharge 5-6)" ("the tallyman plants its shield, names its price out loud, and demands coin from  [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The tallyman's shield is also its ledger. Whenever it blocks a blow with that shield, it carves a tally into the iron — and every tally made against an attacker sharpens the mace for the toll the attacker still owes." [trait/on_being_hit/resource] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The tallyman's shield is also its ledger. Whenever it blocks a blow with that shield, it carves a tally into the iron — and every tally made against an attacker sharpens the mace for the toll the attacker still owes." [trait/on_being_hit/resource] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] repair: 1 clause(s) with no row — "charges a fee for every wagon"; one targeted call with the sheet as context
[reskin] repaired sheet: 3 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Iron Mace = mace; Shortbow = shortbow
[reskin] weapon table: "Shortbow" rolls Dexterity — +6 → +5
[reskin] weapon table: "Shortbow" damage off Dexterity — 17 (4d6 + 3) → 16 (4d6 + 2)
[reskin] weapon table: "Shortbow" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack normalised: "The tallyman makes two attacks, using Iron Mace, Shortbow, or Fee for Every Wagon in any com"
```


---


### Oathbound Sentinel — in the run

**Concept:** a knight in a winged helmet who never leaves the bridge

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Sentinel | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Spear); nova none; dmg 44

```
Oathbound Sentinel

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

Traits

Sworn Bridge. The sentinel is bound to the bridge. It can't willingly move more than 120 feet from the bridge, and it always knows the direction and distance to the bridge.

Actions

Multiattack. The sentinel makes two attacks, using Spear or Thrown Spear in any combination.

Spear. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.

Thrown Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Oath's Rebuke. One creature within 5 feet that hit the sentinel with an attack roll since the end of the sentinel's last turn takes 7 (2d6) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the sentinel misses it with a melee attack roll. Response: The sentinel makes one Spear attack against that creature.

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

- Traits/Sworn Bridge — template bound; library draw (seed unstamped); the GM's clause "never leaves the bridge"; binds the GM's words: never leaves
- Actions/Multiattack — the chassis
- Actions/Spear — weapon spear
- Actions/Thrown Spear — weapon spear
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a knight in a winged helmet"
- Bonus Actions/Oath's Rebuke — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("never leaves the bridge") | defender: key "knight" (class verb)
[concept] hints: winged→style ✗ ("a winged helmet is not a flyer")
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: never leaves the bridge [behavior] | winged helmet [body] | iron armor and shield [body]
[concept] identity: The Winged Knight holds the bridge by iron oath and iron arm, opening with a leveled spear and a shield-bash that shoves the first challenger back. Every round it anchors the span, punishing any who try to slip past with an opportunity attack, and it fights to the death rather than cede one inch of stone — retreat is not in its vocabulary.
[concept] lore: Sworn to a drowned border-crossing by a dead king, the Winged Knight has stood so long that moss grows on its greaves and travelers mistake it for statuary — but it still demands the toll of a duel from all who seek the far bank.
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: fighter — "a knight in a winged helmet": Riposte (riposte)
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never leaves the bridge" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a knight in a winged helmet" -> has (descriptive), head | "never leaves the bridge" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "With a sudden step that carries the full weight of its oath, the sentinel slams its shield into a foe, not to wound, but to drive them back over the bridge's edge and into the chasm it guards. The target is flung backward along the span, forced to spend precious ground just to stay on the bridge." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] word match declined by the call: shield-bash — the key word does not mean the mechanic here
[reskin] value check: "Bridgeward Slam" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Bridgeward Slam" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: disarm (EV 0 vs 10.9)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] fallback skipped by the floor: herd (EV 8.2 vs 35.5)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The sentinel's winged helmet lets it hold a mental map of its sworn bridge: as long as it can see a creature that tries to slip past, it foresees the escape and can lash out before the creature gets away. This makes it nearly impossible to simply dash around the knight." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bound (never leaves)
[reskin] signature template (trait): bound -> Traits/"Sworn Bridge" ("the sentinel is sworn to its bridge and never leaves it — the bound anchor is ex [verb: never leaves:concept]")
[reskin] weapons answered: Spear = spear; Thrown Spear = spear; Shield Shove = shield
[reskin] weapon table: "Thrown Spear" — thrown, range 20/60
[reskin] row binds its clause: "Sworn Bridge" answers "never leaves the bridge" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Answering Sting" -> "Oath's Rebuke"
```


---


### Marquis Corvane — in the run

**Concept:** a merchant prince who crushes his rivals in the courts of law

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Marquis Corvane | 4 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Rapier); nova none; dmg 26

```
Marquis Corvane

Medium Humanoid, Lawful Neutral

AC 16
Initiative +2 (12)

HP 78 (12d8 + 24)

Speed 30 ft.

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
14
+2
+2
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+4
CHA
15
+2
+4

Skills Athletics +6, Persuasion +4

Senses Passive Perception 10

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Courts of Law. Corvane has Advantage on Charisma (Intimidation) checks made to browbeat a creature into submission or concession within a court of law, and when he succeeds on such a check against a creature, that creature is Frightened of him until the e.

Aura of Authority. While in a 10-foot Emanation originating from Corvane, Corvane and its allies have Advantage on attack rolls and saving throws, provided Corvane doesn't have the Incapacitated condition.

Actions

Multiattack. Corvane makes two attacks, using Rapier or Ledger-Shield in any combination.

Rapier. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Ledger-Shield. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Bonus Actions

Courtly Decree (2/Day). Each ally within 30 feet of Corvane gains 7 (2d6) Temporary Hit Points.

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

- Traits/Courts of Law — authored for this sheet; the GM's clause "crushes his rivals in the courts of law"
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Rapier — weapon rapier
- Actions/Ledger-Shield — the chassis
- Bonus Actions/Courtly Decree — library seed rally

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("crushes his rivals") | brute-grappler: the call read "crushes" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: grappler→style ✗ ("crushes his rivals in the courts of law")
[concept] resolve: archetype=defender type=Humanoid themes=armed/voice mind=sapient style=leader energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commanding a retinue of hired blades [behavior] | binding legal pronouncements that break a rival's will [behavior] | a merchant prince's iron-willed authority [aura]
[concept] identity: A sleek courtier-merchant who opens combat by stepping behind his hired bravos and pronouncing a lethal clause, letting his aura of authority stiffen every ally in earshot before he ever draws his own blade. Every round thereafter he fights as a duelist of leverage, parrying with a ledger-shield and directing one underling to strike where the law—and his rapier—will not protect. Under pressure he does not flee or rage; he bargains, repositions, and spends his retinue like coin, fighting to the death only when the verdict is already his.
[concept] lore: Born to a counting-house dynasty, he learned that a well-worded injunction cuts deeper than any sword and now buys mercenary captains, court clerks, and magistrates to turn every duel into a foreclosure.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 4
[reskin] inline declared: "Corvane" — the call's own answer (person), built from the name
[reskin] inline form: "Corvane" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a merchant prince" -> has (descriptive), head | "crushes his rivals in the courts of law" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Corvane snaps an order at one ally who can hear him, directing that ally to immediately strike at a target of Corvane's choosing. The commanded strike is made with Corvane's own ruthless precision, treating the ally's attack as if Corvane himself had swung the blade. He cannot command the same ally twice in a row, nor can he command an ally who is already acting on his orders." [action/once_per_fight/resource] — menu: throw-retrieve, seal, shield-bash, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] word match declined by the call: herd — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Corvane snaps an order at one ally who can hear him, directing that ally to immediately strike at a target of Corvane's choosing. The commanded strike is made with Corvane's own ruthless precision, treating the ally's attack as if Corvane himself had swung the blade. He cannot command the same ally twice in a row, nor can he command an ally who is already acting on his orders." [action/once_per_fight/resource] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 3.9 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Whenever a creature under Corvane's command damages a foe, Corvane may immediately shift his position up to his speed without provoking reprisal, stepping behind his retinue as they press the advantage. He uses this movement to slip out of reach and behind cover, letting his hired blades absorb the Enemy's attention while he repositions to issue his next decree." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever a creature under Corvane's command damages a foe, Corvane may immediately shift his position up to his speed without provoking reprisal, stepping behind his retinue as they press the advantage. He uses this movement to slip out of reach and behind cover, letting his hired blades absorb the Enemy's attention while he repositions to issue his next decree." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption)
[reskin] repair: 1 clause(s) with no row — "crushes his rivals in the courts of law"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Rapier = rapier; Ledger-Shield = shield used as a bludgeon; Foreclosure Clause = none
[reskin] languages by mind: "Common, plus two mercantile trade tongues" -> "Common" (sapient)
[reskin] audit rewrite blocked — "Crushes His Rivals in the Courts of Law" is engine-authored chassis text
[reskin] audit rename: "Crushes His Rivals in the Courts of Law" -> "Courts of Law"
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Courtly Decree (2/Day)"
[reskin] row narrowed: "Ledger-Shield" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---

## Review batch — holds-2026-10-17T00-21-12

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodvowed Hull | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Cairnroot Warden | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 3/3 |
| Silver-Veined Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Still-Water Palm | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Bloodcursed Colossus | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Ironbillet Veteran | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Slate Shadow | 5 | 2024 | skirmisher-3-skulker | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/6 |

**Dropped 0 of 8 user clauses** (coverage 100%); concept share 79% (31/39 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- skirmisher-3-skulker / derivation: 1



---


### Still-Water Palm — lowest CR

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Still-Water Palm | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Still-Water Palm

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 30 ft., Swim 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +6

Senses Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The palm can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the palm extra movement, and the palm can move across mud without needing to make an ability check.

Actions

Multiattack. The palm makes two attacks, using Open Palm or Marsh Bolt in any combination. It can replace one attack with a use of Stillwater Rebuke.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the palm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the palm's next turn.

Marsh Bolt. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Stillwater Rebuke. Strength Saving Throw: DC 13, one creature within 30 feet that is Stunned. Failure: 14 (4d6) Piercing damage. Success: Half damage.

Bonus Actions

Patient Defense. The palm takes the Dodge action.

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

- Traits/Hold Breath — lizardfolk kit; the GM's clause "a lizardfolk monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "a lizardfolk monk"
- Actions/Multiattack — the chassis
- Actions/Open Palm — a declared feature; the GM's clause "strikes pressure points with an open hand"
- Actions/Marsh Bolt — weapon crossbow
- Actions/Stillwater Rebuke — library seed exploiter
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "strikes pressure points with an open hand"

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/bestial mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pressure-point strikes with an open hand [behavior] | venomous lizardfolk body [body] | swamp skirmisher's hit-and-run [behavior]
[concept] identity: The lizardfolk monk drifts through the swamp muck with a skirmisher's patience, opening with a sudden burst of movement to slap a pressure point and leave a limb numb. Every round after, it darts in, strikes once with its open palm, and slips outside reach, letting the target's own numbed body betray it. Under pressure it becomes a hissing opportunist, fleeing bloodied into the reeds rather than trading blows it cannot win.
[concept] lore: A scale-cloaked ascetic of the deep fen, it seeks the hidden currents of every living body, believing that to still a foe's breath with one open hand is the highest prayer.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] repair round 1: 1 defect(s) — name "Open Palm" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] row evicted for the cap: Traits/"Reed-Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "the palm" — the call's own answer (kind), built from the name
[reskin] inline form: "the palm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: on_hit/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The palm glides low across the muck, hands guiding it like oars, and surges forward with a liquid burst of speed, closing on a foe the instant its guard slips. The same sweeping thrust can carry it clear of danger and back into the reeds once the strike is spent. It uses this reach to choose exactly when the fight happens, and never lets a target choose for it." [bonus_action/always/movement] — menu: rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] decline reason: action — the call answered none and names it "(unanswered)" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The palm glides low across the muck, hands guiding it like oars, and surges forward with a liquid burst of speed, closing on a foe the instant its guard slips. The same sweeping thrust can carry it clear of danger and back into the reeds once the strike is spent. It uses this reach to choose exactly when the fight happens, and never lets a target choose for it." [bonus_action/always/movement] — the model found no template that holds it (offered: riposte, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, ground-burst, thrown-burst-seed)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Wherever the palm lands its numbing strike, the swamp answers for it: the fen's stagnant water, clinging mud, and dark silt draw in around the wounded body, dragging at limbs that the pressure point has already made slow and foreign. A foe staggering away from the palm finds the very ground unwilling to let it leave." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: terrain-walk, adhesive, spider-climb, bloodied-fury, bloodied-burst, aberrant-ground, faultless-tracker — the key word does not mean the mechanic here
[reskin] trait declined: "Staggering Fen Pursuit" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Open Palm = none; Marsh Bolt = none
[reskin] weapon table: "Marsh Bolt" — a launcher, never thrown, range 80/320
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] ask vs row ok: "strikes pressure points with an open hand" -> "Open Palm" — trigger on_hit
[reskin] audit rename: "Opportunist's Lash" -> "Stillwater Rebuke"
```


---


### Bloodcursed Colossus — highest CR

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodcursed Colossus | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Bloodcursed Colossus

Medium Humanoid, Chaotic Neutral

AC 15
Initiative -1 (9)

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
6
-2
-2

Skills Athletics +8, Perception +3

Senses Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever the colossus starts its turn Bloodied, roll 1d6. On a 6, the colossus goes berserk. On each of its turns while berserk, the colossus attacks the nearest creature it can see. If no creature is near enough to move to and attack, the colossus attacks an object. Once the colossus goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, the colossus has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost the colossus extra movement, and the colossus can move across ice or snow without needing to make an ability check.

Actions

Multiattack. The colossus makes two attacks, using Greataxe or Hurlaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Hurlaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Bloodied Reprisal (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the colossus moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Greataxe — weapon greataxe
- Actions/Hurlaxe — weapon handaxe
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a goliath berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "a goliath berserker"
- Bonus Actions/Bloodied Reprisal — template rampage; library draw (seed unstamped); the GM's clause "loses control when wounded"; binds the GM's words: wound+rampage+bloodied+blood+savage

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("a goliath berserker") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a goliath berserker who loses control wh…" is the description, not a name
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: uncontrolled rage when wounded [behavior] | massive greataxe [object] | goliath physique [body]
[concept] identity: The goliath berserker opens a fight by charging the biggest threat with a sweeping greataxe, trading blows without hesitation. Every round it attacks with escalating ferocity until wounded, at which point it loses control and attacks the nearest creature regardless of allegiance, fighting to the death.
[concept] lore: A goliath berserker bred for bloodsport in hidden mountain arenas, its rage is a primal curse triggered by the sight of its own blood.
[reskin] donor: brute-5 -> CR 8
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "the colossus" — the call's own answer (kind), built from the name; the rules would have said "Colossus"
[reskin] inline on kit rows: "Colossus" -> "the colossus"
[reskin] inline form: "the colossus" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] signature idea (action): "When the colossus takes a wound that leaves it bloodied, the sight of its own blood sends it into an uncontrolled rampage. It immediately lashes out at the nearest creature it can see — friend or foe — with a savage greataxe swing, then keeps attacking the nearest creature on each of its turns until nothing is left standing or it dies." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] word match declined by the call: affliction, own-turn-punisher, focus — the key word does not mean the mechanic here
[reskin] value check: "Bloodied Reprisal (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rampage -> Bonus Actions/"Bloodied Reprisal (1/Day)" ("The trigger is taking a wound that leaves the colossus Bloodied, and the respons [verb: wound:concept, rampage:idea, bloodied:idea, blood:idea, savage:idea]")
[reskin] keys spent by the action: wound
[reskin] signature idea (trait): "The colossus swings its massive greataxe in wide, sweeping arcs that carry through everything in reach. Whenever it brings the axe down on a foe, the momentum of the blow lets it immediately follow through against a second creature close by." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for wounded, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The colossus swings its massive greataxe in wide, sweeping arcs that carry through everything in reach. Whenever it brings the axe down on a foe, the momentum of the blow lets it immediately follow through against a second creature close by." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greataxe = greataxe; Hurlaxe = handaxe
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Bloodied Reprisal" answers "loses control when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Greataxe" reach 10 -> 5 ft. — reach follows the goliath's size
```


---


### Bloodvowed Hull — a 2024 sheet

**Concept:** a berserker who flies into an unstoppable rage once per day when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodvowed Hull | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Bloodvowed Hull

Medium Humanoid, Neutral

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
9
-1
-1
MOD
SAVE
DEX
12
+1
+1
WIS
11
+0
+0
MOD
SAVE
CON
17
+3
+6
CHA
9
-1
-1

Skills Athletics +8, Perception +3

Senses Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Wounded Rage. While Bloodied, the hull has Advantage on attack rolls.

Bloodied Frenzy. While Bloodied, the hull has Advantage on attack rolls and saving throws.

Actions

Multiattack. The hull makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the hull moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Greataxe — weapon greataxe
- Traits/Wounded Rage — template bloodied-fury; library draw (seed unstamped); the GM's clause "flies into an unstoppable rage once per day when wounded"; binds the GM's words: wounded+rage+bloodied
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a berserker"

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("flies into an unstoppable rage once per ") | skirmisher-winged: the call read "flies" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] hints: winged→style ✗ ("flies into a rage")
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: once-per-day unstoppable rage when wounded [behavior] | hulking blood-soaked brute [body]
[concept] identity: A hulking humanoid brawler that opens with a heavy overhead blow, trading hits without finesse. Once bloodied or wounded, it snaps into a once-per-day unstoppable rage: it fights with relentless, all-in ferocity until either it or everything in front of it is broken. It never flees, never toys, and knows nothing but the next swing.
[concept] lore: Born from a blood-soaked warrior cult that hones its rage as a sacred weapon, this berserker wanders the borderlands seeking the single wound that will unleash its god-given fury.
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 9, WIS 11, CHA 9 — the Berserker's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: barbarian — "a berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the hull" — the call's own answer (kind), built from the name; the rules would have said "Hull"
[reskin] inline on kit rows: "Hull" -> "the hull"
[reskin] inline form: "the hull" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a berserker" -> has (descriptive), head | "flies into an unstoppable rage once per day when wounded" -> has (descriptive)
[reskin] signature idea (action): "Once per day, the moment the hull is wounded, it erupts in a blood-soaked fury that does not end until it or everything in front of it is broken. For a short while after being wounded, every time its axe splits flesh it tears the wound wider, and the sight of fresh blood pushes it to lunge at a new target without pause. The rage never lets it retreat or show mercy." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] word match declined by the call: ground-burst, throw-retrieve, focus, push-prone, affliction — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Once per day, the moment the hull is wounded, it erupts in a blood-soaked fury that does not end until it or everything in front of it is broken. For a short while after being wounded, every time its axe splits flesh it tears the wound wider, and the sight of fresh blood pushes it to lunge at a new target without pause. The rage never lets it retreat or show mercy." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: affliction, ground-burst, throw-retrieve, push-prone, focus)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 3.7 vs floor 14 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The hull's body is a soaked sponge of old wounds and fresh gore; whenever a foe's blood spills near it, the hull smears itself with the offering and its next swing lands harder. This gory anointing is part of its sacred rite, and it never wastes a drop." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (wounded, rage)
[reskin] signature template (trait): bloodied-fury -> Traits/"Wounded Rage" ("A berserker erupts into rage the moment it is wounded; while Bloodied it fights  [verb: wounded:concept, rage:concept, bloodied:idea]")
[reskin] weapons answered: Greataxe = greataxe
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Wounded Rage" answers "flies into an unstoppable rage once per day when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename blocked — "Bloodied Frenzy" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Cairnroot Warden — a print donor

**Concept:** a druid of the standing stones who calls the briars

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cairnroot Warden | 6 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Vine Staff: +7 derives from DEX, but an attack row rolls STR
- read: def 4 / off 7 → 5.5; sustained 48 (2 × Vine Staff); nova none; dmg 48

```
Cairnroot Warden

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

Multiattack. The warden makes two attacks, using Vine Staff or Verdant Wisp in any combination.

Vine Staff. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 2 (1d4) Poison damage.

Verdant Wisp. Ranged Attack Roll: +7, range 90 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. The warden casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

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
- Actions/Vine Staff — print's row, renamed
- Actions/Verdant Wisp — print's own row, renamed; weapon crossbow
- Actions/Spellcasting — print's own row

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=none — caster: ✓ ("a druid of the standing stones who calls") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "Druid of the Standing Stones…" is the description, not a name
[concept] resolve: archetype=caster type=Humanoid themes=verdant/grasping mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: calling forth walls of thorned briars [behavior] | a circle of standing stones [object] | splinter-bolts of hardened wood and venomous sap [behavior]
[concept] identity: The Druid of the Standing Stones opens combat by calling up walls of thorned briars that erupt from the earth, snaring and shredding anything that tries to close distance. Each round after, it maintains its barrier and hurls splinter-bolts of hardened wood and venomous sap, repositioning only to keep the briars between itself and its foes. When bloodied, it does not flee — it retreats into a stone circle and hurls a final, desperate seed-pod that bursts into a thorny thicket, fighting to the death with the land's patience.
[concept] lore: Once a mortal druid who bound their spirit to a ring of standing stones, they now call the briars to punish those who trespass on the old places, seeking to reclaim every field and road for the wild.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Druid is not a caster first and keys DEX 12 over STR 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 10, DEX 18, CON 13, INT 12, WIS 16, CHA 11 — the Druid's, DEX fitted to +7
[reskin] donor: skirmisher-3 -> CR 6
[reskin] print canon: "a druid of the standing stones who calls the briars" heads on the Druid — print's rows ride along; the seat stays
[reskin] name_element answered: Thorn Lash = imagery; Splinter Bolt = imagery; Snaring Bramble = imagery
[reskin] name element refused: "Thorn Lash" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] name element refused: "Splinter Bolt" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] damage type by the row's own noun: "Thorn Lash" Slashing -> Piercing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a druid of the standing stones" -> has (descriptive), head | "calls the briars" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Calling a seed-pod that bursts at a point within sight, it grows a thicket of thorned briars across the ground. The thicket makes that ground treacherous and painful to cross, and it stays standing until the warden falls or calls a new one to replace it, letting the warden keep a wall of briars between itself and its foes." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — lure (call)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown lure, which the GM's words keyed
[reskin] key match declined: action — "lure" was ranked first on the call's own menu for call, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Calling a seed-pod that bursts at a point within sight, it grows a thicket of thorned briars across the ground. The thicket makes that ground treacherous and painful to cross, and it stays standing until the warden falls or calls a new one to replace it, letting the warden keep a wall of briars between itself and its foes." [rider/on_hit/movement] — the model found no template that holds it (offered: lure, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, thrown-burst, gaze-single, ground-burst, thrown-burst-seed, delayed-brand, focus)
[reskin] fallback respects the call: lure left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a druid of the standing stones who calls the briars" heads on the Druid and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "As long as it stands within a stone circle it remains tethered to the old places, turning aside magical attempts to move it or force it away. It can also draw a splinter of stone from the circle to harden its next thorned lash or splinter-bolt, making that attack bite deeper." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "As long as it stands within a stone circle it remains tethered to the old places, turning aside magical attempts to move it or force it away. It can also draw a splinter of stone from the circle to harden its next thorned lash or splinter-bolt, making that attack bite deeper." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] concept-first trait skipped: false-appearance — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Thorn Lash = none; Splinter Bolt = none
[reskin] weapon table: "Splinter Bolt" — a launcher, never thrown, range 80/320
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Druidic; understands Common but does not speak it" -> "Common, Druidic" (sapient)
[reskin] print canon languages: "Common, Druidic" -> "Common, Druidic, Sylvan" — the Druid's
[reskin] print canon attack: "Thorn Lash" -> "Vine Staff" — the Druid's own row
[reskin] print canon attack: "Splinter Bolt" -> "Verdant Wisp" — the Druid's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Druid's
[reskin] print canon: chassis row leaves — Traits/"Bramble Step" is the seat's, not the Druid's
[reskin] print canon row: Actions/Spellcasting — the Druid's own
```


---


### Silver-Veined Troll — in the run

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Silver-Veined Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Rend); nova none; dmg 44

```
Silver-Veined Troll

Large Giant, Chaotic Evil

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Rend — print's row, renamed
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — brute-regenerator: ✓ ("a troll that grows back unless the blade") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Giant themes=bestial mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: regeneration halted only by silver [behavior] | hulking, leathery hide [body] | brutal claws and fangs [body]
[concept] identity: The silver-backed troll lumbers into melee, flinging its hulking frame at the nearest prey with bone-crushing claws and a gaping maw, trusting its regeneration to close wounds faster than steel can open them. Round after round it wades deeper into the fray, ignoring pain and focusing its fury on whoever last drew its blood, until only silvered weapons leave wounds that will not knit. Bloodied but never broken, it fights to the death—yet its cunning, giant-born mind remembers which enemies wield silver, and it prioritizes those threats with a cold, deliberate rage.
[concept] lore: Born in the shadowed glens where ancient silver veins breach the earth, these trolls arose from a brood cursed by a dying fey lord to regrow any wound not dealt by the metal that slew his kin; now they haunt the old roads, dragging travelers into their lairs to feast and to test which blades can truly hurt them.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Silver-Veined = imagery
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a troll" -> has (descriptive), head | "grows back unless the blade was silvered" -> has (descriptive)
[reskin] signature idea (action): "The troll tears a jagged shard of raw silver ore from the seam in its own hide and hurls it at a foe it can see. The shard is the very metal that can wound it, and wherever it lodges, the troll's blood-mad gaze fixes on that target — wading through anything in its path to reach the one it struck, so that even enemies who know its weakness cannot simply hide behind lesser prey." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The troll tears a jagged shard of raw silver ore from the seam in its own hide and hurls it at a foe it can see. The shard is the very metal that can wound it, and wherever it lodges, the troll's blood-mad gaze fixes on that target — wading through anything in its path to reach the one it struck, so that even enemies who know its weakness cannot simply hide behind lesser prey." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, rampage, thrown-burst, thrown-burst-seed)
[reskin] fallback stands down: "a troll that grows back unless the blade was silvered" heads on the Troll and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Driving Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The silver veins lacing the troll's hide are a living map of every wound it has ever suffered, and when the beast drops a foe, the metal quickens — the troll's bleeding slows and its stride surges, carrying it straight toward the next silver-blade in the enemy line." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] trait declined: "Silver Sense" — bound only on the idea's own words (metal:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Claw = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---


### Slate Shadow — in the run

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Slate Shadow | 5 | skirmisher-3-skulker | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Shortsword: +6 derives from DEX, but an attack row rolls STR
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Slate Shadow

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

Assassinate. During the first round of each combat, the shadow has Advantage on attack rolls against any creature that hasn't taken a turn. If the shadow hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If the shadow is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shadow instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The shadow makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shadow takes the Dash, Disengage, or Hide action.

Slate's Mark (2/Day). The shadow has Advantage on the next attack roll it makes before the end of its turn.

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
- Actions/Shortsword — print's row, renamed; weapon longsword
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Slate's Mark — library seed focus; the GM's clause "stalks the rooftops of the old quarter"; binds the GM's words: stalk

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/armed mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking [behavior] | vanish and re-strike from a new angle [behavior] | a cruel score to settle [behavior]
[concept] identity: From the slate shadows of the old quarter, the Cutter drops without a whisper, her first strike meant to end a throat before it can call for help. She fights in three-beat bursts—strike, vanish, reposition—using drainpipes, chimneys, and laundry lines to keep the fight vertical, always striking from a new blind spot. When bloodied, she does not flee; she melts into the rooftops and circles back, forcing her enemies to chase a ghost they can never corner.
[concept] lore: Cast out of the Nine Hells for a botched assassination, she now polices the old quarter's shadows, killing not for coin but to keep a score only she understands against the city that fears her blood.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — no damage type for "Kukri" | no damage type for "Hand Crossbow"
[reskin] repair round 2: 1 defect(s) — no damage type for "Kukri"
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] row evicted for the cap: Traits/"Rooftop Stalker" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "a tiefling rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the shadow" — the call's own answer (kind), built from the name
[reskin] inline form: "the shadow" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The shadow vanishes from sight and reappears atop a nearby roof, wall, or high perch she can see within a short distance, always landing where she has cover or a clear line to a new blind spot. Enemies who were watching her lose track of where she went until she strikes again." [action/always/movement] — menu: leap, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: gaze-single, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] value check: "Gutter Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Gutter Vanish (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every time the shadow attacks a creature from above or from an unseen position, that creature's attention snaps to her—it cannot willingly move away from her on its next turn, and its eyes stay locked upward while she circles." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, gaze-aura — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Every time the shadow attacks a creature from above or from an unseen position, that creature's attention snaps to her—it cannot willingly move away from her on its next turn, and its eyes stay locked upward while she circles." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Kukri = kukri (a curved short blade); Hand Crossbow = hand crossbow
[reskin] weapon declared: "Kukri" is a longsword — the call's own answer
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Kukri" -> "Shortsword" — the Spy's own row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
[reskin] row binds its clause: "Predatory Focus" answers "stalks the rooftops of the old quarter" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Slate's Mark (2/Day)"
[reskin] species kit: resistance Fire — the tiefling's
```

