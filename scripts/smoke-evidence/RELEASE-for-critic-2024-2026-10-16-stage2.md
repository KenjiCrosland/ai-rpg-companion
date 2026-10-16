# The case for the critic — stage 1, 1b and the stage 2 measurements

2026-10-16, second package of the day. The first worked your read of 2026-10-16
hold by hold. This one closes the owner's five-stage fix order through stage 2.

**This is not a general block read.** The blocks below are evidence for one
narrow claim — that six named ship blockers are gone. The substance of this
package is the **measurements**, and three of them reverse the premise of the
move-set brief you reviewed. Those are what we want attacked.

Everything re-runs from the archive: `scripts/signature-baseline.mjs`,
`pattern-label.mjs`, `pattern-count-generated.mjs`, `signature-demand.mjs`,
`by-print-audit.mjs`, `decline-sample.mjs`. Print labels are frozen in
`src/data/print-patterns.json`.

Gate: `npx jest` 70 suites / 2,759 passed. `npm run build` clean.

---

## Part 1 — six ship blockers, with the run that proves each

Sheets that failed at the table while every gate passed them.

| # | what shipped | fix | proof |
|---|---|---|---|
| 1 | **Courtier Unseen had no attack row at all** and "makes three attacks" over it; the reader printed off 0 | print's last attack is narrowed to melee, never deleted; `multiattack-integrity` now fails a sheet with zero attack rows | `stage1-2026-10-16T14-40-36` 01: one hybrid attack row present |
| 2 | **Dirge Swarm killed a full-HP caster at CR 13** — 75-HP threshold beside a capped 67 damage, so the kill branch beat the damage | threshold keys to Bloodied (print: Sea Hag/Death Glare takes "one Frightened creature") and re-derives after the cap | template data pinned; see the gap note below |
| 3 | **Plaguecarrion Mote offered three saves a turn** against Poisoned-with-no-healing until a Long Rest | print's immunity-on-success clause | template data pinned; see the gap note |
| 4 | **Bone-Labyrinth Reaver forced area movement every turn** after a re-slot made it a bonus action | Recharge-gated when the re-slotted row reaches an area | `stage1` 04: "Driving Bellow (Recharge 5-6)" |
| 5 | **"Thing in the Well" spoke as "the well"** — the place, not the creature | any contiguous run legal incl. the whole name; a run past *any* preposition refused; a refused person form falls back to a person | `stage1b-2026-10-16T14-47-47` 04 |
| 6 | **Broken Wall Sentinel shipped two byte-identical rows** | the call's shield answer survives the reserved-name repair | `stage1` 06: no duplicate text |

Verification: `stage1` 12 blocks **0 FAIL**; `stage1b` 5 blocks, 1 FAIL
(`save-fit` on a Strength save for a poison — pre-existing, unrelated).

Stage 1b landed six more: one key definition for the router and the gate (the
Bog Cauldron failed `engine-needs-key` on "climbs in", a key the router had used
to route it); the audit protects kit feature names (Divine Smite had shipped as
"Oathbound Strike"); `alignment-fit` reads "understands but can't speak" as mute
(it would have failed print's own Stone Golem); low-INT Constructs stop speaking
Common; a title-case name with particles stays the GM's; and the energy trace
stops hard-coding "a Humanoid".

**Two fixes diverge from the owner's brief and print is why.** Both were
confirmed by the owner before landing.

- Item 3 asked for the once-per-turn "Stunning Strike" gate. **Print uses it in 0
  of 329 SRD 5.2 rows.** Print's three real answers are immunity on a successful
  save (Werewolf/Bite: "immune to this werewolf's curse for 24 hours"), a
  prerequisite (Phase Spider, only on a drop to 0), or no save at all — the
  latter being this template's own cite, Mummy/Rotting Fist, which the Mummy
  applies twice a turn because re-applying is a no-op. We took the Werewolf's.
- Item 4 gates the re-slotted row only when it reaches an **area**. Print has 51
  ungated bonus actions; its two area ones are Recharge-gated (Centaur Trooper)
  or single-target with a prerequisite (Ettercap).

**An honest gap.** Items 2 and 3 never drew in three live batches — the execute
and contagion templates did not come up — so they are pinned on template data
and verified by replay, not by a generated sheet. Do not take them as
field-confirmed.

---

## Part 2 — the three claims we want attacked

### Claim A: our sheets are NOT flat by the brief's own metric. They are over-patterned.

3,403 generated 2024 sheets, frozen print predicates both sides:

| CR band | ours | print | gap | meat-only (ours) | meat-only (print) |
|---|---|---|---|---|---|
| 0–1 | **2.19** | 0.81 | **+1.38** | 3% | **48%** |
| 2–4 | **2.56** | 1.41 | +1.15 | 5% | 31% |
| 5–8 | 2.64 | 1.83 | +0.81 | 7% | 12% |
| 9–12 | **3.28** | 2.22 | +1.06 | 4% | 13% |
| 13–16 | 3.00 | 2.89 | +0.11 | 6% | 0% |
| 17+ | **4.80** | 4.10 | +0.70 | 0% | 0% |

We carry more patterns than print at every band. The inflation is **chassis
filler**: our commonest pattern is `hit-and-run` at **31% of sheets against
print's 6%**, and it is **84% filler** — Fleet Agility, Cunning Action, the
terrain-walk traits. `clock` we never generate; every instance is a print row
riding along.

If this holds, "flat" means *many generic patterns with the distinctive row
missing*, the signature slot's 17% hit rate is the real deficit, and **the
brief's step-10 flat metric would score a filler-rich sheet as rich** unless
filler comes out of its denominator.

**Attack this first.** It reverses the brief's framing, the labels are ours, and
the predicates are ours. The specific thing to doubt: whether a mechanical
labeller that counts "Cunning Action" as `hit-and-run` is measuring anything a
player would feel.

### Claim B: four of five "owed by print" seat defaults name rows SRD 5.2 does not contain.

A seat that OWES a trait seats it **before the idea**.

| seat owes | print row by that name? |
|---|---|
| skulker owes `assassinate` | **none — SRD 5.2's Assassin has Evasion + Cunning Action** |
| lurker owes `assassinate` | **none** |
| trap owes `false-appearance` | **none — the Mimic has Adhesive + Shape-Shift; the Gargoyle has Flyby** |
| warden owes `interpose` | **none — the Shield Guardian has Bound, Regeneration, Spell Storing, Fist** |
| skulker owes `evasion` | 1 block (the Assassin) |

They fire on **7% of 1,066 blocks** and they displace the GM. **Four separate "a
ninja who moves through the shadows and strikes unseen" sheets** seated
`assassinate` + `evasion`, after which the GM's own trait idea missed:

- "The shinobi's semi-incorporeal body is one with darkness…"
- "As long as the shade is in dim light or darkness, it can slip through the shadows…"
- "Kanagi's body is woven from the dark between worlds…"
- "The assassin's body is partially composed of living shadow…"

Also **10 of 47 template cites are broken**: `heated-body` cites Remorhaz/Heated
Body (renamed **Heat Aura**); `pounce` cites Tiger/Pounce (**removed** — which
also explains the Lion); `assassinate`, `false-appearance` ×2, `interpose` and
`ward-retaliation` cite rows 5.2 removed; `shell-withdraw`, `phobia` and
`bloodied-fury` cite Tortle, Scarecrow and Sahuagin, **none of which are in SRD
5.2**. `MECHANIC_OWED_TRAIT.gaze → gaze-aura` is the one that holds (4 print Gaze
rows).

This is the same stale-2014 error class as the brief's own example table. Print
settles it; please check the receipts.

### Claim C: 56% of empty signatures are the print-body "nothing invented" ruling.

Scoped to current code (427 blocks since 2026-10-15), with "nothing" defined as
no signature row of any kind — action, rider, seed, trait or wildcard:

| cause | share |
|---|---|
| **print body: "nothing invented"** | **56%** |
| the trait seat landed, the action seat did not | 17% |
| the call was asked and found no fit | 15% |
| no idea produced | 6% |
| no shelf template shared a verb (no call made) | 3% |
| the value floor | 2% |
| a post-call veto | 1% |

More than half of all empty signatures trace to one 2026-10-01 ruling.

---

## Part 3 — the rest of stage 2, briefly

- **Item 4: the value floor prices out print's second-commonest pattern.** Of
  floor drops carrying a pattern at all, **64 of 65 are `save control`** (23% of
  print). The other half of the drops are passive templates with no EV by
  construction — correctly skipped.
- **Item 6: 62% of all signature misses are TRAIT seats** (trait/always 44%,
  trait/on_being_hit 18%), which the candidate design does not address. Demand by
  effect tag is spread across all five, so a successor keyed on `effect` needs
  every shelf stocked.
- **Item 1: 19 `no_fit`, 1 `already_answered`, 0 `collision`**, and of the ten
  declines on templates the GM's own words had keyed, **7 are right, 1 wrong, 2
  borderline**. The right ones name a catalog gap, not a call gap: a skald
  asking to fury his **warband** was offered self-only `bloodied-fury`; a
  crusader asking to **mend her soldiers** was offered `warded-mending`, which
  *prevents* healing.
- **Item 2: 30% false-refusal rate** on real asks, hand-judged over all 20
  refusals. Cause: the call quotes **its own idea text**, not the GM's. The
  engine now extracts the longest verbatim GM span from the answer.
- **Hypothesis 6 flipped between metrics.** Refuted against signature held-rate
  (17% seat-survived vs 19% stood-down); **confirmed against pattern count**
  (2.97 vs 2.28, and 2.71 vs 1.97 within CR 5–8 alone). Both readings are on the
  record with the metric each used.

---

## Two asks only a second reader can serve

- **Item 8 — a blind label check.** 30 random SRD 5.2 blocks labelled against the
  pattern vocabulary by someone who has not seen the predicates. Our 21-of-21
  spot-check was fitted to the brief's own examples and should be read as such.
- **Item 9 — the eleven rewritten pins.** A fresh read of the diffs with only the
  print block each cites, looking for an expectation that encodes a defect's
  output rather than a law.

We wrote the predicates and the pins. Neither check can be self-served.

---

## What we got wrong this round, for your calibration

Six errors, all caught in-session, four of them in the measurements themselves:

1. **Item 1's first run reported 27 of 27 declines unanswered.** The prompt half
   of the field landed and the `parseFit` half silently did not, so the answer
   was discarded before anything counted it. We nearly reported "the call ignores
   the field" as a finding.
2. **Item 2's cause was misattributed first.** Reported as an over-strict check;
   the check was behaving correctly and the call was quoting itself. Only a trace
   that separated the two failures settled it.
3. **Item 7's first pass put 64% of empty signatures in "other"** because it
   counted a missing *action* signature as "nothing" — 11% of those had landed a
   trait and 12% a wildcard.
4. **"No idea produced" looked like the biggest cause at 33%** across the whole
   archive. It is **0% on 2026-10-16** and concentrated in September runs from
   before the seat existed. An archive artifact read as a defect.
5. **The pattern labeller's CLI ran on import**, printing its whole report into
   every importing script's stdout.
6. **A trace we added this morning says "a Dragon the concept never called
   thunder"** for a concept reading "a rolling wall of thunder". The engine keeps
   the rider correctly; the trace misdescribes why. Stage 3 retires that rule.

The pattern across 1–4 is the same: **a measurement that agreed with a prior
belief got reported before its own classifier was checked.** Claim A agrees with
nothing we expected, which is weak evidence for it and no substitute for your
read.

---

# 2024 blocks

## Review batch — stage1-2026-10-16T14-40-36

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Absent Chancellor | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Swarm of Dolorous Rings | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Gravebloated Carrier | 8 | 2024 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Tauros of the Turning Deep | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Drowned Traveler | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Shield-Sworn Oath | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Mirewife's Broodpot | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Seraphine Vow | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Unmoved Stone Templar | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Silence Claimant | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Coin-Gnawed Freeblade | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |

**Dropped 1 of 15 user clauses** (coverage 93%); concept share 49% (25/51 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Owlbear — lowest CR

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+7
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+3
CHA
7
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The owlbear makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

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

- Actions/Multiattack — print's own row
- Actions/Rend — print's row, renamed

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: grapple, engulf
[concept] signature elements: bear-hug grapple and beak-rend [behavior] | screaming owlish head on ursine bulk [body] | blood-matted, near-impenetrable hide [body]
[concept] identity: From the treeline it charges with a shrieking roar, hurling its bulk at the closest target to pin them beneath crushing weight and hooked beak. Every round after, it holds its prey down with rake-and-rend talons, tearing at the grabbed body while shrugging off blows with a blood-matted hide. It fights to the death, feeding on fear until the last heartbeat, and never yields ground once its beak tastes blood.
[concept] lore: Bred in the fey-crossed depths of the elder wood, an owlbear is a living engine of appetite that marks its territory in crushed bone and broken hound, wanting nothing more than to feel a warm body stop struggling beneath it.
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Beak = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
```


---


### Silence Claimant — highest CR

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Silence Claimant | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Claw + legendary Rend); nova Thunder Wall 71; dmg 150

```
Silence Claimant

Huge Dragon, Neutral

AC 19
Initiative +1 (11)

HP 187 (15d12 + 90)

Speed 40 ft., Fly 80 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
12
+1
+6
WIS
14
+2
+7
MOD
SAVE
CON
22
+6
+6
CHA
20
+5
+5

Skills Perception +7, Stealth +6

Immunities Thunder

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the claimant fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The claimant makes three Claw attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Claw. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The claimant casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Command, Detect Magic, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the claimant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Rend. The claimant makes one Claw attack.

Stormhaul. The claimant moves up to half its Speed without provoking Opportunity Attacks.

Silent Stare. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Thunder Wall — the chassis
- Actions/Spellcasting — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Rend — the chassis
- Legendary Actions/Stormhaul — the chassis
- Legendary Actions/Silent Stare — the chassis

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("an adult storm dragon whose") | breath→mechanics ✓ ("whose breath is a rolling wall")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/aerial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-forged body [body] | frightful presence like a breaking storm [aura]
[concept] identity: The storm dragon opens by breathing a rolling wall of thunder that drags creatures off their feet and hurls them through the air, then dives into the disarray to savage the scattered survivors with tooth and claw. Each round it repeats the tactic — a new thunder-wall to break formations and send prey tumbling, then melee against the isolated or the prone — while it toys with any who pretend to stand firm. Bloodied, it does not flee; it climbs and circles, using altitude and its own storm-presence to punish a party that cannot reach it, fighting to the death only when cornered like a beast at bay.
[concept] lore: Born from the heart of a perpetual thunderstorm that never breaks over the deep desert, it claims the storm's silence as its hoard and descends on any who dare to shout or sing beneath its clouds.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] donor: dragon-15 -> CR 15
[reskin] inline declared: "the claimant" — the call's own answer (kind), built from the name
[reskin] inline form: "the claimant" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Thunder Wall" promises Thunder, so the rider stands on a Dragon the concept never called thunder
[reskin] energy rider kept by the row's name: "Stormhaul" promises Thunder, so the rider stands on a Dragon the concept never called thunder
[reskin] spell DC coherence: Charisma 18 -> 20 so DC 18 derives
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an adult storm dragon whose breath is a rolling wall of thunder" -> has (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "It folds the air beneath its wings and rides the thunder-wall, vanishing inside the roaring pressure and bursting out of it elsewhere on the battlefield in a single motion, its claws already leading. It can only ride its own storm this way once it has been released, so the thunder-wall must already be rolling for the maneuver to carry it." [action/save/movement] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "It folds the air beneath its wings and rides the thunder-wall, vanishing inside the roaring pressure and bursting out of it elsewhere on the battlefield in a single motion, its claws already leading. It can only ride its own storm this way once it has been released, so the thunder-wall must already be rolling for the maneuver to carry it." [action/save/movement] — no template on the shelf shares a verb with the concept or the idea (offered: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure, lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "Its body carries the storm's pressure, so each time it is struck in melee a thunderclap detonates at the wound, lashing the striker and shoving it back and off its feet. The blow itself is never turned aside — the storm simply answers for it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, bloodied-burst, bloodied-fury, death-burst — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Its body carries the storm's pressure, so each time it is struck in melee a thunderclap detonates at the wound, lashing the striker and shoving it back and off its feet. The blow itself is never turned aside — the storm simply answers for it." [trait/on_being_hit/damage] — the model picked "resonant-body" (no verb, and it quotes nothing the GM typed) over a concept-verb template (heated-body)
[reskin] weapons answered: Claw = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 60 added
[reskin] dragon spell DC derived: 18 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Silent Stare" -> 18 (the Frightful Presence class keys to Charisma)
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Fear*.
```


---


### Absent Chancellor — a 2024 sheet

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Absent Chancellor | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Absent Chancellor

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Traits

Evasion. If the chancellor is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the chancellor instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The chancellor makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The chancellor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The chancellor casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). The chancellor teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The chancellor is hit by an attack roll. Response: The chancellor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Bonus Actions/Phase Slip — library seed phase-slip; binds the GM's words: step
- Traits/Evasion — template evasion; library draw (seed unstamped); binds the GM's words: never where

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Psychic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: displacement — never in the space you strike [behavior] | the perfect opening spellstrike from invisibility [behavior] | re-veiling after every attack, leaving only afterimages [behavior]
[concept] identity: The Court Wizard opens from absolute stillness — invisible, undetectable, already reading the room — then lands one perfect spellstrike against the target's unguarded mind before the first initiative tick ends. Every round after, it never stands where it attacked: a half-step, a whispered syllable, and it is elsewhere, displacing the space it occupied with afterimages and force-fed suggestions so the counterblow lands on nothing. Under pressure it does not flee; it withdraws, re-veils, and lets the fight bleed itself out against an enemy who can never confirm where the wizard is.
[concept] lore: It was the court's chief advisor, and when the coup came it was already gone — now it haunts the palace it once ran, a wizard who survives by never being where the blade lands and never letting anyone be sure it was ever there.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Whispered Syllable" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the chancellor" — the call's own answer (kind), built from the name
[reskin] inline form: "the chancellor" — the model's own reading of the name
[reskin] energy withheld on a base row: "Whispered Syllable" Psychic -> Piercing (the body's physical type; a Humanoid deals no Psychic its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] signature idea (action): "The chancellor substitutes the space it occupied with a hungry afterimage of itself: a shimmering double that wears its face and speaks in its stolen voice. The double stands where the chancellor stood, taunting and drawing every eye and every blade, while the chancellor has already stepped elsewhere unseen. When the double is struck or expires, it bursts into a disorienting whisper that leaves it" [action/always/defense] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: lure, herd, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] fit declined: "Hungry Afterimage" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Anyone who strikes the chancellor and finds only an afterimage carries that doubt with them; their next attempt to strike the chancellor comes easier to the chancellor to slip, because the attacker hesitates half a heartbeat about whether the target is truly there. The doubt fades if they land a true hit or if the chancellor is forced to stand still." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] trait declined: "Afterimage Hesitation" — bound only on the idea's own words (afterimage:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): evasion — never where in the user's words; the idea path had nothing
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] weapons answered: Whispered Syllable = none
[reskin] languages by mind: "Common plus two others" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Whispered Syllable" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Coin-Gnawed Freeblade — a print donor

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coin-Gnawed Freeblade | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Coin Spray 28; dmg 47

```
Coin-Gnawed Freeblade

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+6
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The freeblade makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the freeblade has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Coin Spray (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
- Actions/Handaxe — print's own row; weapon handaxe
- Actions/Coin Spray — library seed thrown-burst-seed; binds the GM's words: hurl

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling a handaxe [behavior] | closing with a shortsword [behavior] | sellsword's iron resolve [body]
[concept] identity: The sellsword opens by hurling a handaxe at range, then closes to finish with a shortsword. Every round it reads the field: if a target is exposed, it throws; if cornered or rushed, it advances blade-first and refuses to yield ground. Under pressure it fights to the death, a professional's grim calculus rather than blind rage.
[concept] lore: A veteran of a hundred failed contracts, this sellsword now sells its arm to whichever banner pays in coin and plunder, seeking one last score to buy an honorable retirement.
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] named parts: Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] inline declared: "the freeblade" — the call's own answer (kind), built from the name
[reskin] inline form: "the freeblade" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic" quotes nothing the user typed
[reskin] lacks refused: "no honor" quotes nothing the user typed
[reskin] lacks refused: "no banner" quotes nothing the user typed
[reskin] lacks refused: "without a home" quotes nothing the user typed
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) | "closes with a shortsword" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The freeblade launches its handaxe not to kill but to pin — the blade bites into the target's gear, shield, or clothing and anchors them in place. While it keeps one hand on the trailing cord, the target cannot move away from the spot, and the freeblade reels them a step closer before strolling in with the shortsword." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] word match declined by the call: throw-retrieve, pounce — the key word does not mean the mechanic here
[reskin] signature miss: action — "The freeblade launches its handaxe not to kill but to pin — the blade bites into the target's gear, shield, or clothing and anchors them in place. While it keeps one hand on the trailing cord, the target cannot move away from the spot, and the freeblade reels them a step closer before strolling in with the shortsword." [rider/on_hit/movement] — the model picked "hook-rider" (no verb, and it quotes nothing the GM typed) over a concept-verb template (thrown-burst-seed)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A professional does not break; the freeblade's iron resolve is bought and paid for. The first time each fight it would be forced to flee, surrender, or give ground, it simply refuses — the sellsword stands, blade-first, and keeps fighting as if nothing happened." [trait/always/defense] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: undead-fortitude, resonant-body, guarded-stance, berserk, shielded-mind — the key word does not mean the mechanic here
[reskin] signature miss: trait — "A professional does not break; the freeblade's iron resolve is bought and paid for. The first time each fight it would be forced to flee, surrender, or give ground, it simply refuses — the sellsword stands, blade-first, and keeps fighting as if nothing happened." [trait/always/defense] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Combat Rolls" is the seat's, not the Warrior Veteran's
[reskin] audit rename: "Hurled Burst (Recharge 5-6)" -> "Coin Spray (Recharge 5-6)"
[reskin] multiattack re-read — "Handaxe" joins the combination; "The freeblade makes two attacks, using Shortsword or Handaxe in any combination."
```


---


### Gravebloated Carrier — a homebrew with a nova

**Concept:** a plague-bloated corpse-carrier that bursts in a cloud of flies when it dies

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebloated Carrier | 8 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 9 → 7; sustained 45 (3 × Talons); nova Corpse-Strewn Pass 44; dmg 59

```
Gravebloated Carrier

Medium Undead, Neutral

AC 17
Initiative +5 (15)

HP 120 (16d8 + 48)

Speed 40 ft., Fly 70 ft.

MOD
SAVE
STR
16
+3
+3
INT
10
+0
+0
MOD
SAVE
DEX
20
+5
+8
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +8

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Carrion Bloom. A creature that touches the carrier or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Poison damage.

Flyby. The carrier doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. The carrier makes three attacks, using Talons or Hurled Debris in any combination.

Talons. Melee Attack Roll: +8, reach 5 ft. 9 (1d8 + 5) Slashing damage plus 6 (1d12) Poison damage. If the carrier flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Hurled Debris. Ranged Attack Roll: +8, range 20/60 ft. 14 (2d8 + 5) Piercing damage.

Corpse-Strewn Pass (Recharge 5-6). The carrier flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 16. Failure: 44 (8d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Aerial Agility. The carrier takes the Dash or Disengage action.

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

- Traits/Carrion Bloom — template heated-body; library draw (seed unstamped); binds the GM's words: plague
- Traits/Flyby — the chassis
- Actions/Multiattack — the chassis
- Actions/Talons — the chassis
- Actions/Hurled Debris — the chassis
- Actions/Corpse-Strewn Pass — the chassis
- Bonus Actions/Aerial Agility — the chassis

**Engine trace**

```
[route] skirmisher-winged type=Undead mechanics=breath — brute-grappler: ✓ ("a plague-bloated corpse-carrier") | brute-grappler -> skirmisher-winged: the concept's VERB outranks the noun (key "flies", class verb) | skirmisher-winged: key "flies" (class verb)
[concept] hints: winged→style ✓ ("cloud of flies when it dies")
[concept] resolve: archetype=skirmisher type=Undead themes=grave/aerial mind=bestial style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: bursting into a cloud of flies on death [behavior] | plague-bloated corpse body [body] | trailing swarm of grave-flies [aura]
[concept] identity: A bloated, fly-blown corpse that swoops on ragged wings, its distended belly trailing a haze of black flies. It opens with a high dive, raking with clawed feet and a bite that deposits wriggling grave-maggots into the wound; thereafter it circles just out of reach, swooping to snatch isolated prey and drop them from height. When bloodied, it refuses to flee — it fights to the death, and that death is a final weapon.
[concept] lore: Risen from the mass graves where plague victims were tipped in heaps, a corpse-carrier is a single bloated husk animated by the swarm that devoured it, and it seeks only to spread that same fecund rot to the living.
[reskin] nova capped: "Diving Attack" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8-winged -> CR 8 (invented — no printed peer)
[reskin] repair round 1: 1 defect(s) — rename for "Diving Attack" unchanged
[reskin] inline declared: "the carrier" — the call's own answer (kind), built from the name; the rules would have said "Carrier"
[reskin] inline on kit rows: "Carrier" -> "the carrier"
[reskin] inline form: "the carrier" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bloated corpse-carrier" -> has (descriptive), head | "bursts in a cloud of flies when it dies" -> has (descriptive)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The carrier's bloated body finally surrenders to the swarm inside it, and it dies in a shrieking detonation of flies. A churning cloud of grave-flies erupts from the corpse and clings to every living creature nearby, harrying them and breeding rot into every wound for the rest of the fight — and any creature that was already poisoned or prone when the carrier dies is the first and worst to be swal" [action/once_per_fight/damage] — menu: condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, zone-seed (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] word match declined by the call: contagion, affliction, exploiter, zone-seed, delayed-brand, condition-payoff — the key word does not mean the mechanic here
[reskin] key match declined: action — "contagion" was ranked first on the call's own menu for plague+plagued, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The carrier's bloated body finally surrenders to the swarm inside it, and it dies in a shrieking detonation of flies. A churning cloud of grave-flies erupts from the corpse and clings to every living creature nearby, harrying them and breeding rot into every wound for the rest of the fight — and any creature that was already poisoned or prone when the carrier dies is the first and worst to be swal" [action/once_per_fight/damage] — the model found no template that holds it (offered: contagion, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, zone-seed, affliction, delayed-brand, coating)
[reskin] fallback respects the call: zone-seed, condition-payoff, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.1 vs 7.8)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 7.8)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.9 vs floor 38 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The carrier is a bloated hive of rot; its wounds keep leaking flies and filth onto whatever struck it. Any creature that hits it in melee gets the swarm crawling on its skin, and the reeking corpse-flies stay with it until they lay their maggots." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — death-burst (burst, die)
[reskin] word match declined by the call: noxious-aura — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Carrion Bloom" ("A creature that hits the carrier in melee gets the swarm on its skin — taking da [verb: plague:concept]")
[reskin] weapons answered: Talons = none; Bite = none; Diving Attack = none
[reskin] weapon table: "Bite" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Grave Dive (Recharge 5-6)" — the skirmisher-8-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] attack name by anatomy: "Bite" -> "Hurled Debris" — bite is a melee noun on a ranged row
[reskin] rename propagated: "Bite" -> "Hurled Debris" in "Multiattack"
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] audit rename: "Grave Dive (Recharge 5-6)" -> "Corpse-Strewn Pass (Recharge 5-6)"
```


---


### Swarm of Dolorous Rings — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Dolorous Rings | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Iron Clapper); nova none; dmg 90

```
Swarm of Dolorous Rings

Medium Swarm of Tiny Constructs, Lawful Neutral

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 30 ft.

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

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Iron Clapper. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Thunder damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Thunder damage if the swarm is Bloodied.

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

- Traits/Swarm — the chassis
- Actions/Iron Clapper — the chassis

**Engine trace**

```
[route] swarm type=Construct mechanics=aura — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("the swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=mindless style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: swarm of self-ringing funeral bells [body] | drawn to and accelerating the dying [behavior] | dissonant tolling that disorients [aura]
[concept] identity: The swarm opens by peeling from the shadows in a cathedral-hush, each bell tolling its own note until the dissonance becomes a single lurching chord that drags the dying toward the ground. Every round after, it surges over the wounded in a wave of ringing iron, deliberately ringing louder and faster around creatures that are below half their hit points, as if the sound itself is a burial rite that speeds their departure. It does not flee; it has no concept of self-preservation, only the compulsive need to ring over the dying until they stop moving, then it falls silent and waits for the next breath to falter.
[concept] lore: Forged in the bell tower of a plague-swept abbey where the ringers died at their ropes, these consecrated iron bells rose as one hungering mass, forever tolling for the dying and drawn to the sound of labored breath.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] swarm name stamped: "The Dolorous Ring" -> "Swarm of Dolorous Rings" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] inline by rule: "the swarm" — the call answered "the dolorous ring" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The bells peel away from the swarm and ring a single, dragging chord that hooks only into creatures already wounded or near death, pulling them toward the swarm's iron heart and slowing their escape. Those who are gravely hurt are dragged the furthest, as if the sound itself is a burial rite compressing their remaining time." [action/save/movement] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: active-toll, hook-rider, execute, spew — the key word does not mean the mechanic here
[reskin] signature miss: action — "The bells peel away from the swarm and ring a single, dragging chord that hooks only into creatures already wounded or near death, pulling them toward the swarm's iron heart and slowing their escape. Those who are gravely hurt are dragged the furthest, as if the sound itself is a burial rite compressing their remaining time." [action/save/movement] — the model picked "wail" (no verb, and it quotes nothing the GM typed) over a concept-verb template (active-toll)
[reskin] signature idea (trait): "Whenever the swarm strikes a creature, the discord of its many clappers leaves a lingering, disorienting toll in the target's ears that makes the world ring and waver, hampering its ability to act clearly. This tolling grows louder and more insistent around those already below half their hit points, deepening their disorientation while the swarm's own blows draw strength from their fading breath." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Whenever the swarm strikes a creature, the discord of its many clappers leaves a lingering, disorienting toll in the target's ears that makes the world ring and waver, hampering its ability to act clearly. This tolling grows louder and more insistent around those already below half their hit points, deepening their disorientation while the swarm's own blows draw strength from their fading breath." [trait/always/condition] — the model picked "noxious-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, resonant-body, death-burst)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Iron Clapper = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
audit span not verbatim, dropped: Iron Clapper The swarm can occupy another creature's space and vice versa
```


---


### Tauros of the Turning Deep — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tauros of the Turning Deep | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatclub); nova none; dmg 44

```
Tauros of the Turning Deep

Large Monstrosity, Chaotic Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 40 ft.

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

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the tauros has Advantage on attack rolls and saving throws.

Actions

Multiattack. The tauros makes two Greatclub attacks.

Greatclub. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Charge. The tauros moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the tauros moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greatclub attack.

Driving Bellow (Recharge 5-6). Wisdom Saving Throw: DC 14, each creature of the tauros's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the tauros's choice, using the safest available route.

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
- Actions/Greatclub — weapon greatclub
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Driving Bellow — template herd; library draw (seed unstamped); binds the GM's words: herd+drive
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a minotaur reaver"

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: provided_name rejected — "minotaur reaver who herds prey into the …" is the description, not a name
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/subterranean mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | brutal labyrinthine charges [behavior] | thick scarred hide [body]
[concept] identity: A hulking reaver that uses its massive weapon and pitiless bulk not to kill outright but to drive prey through twist after turn of a collapsing labyrinth, bleeding them with shallow charges and bellowed threat. Every round it closes another passage, denies another escape, and lands a punishing blow meant to herd rather than slay. When bloodied, it does not flee; it stops toying and fights to the death with the same brutal patience it used to trap its victims.
[concept] lore: A minotaur warped by the maze it haunts, it claims no god but the hunt, taking grim delight in driving trespassers deeper until their own panic kills them.
[reskin] donor: brute-5 -> CR 6
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline by rule: "the tauros" — the call answered "the turning deep" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The tauros slams its club into the ground at the feet of a creature it can see, sending up a fan of shattered stone and a bellowing threat that drives the prey forward. The target is forced to choose: move straight away from the tauros by the shortest safe route, or stand frozen in terror and leave itself open. This is how the tauros herds intruders through the maze, steering them with sheer bulk " [action/save/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: terror-pulse, thrown-burst, escalating-dread, rally — the key word does not mean the mechanic here
[reskin] value check: "Driving Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Driving Bellow" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 8.2 vs floor 3.4 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Driving Bellow (Recharge 5-6)" ("The tauros slams the ground and bellows to drive the target forward, forcing it  [verb: herd:concept, drive:idea]")
[reskin] keys spent by the action: herd
[reskin] signature idea (trait): "The tauros's hide is a map of old scars, and whenever a creature strikes it in melee, the blow splits scar tissue that sprays hot blood into the attacker's eyes and mouth. The attacker is left reeling and half-blind for a moment, its next strike against the tauros badly thrown." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] trait declined: "Scar Spray" — bound only on the idea's own words (bloodied:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Greatclub = greatclub
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---


### Drowned Traveler — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Traveler | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Grasping Hand); nova none; dmg 38

```
Drowned Traveler

Medium Undead, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Climb 20 ft.

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

Drowned Chill. A creature that touches the traveler or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Necrotic damage.

Actions

Multiattack. The traveler makes two Grasping Hand attacks. It can replace one attack with a use of Undertow Pin.

Grasping Hand. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the traveler), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Undertow Pin. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the traveler. Failure: 14 (4d6) Necrotic damage. Success: Half damage.

Bonus Actions

False Form. The traveler shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Grasping Hand — the chassis
- Actions/Undertow Pin — template exploiter; library draw (seed unstamped); binds the GM's words: grappled+downed+pinned
- Bonus Actions/False Form — the chassis
- Traits/Drowned Chill — template heated-body; library draw (seed unstamped)

**Engine trace**

```
[route] lurker-trap type=Undead mechanics=none — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote | extra grapple: quote not found
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: grabbing and dragging prey into water [behavior] | drowned corpse of a traveler [body] | bottom-of-the-well ambush [aura]
[concept] identity: The thing in the well waits in black water at the bottom of a shaft, wearing the shape of a drowned traveler or a pale hand that seems to reach for rescue; when prey leans close enough to grasp it, it uncoils into a long, ropy corpse and drags them down. Each round it crushes and holds victims beneath the surface, preferring to submerge and smother rather than bite, and it abandons the well only if dragged out — even then it grapples and drowns like the water it came from. It toys with prey by timing its grab to the moment of hesitant rescue, showing just enough humanity to bait the merciful.
[concept] lore: A traveler drowned in the well and was never pulled out; the water kept the body, and the well now keeps the traveler inside it, hungry for anyone who looks down.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] inline declared: "the traveler" — the call's own answer (kind), built from the name; the rules would have said "Traveler"
[reskin] inline on kit rows: "Traveler" -> "the traveler"
[reskin] inline form: "the traveler" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no bite" quotes nothing the user typed
[reskin] lacks refused: "no weapons" quotes nothing the user typed
[reskin] lacks refused: "no voice" quotes nothing the user typed
[reskin] lacks refused: "no legs" quotes nothing the user typed
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The traveler seizes a grappled victim and hauls them straight down beneath whatever water or muck it lurks in. The victim is pinned under the surface, suffocating and unable to break free until they tear loose or the traveler is forced to let go." [action/always/condition] — menu: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: hook-drag, obstacle-pull, swallow, pull-through, drain, hook-rider — the key word does not mean the mechanic here
[reskin] value check: "Undertow Pin" EV 10.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] signature template: exploiter -> Actions/"Undertow Pin" ("The traveler seizes an already-grappled victim and hauls them down beneath the w [verb: grappled:idea, downed:idea, pinned:idea]")
[reskin] signature idea (trait): "The traveler's body is a waterlogged corpse that remembers drowning. Anyone who grapples it or strikes it with a natural weapon gets a numbing, bone-deep chill that saps the strength from their grip and makes them sluggish and clumsy." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: adhesive, undead-fortitude — the key word does not mean the mechanic here
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): heated-body -> Traits/"Drowned Chill" ("A creature that grapples it or strikes it with a natural weapon suffers a numbin [shape fit, no verb match]")
[reskin] weapons answered: Grasping Hand = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Undertow Pin.
```


---


### Shield-Sworn Oath — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shield-Sworn Oath | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Gauntlet); nova none; dmg 52

```
Shield-Sworn Oath

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the oath, the oath and its allies have Advantage on attack rolls and saving throws, provided the oath doesn't have the Incapacitated condition.

Actions

Multiattack. The oath makes two attacks, using Gauntlet or Hurl and Close in any combination.

Gauntlet. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Hurl and Close. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 26 (5d8 + 4) Bludgeoning damage.

Bonus Actions

Gauntlet Reprisal. One creature within 5 feet that hit the oath with an attack roll since the end of the oath's last turn takes 10 (3d6) Bludgeoning damage.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "a knight-errant of the fallen order"
- Actions/Multiattack — the chassis
- Actions/Gauntlet — the chassis
- Actions/Hurl and Close — the chassis
- Bonus Actions/Gauntlet Reprisal — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=forged/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield wall defense [behavior] | punishing counterattacks [behavior] | battered iron bulwark [object]
[concept] identity: The Shield-Sworn Warden plants itself between the weak and the blade, its battered bulwark raised as a silent oath made iron. Each round it holds the line, redirecting blows meant for allies and punishing any foe who tries to slip past with a brutal, bone-breaking counter. It does not yield ground; when bloodied, it only sets its feet wider and fights until the last, for its duty ends only in death or victory.
[concept] lore: A remnant of the Fallen Order, this knight-errant wanders the broken roads, seeking to atone for a betrayal it can never forget by shielding the helpless from the same fate.
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the oath" — the call's own answer (kind), built from the name
[reskin] inline form: "the oath" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] signature idea (action): "The knight batters its shield against a foe to drive it back and pin it in place, then roots itself beside an ally within reach, taking that ally's place in the line. While it guards, any blow that would land on the ally is met by the knight instead — the shield answers for the one it shields, so long as the knight still breathes and has not been knocked senseless." [action/always/defense] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: push-prone, seal — the key word does not mean the mechanic here
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The knight batters its shield against a foe to drive it back and pin it in place, then roots itself beside an ally within reach, taking that ally's place in the line. While it guards, any blow that would land on the ally is met by the knight instead — the shield answers for the one it shields, so long as the knight still breathes and has not been knocked senseless." [action/always/defense] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, own-turn-punisher)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: herd (EV 9.8 vs 42.3)
[reskin] fallback skipped by the floor: terror-pulse (EV 27.5 vs 42.3)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 13)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The oath's battered iron bulwark is never truly lowered; while it remains standing and not incapacitated, the first strike that would land on it or an ally sheltered behind it is turned aside by the shield's worn face. The iron answers wherever the shield is raised, and the shield is always raised." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] trait declined: "Bulwark Unlowered" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Gauntlet = none; Shield Bash = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Gauntlet Reprisal"
```


---


### Mirewife's Broodpot — in the run

**Concept:** a bog witch's iron cauldron that vents scalding steam over whatever climbs in

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mirewife's Broodpot | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 9 → 8; sustained 62 (2 × Iron Rim); nova none; dmg 62

```
Mirewife's Broodpot

Large Construct, Lawful Neutral

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft.

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

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Clamping Scald. A creature that touches the broodpot or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Fire damage.

Actions

Multiattack. The broodpot makes two Iron Rim attacks. It can replace one attack with a use of Sealing Lid.

Iron Rim. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Bludgeoning damage plus 13 (3d8) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Sealing Lid. Dexterity Saving Throw: DC 15, one creature within 30 feet that has the Grappled condition. Failure: 40 (9d8) Fire damage. Success: Half damage.

Bonus Actions

Swallow. The broodpot swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the broodpot, and takes 10 (3d6) Fire damage at the start of each of the broodpot's turns. The broodpot can have only one creature swallowed at a time. If the broodpot takes 25 damage or more on a single turn from the swallowed creature, the broodpot must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the broodpot. If the broodpot dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
- Actions/Iron Rim — the chassis
- Actions/Sealing Lid — template condition-payoff; library draw (seed unstamped); binds the GM's words: caught
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Clamping Scald — template heated-body; library draw (seed unstamped); binds the GM's words: scald+iron

**Engine trace**

```
[route] brute-grappler type=Construct mechanics=grapple, engulf, breath — brute-grappler: ✓ ("whatever climbs in") | brute-grappler: key "climbs in" (class verb)
[concept] name: provided_name rejected — "a bog witch's iron cauldron…" is the description, not a name
[concept] hints: binder→style ✗ ("a bog witch's iron cauldron")
[concept] resolve: archetype=brute type=Construct themes=forged/devouring mind=mindless style=grappler energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, breath
[concept] signature elements: scalding steam vented over prey [behavior] | iron cauldron body with clamping lid [object] | bog witch's abandoned vessel [aura]
[concept] identity: The cauldron waits, squat and iron, its rim yawning like a mouth in the bog-muck. It doesn't chase; it simply remains, baiting the curious with a lid that clangs inviting, and when something climbs in, the whole pot shudders, clamping down and flooding itself with scalding steam until the prey is boiled in its own shell. It fights to the last rivet, a stubborn iron womb that would rather die than open.
[concept] lore: Bolted together by a bog witch who fed it her rivals and then her own blood, the cauldron now hunts alone, forever seeking a cook it can never find.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] inline declared: "the broodpot" — the call's own answer (kind), built from the name
[reskin] inline form: "the broodpot" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a bog witch's iron cauldron" -> has (descriptive), head | "vents scalding steam over whatever climbs in" -> has (descriptive)
[reskin] signature idea (action): "The cauldron slams its lid down and holds it, turning the whole pot into a sealed pressure vessel. While it stays clamped shut, scalding steam roars around everything it has already caught, and anyone standing in the blast is scalded too. The lid is the whole point: it will not open even to save itself, so the broodpot can be worn down but never pried apart while the clamp holds." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, zone-seed, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — zone-seed (steam)
[reskin] value check: "Sealing Lid" EV 31 vs floor 16.6 (one attack of 2) — dice 63 → 40 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Sealing Lid" ("The broodpot slams its lid down and scalds everything already caught inside and  [verb: caught:idea]")
[reskin] signature idea (trait): "The iron body clamps down on anything that wounds it from close range, forcing the lid tighter rather than flinching. Every blow landed against the pot while the lid is shut simply feeds the steam, so hurting it up close is how the scalding gets worse, not how the cauldron breaks." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Clamping Scald" ("The pot's iron body clamps down and scalds anything that strikes or touches it u [verb: scald:concept, iron:concept]")
[reskin] weapons answered: Iron Rim = none; Scalding Clamp = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] multiattack replacement clause: It can replace one attack with a use of Sealing Lid.
audit finding below confidence gate: Sealing Lid The name promises a physical lid or seal action, but the text only deals Fire damage to an already-Grappled target with no sealing, lid, or containment mechanic expressed.
```


---


### Seraphine Vow — in the run

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Seraphine Vow | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Searing Brand); nova none; dmg 54

```
Seraphine Vow

Medium Humanoid, Lawful Good

AC 17
Initiative +2 (12)

HP 135 (18d8 + 54)

Speed 30 ft.

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
16
+3
+6
CHA
18
+4
+7

Skills Athletics +8, Persuasion +7

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Seraphine, Seraphine and its allies have Advantage on attack rolls and saving throws, provided Seraphine doesn't have the Incapacitated condition.

Actions

Multiattack. Seraphine makes three attacks, using Radiant Blade or Searing Brand in any combination.

Radiant Blade. Melee Attack Roll: +8, reach 5 ft. 9 (1d8 + 5) Slashing damage plus 7 (2d6) Radiant damage.

Searing Brand. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Fire damage.

Bonus Actions

Lay on Hands (2/Day). Seraphine touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Seraphine charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Reprisal of the Vow. One creature within 5 feet that hit Seraphine with an attack roll since the end of Seraphine's last turn takes 7 (2d6) Bludgeoning damage.

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

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Radiant Blade — weapon longsword
- Actions/Searing Brand — the chassis
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Reprisal of the Vow — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("smites and mends")
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: Smites the unclean with radiant fury [behavior] | Mends injured soldiers [behavior] | Iron-willed commander [body]
[concept] identity: The Oathsworn Crusader opens by planting her banner and calling down a radiant smite on the nearest unclean foe, then settles into a combat loop of punishing the impure with holy fire while knitting the wounds of her allies. She fights shoulder-to-shoulder with her soldiers, her aura of authority and her parry protecting them from harm; she never retreats, believing her oath demands she stand until the last enemy is cleansed or she falls.
[concept] lore: Forged in the fires of a holy crusade, she wanders the blighted lands seeking to purge corruption and rally the faithful, her iron will and burning blade a beacon against the dark.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] name_element answered: Radiant Blade = imagery; Searing Smite = imagery
[reskin] name element refused: "Radiant Blade" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] name element refused: "Searing Smite" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] repair round 1: 1 defect(s) — "Searing Smite" deals Fire on a Humanoid whose concept names no Fire — a name is not a warrant; use a physical type
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Seraphine" — the call's own answer (person), built from the name
[reskin] inline form: "Seraphine" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Radiant Blade" promises Radiant, so the rider stands on a Humanoid the concept never called radiant
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (descriptive) | "mends her soldiers" -> has (descriptive)
[reskin] signature idea (action): "Seraphine calls down a pillar of holy fire on a foe she can see, far or near. The smite clings to the unclean, searing them with radiant judgment that keeps burning until an ally of Seraphine stands beside them and pulls them back toward the light." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: curse-debt, reveal — the key word does not mean the mechanic here
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Seraphine calls down a pillar of holy fire on a foe she can see, far or near. The smite clings to the unclean, searing them with radiant judgment that keeps burning until an ally of Seraphine stands beside them and pulls them back toward the light." [rider/on_hit/damage] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, obstacle-pull, herd, curse-debt, reveal)
[reskin] fallback respects the call: coating (already on the sheet), rally left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Seraphine's oath-rooted will does not break while her soldiers still stand; when an ally beside her is hurt, she can answer with an unflinching command that shores up their defense instead of letting fear take hold." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] word match declined by the call: guarded-stance, bloodied-fury, berserk, relentless-pursuit, phobia, warded-mending, false-appearance — the key word does not mean the mechanic here
[reskin] key match declined: trait — "warded-mending" was ranked first on the call's own menu for mend+mends+mending, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Seraphine's oath-rooted will does not break while her soldiers still stand; when an ally beside her is hurt, she can answer with an unflinching command that shores up their defense instead of letting fear take hold." [trait/always/defense] — the model found no template that holds it (offered: warded-mending, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] concept-first trait skipped: warded-mending — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Radiant Blade = Longsword; Searing Smite = none
[reskin] resistances derived: Fire
[reskin] audit rewrite blocked — "Aura of Authority" is engine-authored chassis text
[reskin] audit rename: "Answering Sting" -> "Reprisal of the Vow"
[reskin] audit rename: "Searing Smite" -> "Searing Brand"
[reskin] audit rename blocked — "Divine Smite (2/Day)" is the user's own part name, a kit feature's real name, or print's own row
[reskin] row narrowed: "Searing Brand" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---


### Unmoved Stone Templar — in the run

**Concept:** name: Templar of the Unmoved Stone | a templar who guards a standing stone and never yields ground

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmoved Stone Templar | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Stoneweight Iron); nova none; dmg 26

```
Unmoved Stone Templar

Medium Humanoid, Lawful Neutral

AC 19
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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The stone templar makes two attacks, using Stoneweight Iron or Hurlstone in any combination.

Stoneweight Iron. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Hurlstone. Ranged Attack Roll: +6, range 30/120 ft. 13 (2d8 + 4) Bludgeoning damage.

Bonus Actions

Stone Reprisal. One creature within 5 feet that hit the stone templar with an attack roll since the end of the stone templar's last turn takes 6 (1d12) Bludgeoning damage.

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
- Actions/Stoneweight Iron — weapon mace
- Actions/Hurlstone — the chassis
- Bonus Actions/Stone Reprisal — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | brute-juggernaut: a Humanoid is not a made thing | defender: ✓ ("never yields ground") | defender: key "guards a" (class verb)
[concept] name: provided_name rejected — "Templar of the Unmoved Stone…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: never yields ground beside its standing stone [behavior] | stone-braced shield and iron armor [object] | immovable, unmoved aura of the standing stone [aura]
[concept] identity: The Templar of the Unmoved Stone plants itself beside its standing stone and does not take a single step back, opening combat by raising its shield and daring foes to try the line. Every round after, it strikes with stone-weighted iron at anyone who closes, and braces—shrugging off forced movement and turning any attempt to slip past into a punishing counter. Under pressure it fights to the death without hesitation, a living bulwark that flees only if its stone itself is broken.
[concept] lore: Sworn to a standing stone that has never fallen, this templar draws its stubborn endurance from the ancient rock it guards, and it will die where it stands before letting a single enemy pass.
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Templar of the Unmoved Stone — a templar": nothing to add — the sheet already answers it
[reskin] inline declared: "the stone templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the stone templar" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "never yields ground", "never lets a single enemy pass"
[reskin] clauses: "Templar of the Unmoved Stone — a templar" -> has (descriptive), head | "guards a standing stone" -> has (descriptive) | "never yields ground" -> LACKS (mechanical)
[reskin] signature idea (action): "The templar slams its stone-weighted iron into the ground, and the shock runs through the earth to everyone standing near it — friend and foe alike stagger as if the ground itself refused them. Those caught off balance cannot leave the templar's side while it stands, so the line holds even against a crowd trying to slip around it." [action/save/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, blighted-ground (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — blighted-ground (ground)
[reskin] nova declined: "Stoneshock Rebuke (Recharge 5-6)" — a whole-round ability the GM never asked for: neither the call nor the key table finds the GM asking for it (the idea's own words: around it:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 7.3)
[reskin] fallback skipped by the floor: push-prone (EV 1.9 vs 7.3)
[reskin] fallback skipped by the floor: herd (EV 5.5 vs 23.7)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Iron and stone remember every blow struck against them: whenever a foe strikes the templar and fails to break its guard, the ringing shock rebounds into that attacker's arms, leaving it bruised and slowed for a breath. Standing still beside the stone keeps the gift strong — only a templar that abandons its post loses the ring of the anvil." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — false-appearance, guarded-stance (stone, guard)
[reskin] word match declined by the call: bound, false-appearance, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Anvil Rebound" — bound only on the idea's own words (ring:idea, iron:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Stoneweight Iron = mace; Hurlstone = none
[reskin] weapon declared: "Stoneweight Iron" is a mace — the call's own answer
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Stone Reprisal"
```


---

## Review batch — stage1b-2026-10-16T14-47-47

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar of the Unmoved Stone | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Final Toll | 13 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Rotgnaw Swarmlord | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 6/6 |
| Thing in the Well | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Pit-Called Gravecrawler | 6 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/4 |

**Dropped 0 of 7 user clauses** (coverage 100%); concept share 71% (15/21 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8 / reader: 1



---


### Templar of the Unmoved Stone — lowest CR

**Concept:** name: Templar of the Unmoved Stone | a templar who guards a standing stone and never yields ground

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar of the Unmoved Stone | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Shield); nova none; dmg 26

```
Templar of the Unmoved Stone

Medium Humanoid, Lawful Neutral

AC 19
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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Templar makes two attacks, using Shield or Handaxe in any combination.

Shield. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 13 (2d8 + 4) Slashing damage.

Bonus Actions

Retributive Riposte. One creature within 5 feet that hit Templar with an attack roll since the end of Templar's last turn takes 6 (1d12) Bludgeoning damage.

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
- Actions/Shield — the chassis
- Actions/Handaxe — weapon handaxe
- Bonus Actions/Retributive Riposte — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender: ✓ ("never yields ground") | defender: key "guards a" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: provided "Templar of the Unmoved Stone"
[concept] mechanics: none claimed
[concept] signature elements: never yields ground [behavior] | iron-shod stance and shield [body] | the standing stone he guards [object]
[concept] identity: The Templar of the Unmoved Stone plants itself before its standing stone and never takes a step back, meeting every charge with a shield that has never known retreat. Each round it answers any creature that tries to slip past it with a punishing blow that pins them in place, its stance as fixed as the stone it guards. It fights to the death without flinching, not out of rage but out of duty — retreat is a betrayal it cannot comprehend.
[concept] lore: Sworn at the stone's foot in an age before roads, the Templar's oath is not to a king or god but to the stone itself: whoever takes one step back abandons the world to what the stone holds down.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Templar of the Unmoved Stone — a templar": nothing to add — the sheet already answers it
[reskin] proper noun: "Templar of the Unmoved Stone" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline by rule: "Templar" — the call answered "the stone" (kind), which the name does not support
[reskin] energy rider withheld: Thunder on a Humanoid with no Thunder in the concept's own words
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "never yields ground"
[reskin] lacks refused: "no retreat" quotes nothing the user typed
[reskin] clauses: "Templar of the Unmoved Stone — a templar" -> has (descriptive), head | "guards a standing stone" -> has (descriptive) | "never yields ground" -> LACKS (mechanical)
[reskin] signature idea (action): "The templar slams its shield into the ground and becomes the stone's own wall. Every enemy near it that tries to move away from the stone, or past the templar, is yanked to a halt by the sheer weight of the stance and takes a brutal shield blow that leaves them pinned where they stand for a few heartbeats." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, blighted-ground (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — blighted-ground (ground)
[reskin] word match declined by the call: shield-bash, push-prone, obstacle-pull, hook-rider — the key word does not mean the mechanic here
[reskin] key match declined: action — "blighted-ground" was ranked first on the call's own menu for ground, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The templar slams its shield into the ground and becomes the stone's own wall. Every enemy near it that tries to move away from the stone, or past the templar, is yanked to a halt by the sheer weight of the stance and takes a brutal shield blow that leaves them pinned where they stand for a few heartbeats." [action/always/condition] — the model found no template that holds it (offered: blighted-ground, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally, hook-rider)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: disarm (EV 0 vs 7.3)
[reskin] fallback skipped by the floor: herd (EV 5.5 vs 23.7)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The templar's iron-shod stance makes every step a commitment; whenever it is hit or shoved, it can choose to root itself in place, halving any forced movement and immediately answering the attacker with a shield bash that pushes them back." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — guarded-stance, false-appearance (guard, stone)
[reskin] word match declined by the call: guarded-stance, false-appearance, resonant-body, aberrant-ground, absorption, bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] key match declined: trait — "guarded-stance" was ranked first on the call's own menu for guard, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The templar's iron-shod stance makes every step a commitment; whenever it is hit or shoved, it can choose to root itself in place, halving any forced movement and immediately answering the attacker with a shield bash that pushes them back." [trait/on_being_hit/movement] — the model found no template that holds it (offered: guarded-stance, false-appearance, absorption, bloodied-burst, resonant-body, weapon-lodge, aberrant-ground)
[reskin] weapons answered: Shield = none; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Retributive Riposte"
```


---


### Final Toll — highest CR

**Concept:** a bell-shrouded reaper that finishes the dying with a final toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Final Toll | 13 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (2 × Bell); nova none; dmg 90

```
Final Toll

Medium Undead, Neutral

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 5 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
6
-2
-2
INT
12
+1
+1
MOD
SAVE
DEX
20
+5
+10
WIS
14
+2
+2
MOD
SAVE
CON
18
+4
+4
CHA
15
+2
+2

Skills Stealth +10

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 120 ft.; Passive Perception 12

Languages Common plus the languages it knew in life

CR 13 (XP 10,000; PB +5)

Traits

Death Knell. The final toll knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Incorporeal Movement. The final toll can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the final toll has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The final toll makes two Bell attacks.

Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage.

Bonus Actions

Funeral Peal (2/Day). The final toll fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the final toll's next turn.

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

- Traits/Death Knell — template faultless-tracker; library draw (seed unstamped); binds the GM's words: marked
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Multiattack — the chassis
- Actions/Bell — the chassis
- Bonus Actions/Funeral Peal — library seed zone-seed; binds the GM's words: shroud

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=aura — lurker-phantom: ✓ ("bell-shrouded reaper") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Undead themes=grave/terror mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the final toll that finishes the dying [behavior] | bell-shrouded spectral body [body] | aura of encroaching death [aura]
[concept] identity: The Bell-Shrouded Reaper drifts through walls and darkness to reach the dying, then rings its shrouded bell to toll the final moment of any creature at death's door. Each round it hunts the bloodied and the dying, its bell-blast snuffing out their remaining life and turning the energy into a bone-deep chill that spreads through the living. It shows no fear and never flees — a patient executioner that must be destroyed utterly or it will simply wait for the next sunset.
[concept] lore: Born from the unclaimed dead of plague pits and forgotten battlefield cairns, the Bell-Shrouded Reaper exists to ring the final toll for those whose lives were left unfinished, and it will not rest until every dying soul within its reach hears the bell that marks its end.
[reskin] donor: lurker-5-phantom -> CR 13
[reskin] inline by rule: "the final toll" — the call answered "the final toll" (kind), which the name does not support
[reskin] inline form: "the final toll" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a bell-shrouded reaper" -> has (descriptive), head | "finishes the dying with a final toll" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The final toll reaches into every creature already at death's door, as if the bell itself were rung inside their skulls. Each one hears their own final bell and must resist being finished where they stand; those that fall give up their last warmth, which rolls out as a bone-deep chill through nearby living creatures." [action/always/damage] — menu: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike, slow-bolt — the key word does not mean the mechanic here
[reskin] signature miss: action — "The final toll reaches into every creature already at death's door, as if the bell itself were rung inside their skulls. Each one hears their own final bell and must resist being finished where they stand; those that fall give up their last warmth, which rolls out as a bone-deep chill through nearby living creatures." [action/always/damage] — the model picked "wail" (no verb, and it quotes nothing the GM typed) over a concept-verb template (active-toll, sensory-strike, zone-seed)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback floor waived: zone-seed — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)
[reskin] value check: "Clinging Murk (2/Day)" EV 0 vs floor 76.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] library seed drawn: zone-seed -> Actions/"Clinging Murk (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bell the reaper carries is a shroud of sound that never stops ringing softly, and no matter how far it drifts or how thick the walls, every dying creature within its reach hears the toll. The sound clings to them, marking them as already claimed." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst — the key word does not mean the mechanic here
[reskin] signature template (trait): faultless-tracker -> Traits/"Death Knell" ("The toll clings to the dying and marks them as already claimed; the Final Toll a [verb: marked:idea]")
[reskin] weapons answered: Bell = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] dead control row: "Clinging Murk (2/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] audit rename: "Clinging Murk (2/Day)" -> "Funeral Peal (2/Day)"
```


---


### Rotgnaw Swarmlord — a 2024 sheet

**Concept:** a plague-rat swarmlord whose bite rots the wound so it will not close

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rotgnaw Swarmlord | 8 | skirmisher-8 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | FAIL: save-fit |

- headerBody · soft · lint:beast-intelligence: type Beast with INT 10 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- reader · fail · save-fit: Actions/Rat Tide: a Strength save for an effect that calls for Constitution
- read: def 6 / off 10 → 8; sustained 57 (3 × Swarmlord Whose Bite); nova Rat Tide 44; dmg 67

```
Rotgnaw Swarmlord

Medium Beast, Unaligned

AC 17
Initiative +5 (15)

HP 135 (18d8 + 54)

Speed 40 ft.

MOD
SAVE
STR
14
+2
+2
INT
10
+0
+0
MOD
SAVE
DEX
20
+5
+8
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +8

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Rotgnaw Reprisal. A creature that touches the swarmlord or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Necrotic damage.

Verminous Slip. The swarmlord ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The swarmlord makes three Swarmlord Whose Bite attacks.

Swarmlord Whose Bite. Melee Attack Roll: +8, reach 5 ft. 19 (4d6 + 5) Piercing damage.

Rat Tide (Recharge 5-6). Strength Saving Throw: DC 16, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 44 (8d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Fleet Agility. The swarmlord takes the Dash or Disengage action.

Feeding Frenzy (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the swarmlord moves up to half its Speed without provoking Opportunity Attacks, and it makes one Swarmlord Whose Bite attack.

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

- Traits/Rotgnaw Reprisal — template heated-body; library draw (seed unstamped); binds the GM's words: plague
- Traits/Verminous Slip — the chassis
- Actions/Multiattack — the chassis
- Actions/Swarmlord Whose Bite — authored for this sheet; a named part; the GM's clause "a plague-rat swarmlord whose bite rots the wound so it will not close"
- Actions/Rat Tide — the chassis
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Feeding Frenzy — library seed rampage; binds the GM's words: wound

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — swarm: a swarm is a mass of many — no mass in the words | skirmisher: ✓ ("swarmlord") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=venomous/bestial mind=bestial style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bite that rots wounds so they will not close [behavior] | swarm of plague rats [body] | hit-and-run skirmishing through the swarm [behavior]
[concept] identity: The swarmlord opens by sending its rat tide to flank and harry, then darts in for a single rotting bite before retreating behind the mass of vermin. Every round it repeats this hit-and-run, letting its swarm absorb punishment while its unclosing wounds bleed prey dry. Bloodied, it does not flee—it goes feral, diving into the swarm and biting with reckless abandon.
[concept] lore: Born in the filth of a collapsed plague-pit, the swarmlord is the rat that ate the diseased dead and grew fat on their rot, now seeking to spread its unhealing gift to every warm body above.
[reskin] nova capped: "Sweeping Area Attack" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8 -> CR 8
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] named parts: Swarmlord Whose Bite (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the swarmlord" — the call's own answer (kind), built from the name; the rules would have said "Rotgnaw"
[reskin] inline on kit rows: "Rotgnaw" -> "the swarmlord"
[reskin] inline form: "the swarmlord" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] final price: the round ran 42 against the card's 60 — the attack rows re-solve at 143% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "a plague-rat swarmlord whose bite rots the wound so it will not close" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a plague-rat swarmlord whose bite rots the wound so it will not close" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the swarmlord's bite strikes a living creature, the wound is seeded with plague-rot and refuses to close. For the rest of the fight, whenever that wounded creature is hit by any bite, including the swarmlord's own, the wound tears open again and bleeds freely, costing it vitality in a way that no mere rest or bandage can mend." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, gaze-single, snare, reel, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — affliction, contagion (wound, rot, plague, plagued)
[reskin] word match declined by the call: affliction, contagion, delayed-brand — the key word does not mean the mechanic here
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound+rot, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the swarmlord's bite strikes a living creature, the wound is seeded with plague-rot and refuses to close. For the rest of the fight, whenever that wounded creature is hit by any bite, including the swarmlord's own, the wound tears open again and bleeds freely, costing it vitality in a way that no mere rest or bandage can mend." [rider/on_hit/damage] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge, delayed-brand, riposte)
[reskin] fallback respects the call: delayed-brand left the shelf — the call declined it for this sheet
[reskin] value check: "Rampage (1/Day)" EV 12.7 vs floor 2.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The swarmlord is never truly alone; a crawling mass of plague rats clings to its hide and spills around its feet. Any enemy that crowds it in melee must fight through a biting, scratching aura of vermin that punishes every opening they give it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — noxious-aura, bloodied-fury, heated-body, bloodied-burst (rot, wounded, plague)
[reskin] signature template (trait): heated-body -> Traits/"Vermin Carapace" ("the idea is a biting, scratching aura of vermin clinging to the swarmlord that p [verb: plague:concept]")
[reskin] weapons answered: Bite = none; Rat Tide = none
[reskin] chassis nova: "Rat Tide (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] audit rename: "Vermin Carapace" -> "Rotgnaw Reprisal"
[reskin] audit rename: "Rampage (1/Day)" -> "Feeding Frenzy (1/Day)"
```


---


### Pit-Called Gravecrawler — one marked soft

**Concept:** a gravecrawler that drags the living into its pit and will not let go

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit-Called Gravecrawler | 6 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4.5 (print at 6 reads 3–8, n=42)
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Bone Hooks); nova none; dmg 40

```
Pit-Called Gravecrawler

Medium Undead, Neutral

AC 14
Initiative -1 (9)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages None

CR 6 (XP 2,300; PB +3)

Traits

Grave-Soil Spray. A creature that touches the pit-called gravecrawler or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Necrotic damage.

Actions

Multiattack. The pit-called gravecrawler makes two Bone Hooks attacks. It can replace one attack with a use of Pitward Haul.

Bone Hooks. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Pitward Haul. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward the pit-called gravecrawler by its bone hooks and has the Grappled condition (escape DC 15).

Bonus Actions

Entomb. The pit-called gravecrawler entombs one Medium or smaller creature it is grappling. While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the pit-called gravecrawler, and takes 7 (2d6) Necrotic damage at the start of each of the pit-called gravecrawler's turns. The pit-called gravecrawler can have only one creature entombed at a time. If the pit-called gravecrawler takes 15 damage or more in a single turn from the entombed creature, the pit-called gravecrawler must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the pit-called gravecrawler. If the pit-called gravecrawler dies, an entombed creature breaks free Prone by using 5 feet of movement.

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
- Actions/Bone Hooks — the chassis
- Actions/Pitward Haul — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+hook+pull+haul
- Bonus Actions/Entomb — binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Traits/Grave-Soil Spray — template heated-body; library draw (seed unstamped); binds the GM's words: touch+splinter

**Engine trace**

```
[route] brute-grappler type=Undead mechanics=grapple, engulf — brute-grappler: ✓ ("drags the living into its pit and will n") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/grasping mind=mindless style=grappler energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: drags the living into a pit [behavior] | will not let go [behavior] | body of packed grave-soil and corpse-limbs [body]
[concept] identity: The gravecrawler hauls itself from its pit with a lurching, hungry patience, opening by sinking its hooked bone-limbs into the nearest living thing and pulling it toward the shallow grave. Every round it drags its prey closer to the pit's lip, tightening its death-grip while mindlessly resisting any attempt to shake free; it does not flee and cannot be reasoned with, fighting until it is destroyed or it has fed.
[concept] lore: Born from the mass grave of a collapsed plague pit, the gravecrawler is the pit's hunger given limbs, and it wants only to add one more body to the pile it was made from.
[reskin] donor: brute-5-grappler -> CR 6
[reskin] engulf engine: Entomb — the body's own verb
[reskin] inline declared: "the pit-called gravecrawler" — the call's own answer (kind), built from the name
[reskin] inline form: "the pit-called gravecrawler" — the model's own reading of the name
[reskin] lacks asked: "does not flee"
[reskin] lacks refused: "cannot be reasoned with" quotes nothing the user typed
[reskin] clauses: "a gravecrawler" -> has (descriptive), head | "drags the living into its pit" -> has (mechanical) | "will not let go" -> LACKS (mechanical)
[reskin] signature idea (action): "The gravecrawler drives its hooks into the ground and hauls, dragging every creature it holds and everything entombed in its body toward its pit. This shrieking pull moves the gravecrawler and its captives as one mass, dumping them at the pit's edge or into the grave it came from, and any creature that strikes at it during the drag risks being yanked along with the sliding corpse-soil." [action/always/movement] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-rider (drag, drags)
[reskin] value check: "Pitward Haul" EV 11.6 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Pitward Haul" ("the gravecrawler drives its hooks into the ground and hauls creatures it holds a [verb: drag:concept, hook:idea, pull:idea, haul:idea]")
[reskin] keys spent by the action: drag
[reskin] signature idea (trait): "The gravecrawler's body is packed grave-soil, rotting hands, and splintered coffin wood; any creature that lands a telling blow on it is sprayed with the pit's filth, and for a moment the living flesh touched by that soil starts to bloat and blacken as if it were already buried." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Grave-Soil Spray" ("The idea is a creature whose body is packed with grave-soil that sprays onto any [verb: touch:idea, splinter:idea]")
[reskin] weapons answered: Bone Hooks = none
[reskin] languages held: None stands — INT 4 on a Undead speaks nothing, whatever the mind read said
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Pitward Haul.
audit finding below confidence gate: Entomb The Entomb entry requires the GM to track cumulative damage from a single entombed creature within a turn, and provides no guidance on what happens if the gravecrawler takes damage from other sources while a creature is entombed (e.g., whether the release clause is shared, how to resolve multiple triggers), making mid-combat adjudication cumbersome.
[reskin] escape dc: Pitward Haul → DC 15 (8 + PB + STR; a late row wore another number)
```


---


### Thing in the Well — in the run

**Concept:** name: Thing in the Well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thing in the Well | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Brine-Sleeve); nova none; dmg 38

```
Thing in the Well

Medium Aberration, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Climb 20 ft., Swim 10 ft.

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

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. Thing makes two Brine-Sleeve attacks. It can replace one attack with a use of Hooked Lash.

Brine-Sleeve. Melee Attack Roll: +6 (with Advantage if the target is Grappled by Thing), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Hooked Lash. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward Thing by the swallowed line and has the Grappled condition (escape DC 14).

Bonus Actions

False Form. Thing shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Brine-Sleeve — the chassis
- Actions/Hooked Lash — template hook-drag; library draw (seed unstamped); binds the GM's words: chain+drag+reel+haul
- Bonus Actions/False Form — the chassis

**Engine trace**

```
[route] lurker-trap type=Aberration mechanics=none — lurker-trap: ✓ ("Thing in the Well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Aberration themes=devouring/aquatic mind=sapient style=trap energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Thing in the Well"
[concept] mechanics: none claimed
[concept] signature elements: disguised as clean well water [body] | drags victims down into a flooded shaft [behavior] | drowns engulfed prey in its own brine [behavior]
[concept] identity: The Thing in the Well waits at the bottom of its shaft in the shape of clear, inviting water, and when a bucket or a curious face descends it unfolds upward — a boneless sleeve of brine that swallows the offering whole and drags down whatever is attached to it. Every round thereafter it hauls against the rope, engulfing grappled prey into its flooded interior and drowning it against the stone walls, fighting to the last of its dark below the waterline; wounded, it simply sinks and lets the well refill over it, a trap that resets itself.
[concept] lore: Born of a sacrifice thrown into a dry well and the centuries of drowned things that followed, the Thing in the Well wants only to keep the water level high — with bones, with buckets, with anyone who leans too far over the rim.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] proper noun: "Thing in the Well" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline by rule: "Thing" — the call answered "the well" (kind), which the name does not support
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thing in the Well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The Thing reels in a rope, chain, or line it has swallowed, hauling whatever is tied to it down toward the water at a frightening speed. Anyone holding the other end must choose between letting go and being dragged down into the flooded shaft with it." [action/always/movement] — menu: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Hooked Lash" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Hooked Lash" ("The Thing reels in a swallowed line, hauling whatever is tied to it toward the f [verb: chain:idea, drag:idea, reel:idea, haul:idea]")
[reskin] signature idea (trait): "Wounded, the Thing sinks out of reach and lies still in its true shape; the well slowly refills over it until it is hidden again under clean-looking water. Only by draining the well or striking before the water settles can a hunter keep it from starting fresh." [trait/always/movement] — menu: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Wounded, the Thing sinks out of reach and lies still in its true shape; the well slowly refills over it until it is hidden again under clean-looking water. Only by draining the well or striking before the water settles can a hunter keep it from starting fresh." [trait/always/movement] — the model found no template that holds it (offered: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Brine-Sleeve = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Hooked Lash.
```


---

## Review batch — classes-eight-2026-10-16T15-53-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open Palm | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Ashvowed Kesh | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Halloran | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Korgan the Scarred Hermit | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Templar Vowsworn | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Hollow Courtier | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 3/5 |
| Sister Aurelia | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Shadowsedge Shinobi | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/7 |
| Pine Barrens Toll-Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brass Penny Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Warren Maze-Bull | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 4/6 |
| Shield-Sworn Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Whisker Tithe | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |

**Dropped 1 of 19 user clauses** (coverage 95%); concept share 68% (57/84 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / reader: 2



---


### Pine Barrens Toll-Pack — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pine Barrens Toll-Pack | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Pine Barrens Toll-Pack

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

Blood Scent Lock. The toll-pack knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Pack Tactics. The toll-pack has Advantage on an attack roll against a creature if at least one of the toll-pack's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The toll-pack makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Pack Predation (2/Day). The toll-pack has Advantage on the next attack roll it makes before the end of its turn.

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

- Traits/Blood Scent Lock — template faultless-tracker; library draw (seed unstamped); binds the GM's words: hunts+hunted
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's row, renamed
- Bonus Actions/Pack Predation — library seed focus; binds the GM's words: hunt

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: coordinated pack hunting tactics [behavior] | thick winter-weather hide and heavy frame [body] | dart-in, drag-and-release mobility [behavior]
[concept] identity: The dire wolf opens with a silent, coordinated encirclement — packmates spreading wide before the first feint draws the prey's eyes. Every round after, it lunges from an off-angle to seize a leg or flank, then drags and releases to let the pack close from the opposite side, never standing in one place through a full turn. Bloodied, it does not retreat alone; it breaks line only to draw pursuers into a kill-lane where the rest of the pack waits, fighting to the death as a unit rather than as twelve pounds of teeth.
[concept] lore: Bred in the deep pine barrens where winter never fully releases its grip, this dire wolf pack claims the old game trails as a toll road and takes its meat from anything that walks them.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the toll-pack" — the call's own answer (kind), built from the name
[reskin] inline form: "the toll-pack" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The toll-pack harries the prey with one beast feinting high and loud, drawing eyes and teeth, while two others break wide to drag the victim's legs into a different line of attack. The target cannot cover both angles: whichever way it turns, the next lunge comes from its blind flank, and the pack never lets it stand in one place through a full turn." [action/always/condition] — menu: trample, leap, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] fit declined: "Feinting Harrow" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its winter hide is thick with burrs and old scars, and its heavy frame keeps it moving through brush and snow that would slow anything slighter. When it charges across difficult ground, the terrain does not break its stride or its line." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] trait declined: "Brushbreaker Hide" — bound only on the idea's own words (snow:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): faultless-tracker — hunts+hunted in the user's words; the idea path had nothing
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hunts:concept, hunted:concept]")
[reskin] weapons answered: Fangs = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 40 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] print canon attack: "Fangs" -> "Bite" — the Dire Wolf's own row
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Circles" is the seat's, not the Dire Wolf's
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Pack Predation (2/Day)"
[reskin] audit rename: "Faultless Tracker" -> "Blood Scent Lock"
```


---


### Sister Aurelia — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sister Aurelia | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Sister Aurelia

Medium Humanoid, Lawful Neutral

AC 17
Initiative +2 (12)

HP 135 (18d8 + 54)

Speed 30 ft.

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
16
+3
+6
CHA
18
+4
+7

Skills Athletics +8, Persuasion +7

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sister Aurelia, Sister Aurelia and its allies have Advantage on attack rolls and saving throws, provided Sister Aurelia doesn't have the Incapacitated condition.

Actions

Multiattack. Sister Aurelia makes three attacks, using Longsword or Censer in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Censer. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Sister Aurelia touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Sister Aurelia charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Commanding Encouragement (2/Day). Each ally within 30 feet of Sister Aurelia gains 9 (2d8) Temporary Hit Points.

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

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Censer — weapon flail
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Commanding Encouragement — library seed rally; binds the GM's words: mend

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("fights in armor with a weapon")
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smiting the unclean with radiant strikes [behavior] | mending her soldiers through battlefield prayer [behavior] | aura of command and divine protection [aura]
[concept] identity: A battle-hardened crusader in battered, reliquary-studded iron mail, she opens by bellowing an oath that lights her blade with radiant fire and then wades into the unclean, smiting with every strike while her presence mends the wounds of the soldiers fighting in her aura. Each round she alternates between a thunderous, radiant smite against a foe and a field-mending prayer that restores her troops, and she never abandons her post—she fights to the death if her command is threatened, but will order a tactical retreat only to regroup and bless her surviving soldiers.
[concept] lore: Sworn to a militant order that holds that mercy to the unholy is betrayal, she marches with her company through plague-ridden borderlands, seeking to purify corruption with fire and sword while keeping her faithful soldiers standing through sheer force of devotion.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] repair round 1: 1 defect(s) — "Censer" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Sister Aurelia" — the call's own answer (person), built from the name; the rules would have said "the sister"
[reskin] inline on kit rows: "the sister" -> "Sister Aurelia"
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Censer" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (descriptive) | "mends her soldiers" -> has (descriptive)
[reskin] signature idea (action): "She names a single enemy as unclean with a commanding shout, and her weapon flares with radiant fire until that enemy is struck down or slips from her sight. While she is locked onto that target, her hits sear it with extra holy light that clings and burns, but if she turns her attention elsewhere the mark fades." [bonus_action/always/damage] — menu: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: aggro-curse, disarm, herd, second-wind, self-invisibility — the key word does not mean the mechanic here
[reskin] value check: "Unclean Verdict (2/Day)" EV 2.9 vs floor 45.6 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Unclean Verdict (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: coating (already on the sheet), disarm, herd left the shelf — the call declined them for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever she strikes down an unclean foe, a pulse of cleansing light washes out from the kill through the ranks of her nearby allies. Those soldiers feel their wounds close and their resolve harden, making them ready to hold the line she commands." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown warded-mending, which the GM's words keyed
[reskin] key match declined: trait — "warded-mending" was ranked first on the call's own menu for mend+mends+mending, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever she strikes down an unclean foe, a pulse of cleansing light washes out from the kill through the ranks of her nearby allies. Those soldiers feel their wounds close and their resolve harden, making them ready to hold the line she commands." [trait/always/resource] — the model found no template that holds it (offered: warded-mending, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] concept-first trait skipped: warded-mending — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Longsword = longsword; Censer = censer (flail)
[reskin] weapon declared: "Censer" is a flail — the call's own answer
[reskin] audit rewrite blocked — "Aura of Authority" is engine-authored chassis text
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Commanding Encouragement (2/Day)"
[reskin] row narrowed: "Censer" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---


### Open Palm — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Open Palm | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Open Palm

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 40 ft.

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The open palm can hold its breath for 15 minutes.

Marsh Stride. The open palm ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The open palm makes two attacks, using Open Palm or Pressure Dart in any combination.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Palm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Palm's next turn.

Pressure Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The open palm takes the Dash or Disengage action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the open palm moves up to half its Speed, and it makes one Open Palm attack.

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
- Traits/Marsh Stride — the chassis
- Actions/Multiattack — the chassis
- Actions/Open Palm — a declared feature; the GM's clause "strikes pressure points with an open hand"
- Actions/Pressure Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/venomous mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: Pressure-point strikes that disable and paralyze [behavior] | Reptilian hide and martial discipline [body] | Use of pack tactics to isolate prey [behavior]
[concept] identity: The Open Palm stalks its prey with cold patience, opening each fight from the shadows with a flurry of precise strikes to pressure points before melting back out of reach. Every round it circles, darting in to deliver enfeebling blows and using its allies as cover before retreating to safety. When bloodied, it does not flee—it focuses entirely on the most dangerous foe, seeking to paralyze or kill them with a single decisive touch.
[concept] lore: These lizardfolk ascetics wander the fetid marshes of their homelands, perfecting the art of unarmed combat as a form of spiritual transcendence; they believe that by mastering the body, one can touch the divine.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] repair round 1: 1 defect(s) — name "Open Palm" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] inline declared: "the open palm" — the call's own answer (kind), built from the name; the rules would have said "Palm"
[reskin] inline on kit rows: "Palm" -> "the open palm"
[reskin] inline form: "the open palm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the open palm strikes a creature it already stunned with Open Palm, it can instead overload the pressure point to leave the victim rigidly locked in place, unable to move or act for a short time while its body locks up. The creature can shrug off the paralysis at the end of each of its turns, but while held it is completely at the open palm's mercy. This decisive touch can only be landed once" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: exploiter, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the open palm strikes a creature it already stunned with Open Palm, it can instead overload the pressure point to leave the victim rigidly locked in place, unable to move or act for a short time while its body locks up. The creature can shrug off the paralysis at the end of each of its turns, but while held it is completely at the open palm's mercy. This decisive touch can only be landed once" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, exploiter)
[reskin] fallback respects the call: exploiter left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The open palm's scaled hide and ascetic discipline let it slide through narrow gaps, squeeze through tight spaces, and slip out of grapples or bonds as if its body had no fixed shape. When grappled, restrained, or pinned, it can spend a moment of focus to simply flow free, ignoring the hold as its muscles and joints move unnaturally. This reptilian flexibility also lets it hide in cover that would" [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The open palm's scaled hide and ascetic discipline let it slide through narrow gaps, squeeze through tight spaces, and slip out of grapples or bonds as if its body had no fixed shape. When grappled, restrained, or pinned, it can spend a moment of focus to simply flow free, ignoring the hold as its muscles and joints move unnaturally. This reptilian flexibility also lets it hide in cover that would" [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Open Palm = none; Pressure Dart = dart
[reskin] weapon table: "Pressure Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] audit rewrite blocked — "Open Palm" is engine-authored chassis text
```


---


### Ashvowed Kesh — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Kesh | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 7 → 4.5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Ashvowed Kesh

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 81 (18d8)

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

Assassinate. During the first round of each combat, Kesh has Advantage on attack rolls against any creature that hasn't taken a turn. If Kesh hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Rooftop Stalker. Kesh ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kesh makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kesh takes the Dash, Disengage, or Hide action.

Assassin's Mark (2/Day). Kesh has Advantage on the next attack roll it makes before the end of its turn.

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
- Traits/Rooftop Stalker — the chassis
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed; weapon dagger
- Actions/Hand Crossbow — print's own row, renamed; weapon crossbow
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Assassin's Mark — library seed focus; binds the GM's words: stalk

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] name: provided_name rejected — "tiefling rogue who stalks the rooftops o…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking [behavior] | hide and strike from shadows [behavior] | rope and grappling hook [object]
[concept] identity: The rooftop stalker opens by finding a shadowed perch above the alley, then drops with a crossbow bolt or a dagger from behind, always with advantage. Each round it repositions across the rooftops, never staying in melee reach, kiting prey through chimneys and laundry lines until it can strike again from hiding. Bloodied, it does not flee—it toys with the wounded, using its tail to trip and its mocking laugh to lure pursuers into deadfalls and blind corners.
[concept] lore: A tiefling outcast who learned the old quarter's rooftops better than its streets, now selling silence to whoever pays and punishing those who once cast her out.
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] inline declared: "Kesh" — the call's own answer (person), built from the name
[reskin] inline form: "Kesh" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no sheltering home" quotes nothing the user typed
[reskin] lacks refused: "no allies to call on" quotes nothing the user typed
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kesh hurls a hooked grapple line at a creature within reach of her rope, sinking the hook into clothing, armor, or flesh. She can then yank the line to drag the victim off balance toward her, across a rooftop edge, or into a nearby hazard, leaving them sprawled and exposed. She can only do this to one creature at a time, and a creature that grabs the line or braces itself can resist being pulled." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] fit declined: "Hooked Line" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kesh carries a coiled rope and grappling hook that let her scale sheer walls and swing between rooftops without slowing down. When she is hidden or moving along a ledge, she can quickly hook a line to a chimney, beam, or railing to reposition above her prey without being seen." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: spider-climb, false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Kesh carries a coiled rope and grappling hook that let her scale sheer walls and swing between rooftops without slowing down. When she is hidden or moving along a ledge, she can quickly hook a line to a chimney, beam, or railing to reposition above her prey without being seen." [trait/always/movement] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Dagger = dagger; Crossbow = crossbow
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] print canon modes: fly off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Fly 40 ft. (hover) — the concept's movement set decides
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Crossbow" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Assassin's Mark (2/Day)"
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Shadowed Quarry" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Kesh has Advantage on attack rolls against any creature that hasn't taken a turn. If Kesh hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Shadowed Quarry: Kesh knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---


### Korgan the Scarred Hermit — one marked soft

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Korgan the Scarred Hermit | 8 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Korgan the Scarred Hermit

Medium Humanoid, Neutral

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Korgan starts its turn Bloodied, roll 1d6. On a 6, Korgan goes berserk. On each of its turns while berserk, Korgan attacks the nearest creature it can see. If no creature is near enough to move to and attack, Korgan attacks an object. Once Korgan goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Korgan has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Korgan extra movement, and Korgan can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Korgan makes two attacks, using Greataxe or Handaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Slashing damage.

Handaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Hermit's Rebuke. One creature within 5 feet that hit Korgan with an attack roll since the end of Korgan's last turn takes 11 (2d10) Bludgeoning damage.

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
- Actions/Handaxe — weapon handaxe
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a goliath berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "a goliath berserker"
- Bonus Actions/Hermit's Rebuke — library seed own-turn-punisher

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("loses control when wounded") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rage triggered by taking wounds [behavior] | oversized greataxe held in scarred hands [object] | momentum that grows as its own blood spills [behavior]
[concept] identity: A goliath berserker opens with a measured, heavy axe strike — testing, not raging — but the first serious wound ignites a killing frenzy that abandons defense entirely. Round after round it swings harder and faster as its own blood flows, gaining momentum in proportion to its injuries, and once bloodied it will pursue fleeing prey across any terrain until first it or its prey is dead.
[concept] lore: Exiled from a goliath war-band for a rage that could not be disciplined, this scarred hermit now lives only to be wounded — because the pain is the only thing that makes it feel whole.
[reskin] donor: brute-5 -> CR 8
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Korgan" — the call's own answer (person), built from the name
[reskin] inline form: "Korgan" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no discipline" quotes nothing the user typed
[reskin] lacks refused: "exiled" quotes nothing the user typed
[reskin] lacks refused: "no armor" quotes nothing the user typed
[reskin] lacks refused: "no shield" quotes nothing the user typed
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] extraction: 8 of 12 model clauses quote nothing the user typed and leave the record ("opens with a measured, heavy axe strike", "testing, not raging", "abandons defense entirely", …)
[reskin] signature idea (action): "Korgan swings his greataxe in a wide, killing arc that grows heavier and more reckless the more wounded he is. Each fresh wound he has taken since the fight began feeds this strike, so a battered Korgan hits harder than a fresh one, and the blow can send even a large foe staggering back a step. He cannot hold back when he is bleeding — the angrier he is, the more of himself he puts into the swing." [action/always/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rampage, affliction, which the GM's words keyed
[reskin] key match declined: action — "rampage" was ranked first on the call's own menu for wound, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Korgan swings his greataxe in a wide, killing arc that grows heavier and more reckless the more wounded he is. Each fresh wound he has taken since the fight began feeds this strike, so a battered Korgan hits harder than a fresh one, and the blow can send even a large foe staggering back a step. He cannot hold back when he is bleeding — the angrier he is, the more of himself he puts into the swing." [action/always/damage] — the model found no template that holds it (offered: rampage, affliction, trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
[reskin] fallback respects the call: rampage left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 29.7 vs 45.6)
[reskin] fallback skipped by the floor: push-prone (EV 3.7 vs 14)
[reskin] fallback skipped by the floor: herd (EV 10.5 vs 45.6)
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Korgan's oversized greataxe was cut down and weighted for a goliath's grip, and his scarred hands never truly let it go — he can fight at extended reach with it as though it were a part of him, and a wound that would make a lesser warrior drop their weapon only makes his grip tighten. Pain does not distract him; it focuses him." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for wounded, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Korgan's oversized greataxe was cut down and weighted for a goliath's grip, and his scarred hands never truly let it go — he can fight at extended reach with it as though it were a part of him, and a wound that would make a lesser warrior drop their weapon only makes his grip tighten. Pain does not distract him; it focuses him." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greataxe = greataxe; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Hermit's Rebuke"
```


---


### Brass Penny Imp — bands soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Penny Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Brass Penny Imp

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 67 (15d6 + 15)

Speed 20 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
6
-2
-2
INT
11
+0
+0
MOD
SAVE
DEX
18
+4
+6
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
14
+2
+2

Skills Perception +3, Stealth +6

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The penny imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The penny imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The penny imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The penny imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The penny imp takes the Disengage or Hide action.

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

- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Sting — print's row, renamed; weapon dagger
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "an imp rogue"

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/uncanny mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: Ash-form vanishing [behavior] | Barbed stiletto of infernal iron [object] | Lock-picking tail [body]
[concept] identity: The imp circles a locked door not as a thief but as an extension of its devil's will, popping the latch with a twist of its barbed tail before the fight even begins. In combat it fights like the lock it picks: it vanishes into stillness (Hide), then strikes from an unseen angle (advantage, Sneak Attack) with a rusted stiletto, only to dissolve into cinders and reappear on a ledge to pick at the next opening. It is craven and vain—if bloodied it flees through the smallest crack, and it will never stand toe-to-toe with anything larger than itself.
[concept] lore: Forged in the brass counting-houses of the Nine Hells, these imps are leased to mortal cults as living lockpicks and couriers, and they dream only of the day their devil master grants them a name and a door of their own.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "the penny imp" — the call's own answer (kind), built from the name
[reskin] inline form: "the penny imp" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "cannot break a lock"
[reskin] lacks refused: "never stand toe-to-toe with anything larger than itself" quotes nothing the user typed
[reskin] lacks refused: "if bloodied it flees through the smallest crack" quotes nothing the user typed
[reskin] lacks refused: "no thieves' tools" quotes nothing the user typed
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> LACKS (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the penny imp is unseen or behind a foe it has already wounded, it folds itself into a pinch of hot ash and cinders and reappears standing on any ledge, sill, or surface within a short distance that it can see, leaving a thin smear of soot where it stood. The vanish is silent and instantaneous, and the imp arrives already turned to face its next victim, so it can strike from the new angle bef" [bonus_action/once_per_fight/movement] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: self-invisibility, coating — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the penny imp is unseen or behind a foe it has already wounded, it folds itself into a pinch of hot ash and cinders and reappears standing on any ledge, sill, or surface within a short distance that it can see, leaving a thin smear of soot where it stood. The vanish is silent and instantaneous, and the imp arrives already turned to face its next victim, so it can strike from the new angle bef" [bonus_action/once_per_fight/movement] — the model found no template that holds it (offered: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, affliction)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "an imp rogue who picks locks for a devil" heads on the Imp and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The imp's stiletto is hammered from cold infernal iron and barbed along both edges, and any living thing it cuts keeps feeling the barbs working deeper — the wound smolders and refuses to close, so the creature bleeds and smokes until it receives real healing or the imp that cut it is destroyed." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: heated-body, resonant-body, marking-light, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The imp's stiletto is hammered from cold infernal iron and barbed along both edges, and any living thing it cuts keeps feeling the barbs working deeper — the wound smolders and refuses to close, so the creature bleeds and smokes until it receives real healing or the imp that cut it is destroyed." [trait/always/damage] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, bloodied-burst, resonant-body)
[reskin] weapons answered: Stiletto = dagger
[reskin] weapon declared: "Stiletto" is a dagger — the call's own answer
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon languages: "Infernal, Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---


### Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
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
14
+2
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses blindsight 30 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Returned Quip. One creature within 5 feet that hit Dame Oriel with an attack roll since the end of Dame Oriel's last turn takes 7 (2d6) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

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

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "Dame Oriel — a knight"
- Bonus Actions/Returned Quip — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight who keeps the line with a shiel") | defender: key "keeps the line" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: unyielding shield wall [behavior] | longsword and shield [object] | punishes those who try to slip past [behavior]
[concept] identity: Dame Oriel plants her shield and dares the line to break, holding a chokepoint with disciplined swordwork and a shield wall mentality. Every round she controls terrain: stepping into gaps, shoving attackers back, and punishing anyone who tries to slip past her reach. She fights to the last, yielding only if her charge is safe and escape serves the mission.
[concept] lore: A veteran of the Ironwall Legion, Dame Oriel took a sacred oath to hold the pass at Grayford Bridge, and she will not abandon her post until relieved or dead.
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Javelin" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no spells" quotes nothing the user typed
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical)
[reskin] signature idea (action): "Dame Oriel plants her shield and drives forward, herding foes back and together in front of her. Everyone caught in this push is forced backward and crowded, their footing thrown off until they spend a moment to steady themselves. She can only do this so many times before her shield arm tires." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Dame Oriel plants her shield and drives forward, herding foes back and together in front of her. Everyone caught in this push is forced backward and crowded, their footing thrown off until they spend a moment to steady themselves. She can only do this so many times before her shield arm tires." [action/always/movement] — the model found no template that holds it (offered: rally, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: herd (EV 7 vs 30.4)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When an enemy is shoved back by Dame Oriel's shieldwork, it stumbles right into the reach of her longsword, letting her immediately punish the disruption without giving up her guard. The opening is gone if she doesn't take it in that instant." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "When an enemy is shoved back by Dame Oriel's shieldwork, it stumbles right into the reach of her longsword, letting her immediately punish the disruption without giving up her guard. The opening is gone if she doesn't take it in that instant." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] weapons answered: Longsword = longsword; Javelin = javelin
[reskin] audit rename: "Answering Sting" -> "Returned Quip"
```


---


### Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 93 (17d8 + 17)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+4
CHA
13
+1
+1

Skills Athletics +7, Perception +6

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language, Celestial

CR 6 (XP 2,300; PB +3)

Traits

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

Divine Aid (3/Day). Vareth casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Mace — print's row, renamed; weapon longsword
- Actions/Radiant Flame — print's own row, renamed; weapon lance
- Actions/Spellcasting — print's own row
- Bonus Actions/Bolstering Cry — library seed rally; binds the GM's words: blessing+bless
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: blessing her soldiers with dawn-prayers [behavior] | holy strike channeled through her iron mace [object] | radiant aura that steadies allies and sears foes [aura]
[concept] identity: Vareth Solmane advances behind a wall of her own soldiers, laying down melee strikes that carry radiant dawnfire while her war-prayers knit their wounds and harden their resolve. Every round she either blesses her line, strikes a foe to open a gap, or calls down a searing light to punish those who break through; she fights as a commander, not a duelist, and only yields ground when her soldiers fall.
[concept] lore: Vareth Solmane was a knight-chaplain of the Dawnfire Order who bound a fragment of the rising sun into her own blood-iron flesh, and she now wanders the war-torn roads gathering the faithful into shield-walls worth dying behind.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Priest is not a caster first and keys STR 16 over DEX 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain defender line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Dawnfire Blade = literal; Dawnfire Edict = literal
[reskin] repair round 1: 1 defect(s) — "Sunbrand Lance" deals Fire on a Humanoid whose concept names no Fire — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical)
[reskin] signature idea (action): "Vareth plants the butt of her lance and speaks a dawn-prayer over her soldiers, and the prayer does not end when she lowers the weapon — it clings to them, banked like coals, waiting. The next time any of those blessed soldiers is struck, the prayer flares awake and pours back through the enemy who dared touch them, burning the attacker with the same dawnlight and sealing a sliver of the soldier's" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature miss: action — "Vareth plants the butt of her lance and speaks a dawn-prayer over her soldiers, and the prayer does not end when she lowers the weapon — it clings to them, banked like coals, waiting. The next time any of those blessed soldiers is struck, the prayer flares awake and pours back through the enemy who dared touch them, burning the attacker with the same dawnlight and sealing a sliver of the soldier's" [action/always/damage] — the model picked "curse-debt" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally, lay-on-hands)
[reskin] value check: "Bolstering Cry (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The rising sun bound in Vareth's blood-iron will not let her soldiers leave her light: as long as she is on her feet and fighting, any ally near her who is wounded and staggering draws on her dawnfire and rises back to their feet, steadied and lit from within. The more of her line that falls, the brighter she burns, so the wall is never truly broken while she stands." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, guarded-stance, undead-fortitude, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The rising sun bound in Vareth's blood-iron will not let her soldiers leave her light: as long as she is on her feet and fighting, any ally near her who is wounded and staggering draws on her dawnfire and rises back to their feet, steadied and lit from within. The more of her line that falls, the brighter she burns, so the wall is never truly broken while she stands." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Dawnfire Blade = longsword; Sunbrand Lance = lance
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Dawnfire Blade" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Sunbrand Lance" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Divine Aid The entry forces the GM to look up four different spells mid-combat, including one with a contested ability check, which is not resolvable in ~10 seconds.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage, and the next attack Vareth makes before the end of her next turn has Advantage.
provenance: none — the call wrote the text itself
```


---


### Templar Vowsworn — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar Vowsworn | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Templar Vowsworn

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
13
+1
+1

Skills Athletics +6, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The vowsworn makes two Mace attacks. It can replace one attack with a use of Shield.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vowsworn's next turn.

Shield. Strength Saving Throw: DC 13, one creature within 5 feet that the vowsworn can see. Failure: 7 (2d6) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Trip Attack. Strength Saving Throw: DC 13, one creature within 30 feet that is Prone. Failure: 11 (2d10) Piercing damage. Success: Half damage.

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
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Shield — template shield-bash
- Actions/Trip Attack — library seed exploiter

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: holding the line [behavior] | iron mace and shield [object] | faith without magic [behavior]
[concept] identity: The templar priest plants itself on the battle line and refuses to yield, swinging a heavy iron mace in punishing arcs that drive the unworthy back even as they bleed against its consecrated shield. Every round it reinforces its stance or drags a wounded enemy into its reach, punishing any who dare slip past to strike the flock behind it. Unshakeable in faith and temper, it fights to the death without retreat, confident that its god's judgment will fall hardest on those who break the line.
[concept] lore: These armored devotees of a martial church forsake all prayer-magic to become the living wall of their congregation, believing that a strong right arm and unbending faith are the truest sacraments.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] shield is not a weapon: "Shield" takes print's Shield Bash shape beside Mace — it was "*Ranged Attack Roll:* +6, range 30/120 ft. 13 (2d8 + 4) {dam…"
[reskin] inline declared: "the vowsworn" — the call's own answer (kind), built from the name
[reskin] inline form: "the vowsworn" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The vowsworn steps into an opening left by a foe's faltering guard and hauls that foe bodily back toward itself, dragging them away from the flock. The target must be a creature who is already trying to get past it — reeling from its shield bash, or within reach and having just missed an attack against it — and the pull brings them into the vowsworn's own reach, where its mace waits." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] word match declined by the call: obstacle-pull, hook-rider — the key word does not mean the mechanic here
[reskin] fit declined: "Faltering Guard" — a print body takes only what the user's words ask; the call quoted "having just missed an attack against it", which is not in the GM's own words (every significant word must be), and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Opportunist's Lash" EV 8.5 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The vowsworn fights with a relentless forward pressure, punishing any foe who shifts attention away from it. Whenever an enemy it can see makes an attack against someone other than the vowsworn, that enemy immediately draws the vowsworn's ire and is brought one step closer — within striking distance if the vowsworn can manage it." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The vowsworn fights with a relentless forward pressure, punishing any foe who shifts attention away from it. Whenever an enemy it can see makes an attack against someone other than the vowsworn, that enemy immediately draws the vowsworn's ire and is brought one step closer — within striking distance if the vowsworn can manage it." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] feature name: "Opportunist's Lash" -> "Trip Attack" — the card that is this feature takes its name
[reskin] weapons answered: Mace = mace; Shield = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield.
audit finding below confidence gate: Divine Aid The spell names are not italicized in a standard way and 'using the same spellcasting ability as Spellcasting' is a cross-reference that is functional but slightly meta; more importantly, the entry gives no spellcasting DC or attack modifier, leaving the GM to derive it from the Spellcasting entry.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Hollow Courtier — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Courtier | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Hollow Courtier

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The courtier makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The courtier casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The courtier casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). The courtier teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The courtier is hit by an attack roll. Response: The courtier casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Arcane Burst — print's own row, renamed; weapon longsword
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Phase Slip — library seed phase-slip; binds the GM's words: step

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: steps away from every strike, leaving a shadow in its place [behavior] | body of solid shadow that shimmers like heat haze [body] | arcane knowledge of court magic and spatial manipulation [aura]
[concept] identity: The Court Wizard opens by stepping sideways through space, leaving a shimmering afterimage in its place, then lashes out with a blade of solid shadow. Every round after, it teleports in response to being targeted, forcing enemies to chase a ghost that is never there, while it picks apart stragglers with hit-and-run strikes. When bloodied, it does not flee but becomes harder to pin down, stepping away from every blow and toying with exhausted pursuers until it can slip into shadow entirely.
[concept] lore: Once a royal advisor who traded their reflection for the secret of the step-between, the Court Wizard now haunts the ruined palace, forever seeking a new court to manipulate and a new shadow to wear.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Shadow Blade" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type | "Blink" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] repair round 2: 1 defect(s) — "Shadow Blade" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the courtier" — the call's own answer (kind), built from the name
[reskin] inline form: "the courtier" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] signature idea (action): "The courtier's shadow blade is not thrown but left behind, a gleaming afterimage that hangs in the air where it struck. Until the courtier's next turn, anyone who moves through that shimmering patch feels it cut again, as if the blade were still there. The courtier can use this to fence off a stretch of ground, making pursuers think twice about the path they take." [action/always/damage] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: thrown-burst — the key word does not mean the mechanic here
[reskin] signature miss: action — "The courtier's shadow blade is not thrown but left behind, a gleaming afterimage that hangs in the air where it struck. Until the courtier's next turn, anyone who moves through that shimmering patch feels it cut again, as if the blade were still there. The courtier can use this to fence off a stretch of ground, making pursuers think twice about the path they take." [action/always/damage] — the model picked "zone-seed" (no verb, and it quotes nothing the GM typed) over a concept-verb template (phase-slip)
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the courtier is struck, the attacker's reflection ripples across its body for a heartbeat, showing them exactly where they hit and nowhere else. The courtier slides one step to the side of that image, appearing in a space adjacent to where the blow landed. Enemies must keep guessing which patch of shadow is real." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion, gaze-aura, absorption, bloodied-burst, resonant-body, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever the courtier is struck, the attacker's reflection ripples across its body for a heartbeat, showing them exactly where they hit and nowhere else. The courtier slides one step to the side of that image, appearing in a space adjacent to where the blow landed. Enemies must keep guessing which patch of shadow is real." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, gaze-aura, blurred-form)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Shadow Blade = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Shadow Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Shadowsedge Shinobi — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadowsedge Shinobi | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 38 (2 × Poisoned Blade); nova none; dmg 38

```
Shadowsedge Shinobi

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 30 ft.

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

Skills Perception +4, Stealth +9

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If Shadowsedge is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Shadowsedge instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Shadowsedge has Advantage on attack rolls against any creature that hasn't taken a turn. If Shadowsedge hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasive Shadow. Shadowsedge ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Shadowsedge makes two attacks, using Poisoned Blade or Shuriken in any combination.

Poisoned Blade. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Poison damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Shadowsedge takes the Dash, Disengage, or Hide action.

Blink Step (Recharge 4-6). Shadowsedge teleports up to 40 feet to an unoccupied space it can see.

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

- Traits/Evasion — template evasion; library draw (seed unstamped)
- Traits/Assassinate — template assassinate; library draw (seed unstamped); binds the GM's words: unseen
- Traits/Evasive Shadow — the chassis
- Actions/Multiattack — the chassis
- Actions/Poisoned Blade — weapon dagger
- Actions/Shuriken — the chassis
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Blink Step — library seed blink; binds the GM's words: shadow

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — lurker: ✓ ("strikes unseen") | lurker -> skirmisher-skulker: the concept's VERB outranks the noun (key "unseen", class verb) | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: shadow step teleportation [behavior] | poisoned blade [object] | hidden strike from shadows [behavior]
[concept] identity: The Shadowblade Ninja opens combat by fading into darkness, then strikes from hiding with advantage, using its Shadow Step to teleport between shadows and its poisoned blade to deliver sudden, lethal blows. Each round it repositions through shadows, making one precise strike before vanishing again, relying on stealth and mobility to avoid retaliation. When bloodied, it melts into the shadows and retreats to fight another day, patient and cunning.
[concept] lore: Trained in forbidden shadow arts, the Shadowblade Ninja serves a hidden clan that seeks to manipulate events from the darkness, eliminating key targets to shape the world according to their secret agenda.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] inline declared: "Shadowsedge" — the call's own answer (person), built from the name
[reskin] inline form: "Shadowsedge" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Poisoned Blade" promises Poison, so the rider stands on a Humanoid the concept never called poison
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no honor" quotes nothing the user typed
[reskin] lacks refused: "no open confrontation" quotes nothing the user typed
[reskin] lacks refused: "no heavy armor" quotes nothing the user typed
[reskin] lacks refused: "no mercy for targets" quotes nothing the user typed
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The shinobi lashes out with its poisoned blade in a blur of motion, aiming for an unseen weak point. When the strike lands, it leaves a lingering venom that saps the victim's strength, making them sluggish and vulnerable for a short time. This poisoned wound marks the target, so the shinobi's next strike against them is even more precise and deadly." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — blink, self-invisibility (shadow, unseen)
[reskin] rider declined: "Venom Brand" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] value check: "Blink Step (Recharge 4-6)" EV 3.5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] slot yields: bonus-alt — the chassis's "Shadow Step (Recharge 4-6)" leaves; "Blink Step (Recharge 4-6)" holds the slot
[reskin] library seed drawn: blink -> Bonus Actions/"Blink Step (Recharge 4-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The shinobi's body is so suffused with shadow that it can slip through the faintest darkness. Whenever it is in dim light or darkness, it becomes nearly invisible, its outline blurring and its scent masked. Even magical senses that pierce illusions struggle to pinpoint it, and it can hide from creatures that rely on special sight." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] word match declined by the call: uncanny-sense, blurred-form, false-appearance, marking-light — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown assassinate, which the GM's words keyed
[reskin] key match declined: trait — "assassinate" was ranked first on the call's own menu for unseen, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The shinobi's body is so suffused with shadow that it can slip through the faintest darkness. Whenever it is in dim light or darkness, it becomes nearly invisible, its outline blurring and its scent masked. Even magical senses that pierce illusions struggle to pinpoint it, and it can hide from creatures that rely on special sight." [trait/always/defense] — the model found no template that holds it (offered: assassinate, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
[reskin] weapons answered: Poisoned Blade = dagger; Shuriken = none
[reskin] weapon declared: "Poisoned Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Shuriken" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Shadowmeld" -> "Evasive Shadow"
```


---


### Warren Maze-Bull — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Warren Maze-Bull | 6 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- reader · fail · name-mechanic: Actions/Bloodied Charge: the name promises movement the text lacks
- read: def 4 / off 6 → 5; sustained 44 (2 × Maul); nova none; dmg 44

```
Warren Maze-Bull

Large Monstrosity, Neutral

AC 16
Initiative +2 (12)

HP 105 (14d10 + 28)

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
15
+2
+5
CHA
15
+2
+5

Skills Athletics +7, Persuasion +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the maze-bull has Advantage on attack rolls and saving throws.

Aura of Authority. While in a 10-foot Emanation originating from the maze-bull, the maze-bull and its allies have Advantage on attack rolls and saving throws, provided the maze-bull doesn't have the Incapacitated condition.

Actions

Multiattack. The maze-bull makes two attacks, using Maul or Bloodied Charge in any combination.

Maul. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Bloodied Charge. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Charge. The maze-bull moves up to half its Speed straight toward an enemy it can see.

Retaliating Horns. One creature within 5 feet that hit the maze-bull with an attack roll since the end of the maze-bull's last turn takes 7 (2d6) Bludgeoning damage.

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

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a minotaur reaver"
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Maul — weapon maul
- Actions/Bloodied Charge — the chassis
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Retaliating Horns — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Monstrosity mechanics=none — defender-leader: ✓ ("herds prey into the maze") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "minotaur reaver who herds prey into the …" is the description, not a name
[concept] resolve: archetype=defender type=Monstrosity themes=subterranean/armed mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | stone-walled corridor charge [body] | captain of the maze-pack [aura]
[concept] identity: The minotaur reaver opens by bellowing a lane of retreat into the maze's throat, shepherding prey with shield-slam and horn-toss while its raider pack flanks. Every round it fights as a captain beside its herd, holding the corridor's key junction with a braced parry and calling the next collapse inward. Bloodied, it does not flee — it seals the maze behind itself and fights to grind the last intruders into the stone.
[concept] lore: A maze-born bull of the lower warrens, it was reared not to kill but to turn prey inward, growing a reaver's discipline from the herd-stone maze that is both its home and its weapon.
[reskin] donor: defender-3-leader -> CR 6
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] repair round 1: 1 defect(s) — name "Bloodied Charge" promises movement but the row never delivers it — name what the rule does, or drop the claim word
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] inline declared: "the maze-bull" — the call's own answer (kind), built from the name; the rules would have said "Maze-Bull"
[reskin] inline on kit rows: "Maze-Bull" -> "the maze-bull"
[reskin] inline form: "the maze-bull" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The maze-bull slams its shield-bulk into the ground where stone meets corridor, collapsing a wall of rubble that seals a lane the prey might flee through. The rubble remains as a blocking wall, leaving only the warren's inward throat open; the maze-bull then bellows and advances, and any creature hit by its next maul that round is driven one step back toward the sealed stone." [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: seal, push-prone, rally, shield-bash, terror-pulse, active-toll — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown herd, which the GM's words keyed
[reskin] key match declined: action — "herd" was ranked first on the call's own menu for herd, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The maze-bull slams its shield-bulk into the ground where stone meets corridor, collapsing a wall of rubble that seals a lane the prey might flee through. The rubble remains as a blocking wall, leaving only the warren's inward throat open; the maze-bull then bellows and advances, and any creature hit by its next maul that round is driven one step back toward the sealed stone." [action/always/movement] — the model found no template that holds it (offered: herd, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, rally, riposte)
[reskin] fallback respects the call: herd, terror-pulse, push-prone left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Stone hears the beast's hooves: whenever the maze-bull moves in a straight line along worked stone or sheer wall and ends beside a foe, the stone itself bucks and cracks, shoving that foe back into the tighter corridor and leaving them boxed in until the bull's next move." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] trait declined: "Buckling Stone" — bound only on the idea's own words (cracks:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Maul = none; Bloodied Charge = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Retaliating Horns"
```


---


### Shield-Sworn Errant — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shield-Sworn Errant | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shields the weak"
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Shield-Sworn Errant

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the errant, the errant and its allies have Advantage on attack rolls and saving throws, provided the errant doesn't have the Incapacitated condition.

Actions

Multiattack. The errant makes two attacks, using Longsword or Throwing Spear in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Throwing Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 26 (5d8 + 4) Piercing damage.

Bonus Actions

Shield Answer. One creature within 5 feet that hit the errant with an attack roll since the end of the errant's last turn takes 10 (3d6) Bludgeoning damage.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "a knight-errant of the fallen order"
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Throwing Spear — weapon spear
- Bonus Actions/Shield Answer — template own-turn-punisher; library draw (seed unstamped); binds the GM's words: answer

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender-leader: ✓ ("knight-errant of the fallen order") | defender-leader -> defender: the concept's VERB outranks the noun (key "knight", class verb) | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall defense of the weak [behavior] | scarred iron shield and blade [object] | the fallen order's discipline [aura]
[concept] identity: The Shield-Sworn Errant plants its battered tower shield in the gap and holds — a wall of scarred iron that steps into blows meant for others and answers any foe foolish enough to push past with a disciplined blade. Every round it is a decision between standing firm and shoring up a faltering line, one hand on the shield's rim as it reads the field and repositions to cover the weakest ally. It does not pursue a rout; it fights until the last civilian is clear, and only then does it consider its own retreat with a soldier's grim arithmetic.
[concept] lore: A knight-errant of the fallen order, sworn to wander the roads where their kingdom's writ no longer runs, standing between the defenseless and whatever the broken world sends them.
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the errant" — the call's own answer (kind), built from the name
[reskin] inline form: "the errant" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] signature idea (action): "The errant slams its scarred tower shield into the ground and becomes the wall itself — for as long as it stands its ground, anyone behind it is covered, and every enemy blow that lands on a warded ally instead finds the errant's own iron, the knight stepping into the strike. When a foe it is guarding against pushes past or presses an attack the errant has called, the errant answers with a discipl" [reaction/on_being_hit/defense] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: herd, push-prone, snap-shot — the key word does not mean the mechanic here
[reskin] value check: "Shield Answer" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Shield Answer" ("when a foe presses an attack the errant has called, the errant answers — the cre [verb: answer:idea]")
[reskin] signature idea (trait): "The errancy's shield remembers every blow it has ever taken for someone else — the dents and scars spark against a fresh attacker, so that any foe who scores a hit on the errant finds its own weapon ringing and its guard pried open until the end of its next turn, while the errant's shield-hand stays steady and free to strike." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, bloodied-burst, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The errancy's shield remembers every blow it has ever taken for someone else — the dents and scars spark against a fresh attacker, so that any foe who scores a hit on the errant finds its own weapon ringing and its guard pried open until the end of its next turn, while the errant's shield-hand stays steady and free to strike." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, guarded-stance)
[reskin] weapons answered: Longsword = longsword; Throwing Spear = spear
[reskin] weapon table: "Throwing Spear" — thrown, range 20/60
audit finding below confidence gate: Aura of Authority The aura's own suppression clause makes the GM track a condition state on the aura-source each time an affected ally acts, adding combat-tracking overhead the block provides no marker for.
```


---


### Whisker Tithe — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisker Tithe | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Claw); nova none; dmg 24

```
Whisker Tithe

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 30 ft.

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
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Crowdslip. Whisker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Whisker makes two attacks, using Claw or Dart in any combination.

Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Dart. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Fleet Agility. Whisker takes the Dash or Disengage action.

Cunning Action. Whisker takes the Dash, Disengage, or Hide action.

Blood Trail Slip (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Whisker moves up to half its Speed, and it makes one Claw attack.

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

- Traits/Crowdslip — the chassis
- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "a tabaxi cutpurse"
- Bonus Actions/Blood Trail Slip — library seed rampage

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("slips through the market crowd") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a tabaxi cutpurse who slips through the …" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crowd-cover skirmishing [behavior] | clawed cutpurse snatch [behavior] | market-bazaar upbringing [aura]
[concept] identity: The cutpurse shadows a mark through the market crowd, using the bustle as cover until it can slip in with a clawed snatch and dart away before the victim feels the tug. Every round it flits between stalls and bystanders, striking only when flanking with an alley cat or a paid urchin, and it relies on its feline agility to Break Away without provoking a parting shot. If bloodied it melts into the throng, abandoning the score and favoring survival over greed.
[concept] lore: Raised in the alleys behind the Grand Bazaar, this tabaxi learned that a full purse and a clean getaway are worth more than any guild's promise, and it now taxes the market one cut at a time.
[reskin] donor: skirmisher-3 -> CR 3
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] species kit: Cat's Dash — "Fleet Agility" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: rogue — "a tabaxi cutpurse": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "Whisker" — the call's own answer (person), built from the name
[reskin] inline form: "Whisker" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no guild's promise" quotes nothing the user typed
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Whisker times a clawed snatch to a moment when a bystander or ally is crowding the target, making the cut land harder and harder to notice. It then slips the stolen coin or trinket into its own pocket, feather-light and silent." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: disarm, isolation, feint-slip — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown feint-slip, which the GM's words keyed
[reskin] key match declined: action — "feint-slip" was ranked first on the call's own menu for slip, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Whisker times a clawed snatch to a moment when a bystander or ally is crowding the target, making the cut land harder and harder to notice. It then slips the stolen coin or trinket into its own pocket, feather-light and silent." [rider/on_hit/damage] — the model found no template that holds it (offered: feint-slip, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, lure, sensory-strike, disarm)
[reskin] fallback respects the call: feint-slip, disarm left the shelf — the call declined them for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whisker was raised in the market's churn, so it alone can move through the thickest press of bodies as if the crowd were open ground, leaving pursuers tangled in the bustle. When it slips into a crowd, the throng closes behind it, hiding its trail." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whisker was raised in the market's churn, so it alone can move through the thickest press of bodies as if the crowd were open ground, leaving pursuers tangled in the bustle. When it slips into a crowd, the throng closes behind it, hiding its trail." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Claw = none; Dart = dart
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] audit rename: "Rampage (1/Day)" -> "Blood Trail Slip (1/Day)"
```

