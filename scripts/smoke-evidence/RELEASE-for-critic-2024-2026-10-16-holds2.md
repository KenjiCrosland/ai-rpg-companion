# The case for the critic — your read of the stage 1/2 package, worked

2026-10-16, third package. **You were right on both claims you challenged, and
the corrections are larger than the challenges.** Two of my three headline
numbers were wrong in the direction that flattered the finding, and one of them
took three more passes to get right after your correction.

Gate: `npx jest` 70 suites / 2,759 passed. `npm run build` clean.
Blocks: `holds2-2026-10-16T17-11-11`, built to exercise your four holds.

---

## Part 1 — the corrections

### Claim A was backwards. Your premise stands.

You said the metric counts filler and asked for authored-only. Counting only
print, kit, GM-bound and fitted-template rows — excluding chassis rows and
generic seeds, as you specified:

| CR | authored | print | gap | all rows (my first pass) | meat-only ours / print |
|---|---|---|---|---|---|
| 0–1 | 0.98 | 0.81 | +0.17 | 2.19 | 37% / 48% |
| 2–4 | 0.93 | 1.41 | **−0.48** | 2.53 | 42% / 31% |
| 5–8 | 1.08 | 1.83 | **−0.75** | 2.64 | 41% / 12% |
| 9–12 | 0.74 | 2.22 | **−1.48** | 3.28 | 59% / 13% |
| 13–16 | 0.57 | 2.89 | **−2.32** | 2.97 | **67% / 0%** |
| 17+ | 1.65 | 4.10 | **−2.45** | 4.80 | 34% / 0% |

Under print from CR 2 up, and the gap **widens** with CR — you predicted "from
CR 5 up". At CR 13–16 we ship a meat-only sheet **two thirds of the time** and
print never does. The sheets are flat; the first metric was measuring the
chassis.

**Hypothesis 6 inverts too.** Authored-only: seat **stood down** 1.45, seat
survived 0.95; within CR 5–8, 1.24 against 1.06. A stood-down seat gets print
rows, and print rows are authored — so the earlier "confirmation" was entirely
the filler artifact you named. Three metrics, three answers, and only the
authored one is like-for-like. The variant seats do not demonstrably carry
authored move sets.

### Claim C was wrong by a factor of 56, and your #1 rests on it

You said attribute by final cause, and that the stand-down doesn't stop the
draw. Both true. **118 stand-downs since 10-15: 40% drew a row anyway.**

Getting the attribution right took three further passes, each wrong in a way
worth recording:

1. first-line attribution gave the print-body rule **56%**;
2. walking every line and taking the last gave it **0%** — because a TRAIT-seat
   miss further down the trace became the "final cause" of an empty ACTION
   signature, two different slots;
3. per-seat walking gave "no seed legal on this sheet" **58%** — which is a
   **summary** line printed *after* whatever actually killed the row.

Final, hand-verified against your two named blocks:

| cause | share |
|---|---|
| **the value floor dropped it** | **57%** |
| the trait seat landed, the action seat did not | 17% |
| the call was asked and found no fit | 12% |
| no action idea was produced | 6% |
| a post-call veto | 3% |
| no shelf template shared a verb (no call made) | 2% |
| **print body: "nothing invented"** | **1%** |

Your two receipts check out exactly: **Templar Vowsworn** stands down and then
draws the exploiter seed, so it is not an empty signature at all; **Sergeant
Halloran** stands down, draws Horrid Display, and the **floor** drops it.

**This moves your recommended order.** Your #1 was narrowing "nothing invented",
sized off my 56%. It is 1%. Meanwhile the floor is 57% of empty slots *and* 64
of 65 pattern-bearing floor drops are `save control` — so **pricing conditions
is the single biggest lever by both measurements**, and narrowing "nothing
invented" drops to near-last. Your own second item becomes first.

### Claim B stands, and the receipt you asked for

Each audit row now prints the corpus path it checked. No change to the finding.

---

## Part 2 — your four holds, on the blocks

Run `holds2-2026-10-16T17-11-11`, built one block per hold plus two regressions.

| hold | what shipped | fix | the block |
|---|---|---|---|
| 1 | "Thing makes two Brine-Sleeve attacks" — a refused *kind* answer flipped to a person | the head keeps its article; `shortForm` and `properInline` both had "of" as the only preposition | **Thing in the Well → `inline "the thing"`, kind** ✓ |
| 2 | "does not flee" accepted as a lack against a gravecrawler | **the negation was the receipt** — see below | both cases → `lacks asked: nothing taken away` ✓ |
| 3 | the part row named **"Swarmlord Whose Bite"** | `whose` was missing from a list that already held `that\|which\|who` | **`"Bite"`**, and no row named with a relative pronoun ✓ |
| 4 | Sister Aurelia's Censer, a declared flail, dealt Piercing | the declared weapon's own type outranks the body default | pinned only — no censer row drew this run |

Plus your alignment question: **a mute INT-4 construct swarm now ships
Unaligned.**

**Hold 2's root cause was not the receipt logic.** `LACKS_STOP` carried no
negation words, so the negation inside *every* lack phrase satisfied the
quote-the-GM receipt whenever the concept contained any "not" or "no". "does not
flee" matched a gravecrawler that "will **not** let go" and flipped the GM's own
grip into an absence. Two of your four cases are closed by adding the negation
vocabulary to the stop list. The other two are honestly still open:

- **"will not let go"** is the owner's already-deferred class — the sibling of
  "never leaves the gate read as a lack while never yields ground isn't".
- **"cannot break a lock"** shares only the noun with "picks locks for a devil".
  The GM said *picks*; the call invented *cannot break*. That is a verb-level
  judgment and a regex should not make it.

**Your alignment question was not a regression of ours.** Alignment was simply
ungated on made types — the call's answer shipped whatever it said. Print:
**Oozes 4 of 4 Unaligned; every Construct at INT 3 or less, 7 of 7** (Animated
Armor 1, Flying Sword 1, Rug 1, Gorgon 2, Clay Golem 3, Iron Golem 3, Stone
Golem 3). The first **aligned** Construct is the Flesh Golem at INT 6, and print
has none at INT 4 or 5 — so the line is drawn under 6 and the gap is stated in
the trace rather than hidden.

---

## Part 3 — one of your "smaller" items is not smaller

Chasing Dame Oriel's `blindsight 30 ft.`:

> **98% of our Humanoids ship darkvision (359 of 368 since 2026-10-12). Print
> gives it to 1 of 26, and 96% of print's Humanoids have no special sense at
> all. Zero print Humanoids have blindsight.**

That is a header line a GM reads first, on nearly every Humanoid sheet we make.
Not touched: it is a one-line fix with a blast radius across every Humanoid
sheet, so it is the owner's call. Flagging it as the largest single fidelity gap
currently measurable.

Your other smaller items, triaged honestly:

- **Korgan's reach 10 on a Medium** — print has 11 of 100 Medium blocks with a
  reach-10 row, so this is attested, not a violation. The size-follows-reach rule
  being intermittent is still worth a look.
- **Whisker Tithe's two mobility rows** — the one-mechanic rule fired on the
  species kit and not the rogue kit. Unfixed.
- **Open Palm's inline inconsistency, the Silence Claimant's missing trait for a
  third run, Final Toll losing "finishes the dying", the CR 13 meat-only swarm** —
  all reproduced in the earlier runs, none fixed.
- **`warded-mending`'s keys** — you are right that "mend" keying a template which
  *prevents* healing is a data error, not a judgment. Unfixed.

---

## What we got wrong, for your calibration

This round's errors are all one shape: **a measurement that flattered its own
finding got reported before its classifier was checked.**

1. **Claim A** — I measured the filler contribution myself (84% of
   `hit-and-run`) and then drew the opposite conclusion from it in the same
   document.
2. **Claim C** — four attributions of one number, three of them wrong, in the
   order 56% → 0% → 58% → 1%.
3. **Hypothesis 6** — reported refuted, then confirmed, then inverted, across
   three metrics.
4. **The package you read contained a run with a known-fixed defect.** Hold 1 is
   real and was fixed about an hour before the later run in the same package:
   `stage1b-14:47` shows "Templar" and "Thing"; `classes-eight-15:53` shows
   neither. Shipping the stale batch without flagging it is the error, not the
   code.

The rule we are adopting from this: **a measurement that confirms what we hoped
gets its classifier hand-checked against two named blocks before it goes in a
document.** Your Templar Vowsworn and Sergeant Halloran are exactly that check,
and they found three successive errors in one number.

---

# 2024 blocks

## Review batch — holds2-2026-10-16T17-11-11

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plague Warrenmother | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 1/5 |
| Hell's Locksmith | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 5/6 |
| Gravepit Crawler | 6 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/4 |
| Censersworn Crusader | 8 | 2024 | defender-8-leader | ok | ok | FAIL: multiattack-combination, lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 7/7 |
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Thing in the Well | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Kneeling Vow | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Darkmaw Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/5 |

**Dropped 0 of 11 user clauses** (coverage 100%); concept share 57% (20/35 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8 / reader: 1
- skirmisher-3 / reader: 1
- defender-8-leader / structure: 1
- lurker-5 / bands: 1



---


### Hell's Locksmith — lowest CR

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hell's Locksmith | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit |

- reader · fail · save-fit: Actions/Creeping Dread: a Wisdom save for an effect that calls for Constitution
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Hell's Locksmith

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

Magic Resistance. The locksmith has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The locksmith makes two Sting attacks. It can replace one attack with a use of Creeping Dread.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Creeping Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the locksmith's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Poison damage.

Shape-Shift. The locksmith shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The locksmith casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The locksmith's takes the Disengage or Hide action.

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
- Actions/Sting — print's row, renamed
- Actions/Creeping Dread — library seed escalating-dread
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "an imp rogue"

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lockpicking and sabotage [behavior] | strike from stealth [behavior] | fiendish servitude [behavior]
[concept] identity: The imp opens by furtively picking a lock or sabotaging a mechanism, then strikes from stealth with a poisoned stinger or a stolen blade before flitting into shadow. Each round it uses its Cunning Action to Hide, relying on hit‑and‑run tactics and its devil‑granted invisibility to avoid retaliation. When bloodied, it abandons subtlety and flees or begs for mercy, ever mindful that its true master's punishment is worse than death.
[concept] lore: Bound to a devil's service, this imp plies locks and pockets in the mortal realm, hoarding secrets and stolen trinkets as bribes to one day buy its freedom from Hell.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "the locksmith" — the call's own answer (kind), built from the name; the rules would have said "Hell's"
[reskin] inline on kit rows: "Hell's" -> "the locksmith"
[reskin] inline form: "the locksmith" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] extraction: 7 of 10 model clauses quote nothing the user typed and leave the record ("strikes from stealth with a poisoned stinger", "or a stolen blade", "flitting into shadow", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The locksmith jams a lock, sets a latch, or sabotages a mechanism it can touch, and the sabotage stays hidden until someone tries to use it. The creature that triggers the lock is stuck fast, trapped in place by the jammed mechanism, and the locksmith knows the instant its sabotage springs." [action/save/condition] — menu: trample, leap, gaze-single, snare, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The locksmith jams a lock, sets a latch, or sabotages a mechanism it can touch, and the sabotage stays hidden until someone tries to use it. The creature that triggers the lock is stuck fast, trapped in place by the jammed mechanism, and the locksmith knows the instant its sabotage springs." [action/save/condition] — no template on the shelf shares a verb with the concept or the idea (offered: trample, leap, gaze-single, snare, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] fallback stands down: "an imp rogue who picks locks for a devil" heads on the Imp and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 2) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The locksmith always knows the fastest way to flee and uses every obstacle as a lock. On any turn it moves, it ignores difficult terrain and its movement does not provoke from anyone it has already stung this fight." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, faultless-tracker, terrain-walk — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The locksmith always knows the fastest way to flee and uses every obstacle as a lock. On any turn it moves, it ignores difficult terrain and its movement does not provoke from anyone it has already stung this fight." [trait/always/movement] — the model picked "relentless-pursuit" (no verb, and it quotes nothing the GM typed) over a concept-verb template (sealed-body)
[reskin] weapons answered: Stinger = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stinger" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Shadowslip" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
audit finding below confidence gate: Shape-Shift Entry name suggests an instantaneous shape-change, but the text also grants a Climb speed in spider form that is not accounted for in the base speed comparison.
[reskin] audit rewrite blocked — "Nimble Escape" is engine-authored chassis text
```


---


### Dirge Swarm — highest CR

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dirge Swarm | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Iron Toll); nova none; dmg 90

```
Dirge Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 40 ft.

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Tolling Knowledge. The swarm knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Iron Toll. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

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

- Traits/Tolling Knowledge — template faultless-tracker; library draw (seed unstamped); binds the GM's words: always knows+knows where+follows+marked
- Traits/Swarm — the chassis
- Actions/Iron Toll — the chassis

**Engine trace**

```
[route] swarm type=Construct mechanics=none — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: funeral bells that ring over the dying [behavior] | swarm of self-ringing iron bells [body] | tolling that marks and draws the dying [aura]
[concept] identity: The Dirge Swarm moves as a drifting cortege of iron bells that only rings when a creature is near death, tolling in slow, overlapping waves that pull the dying toward it. Once it has marked a dying target, it surges forward as a single clattering mass, battering and ringing the victim until the body stills, then settles over the corpse in a shroud of silent bells. It does not flee when bloodied — it splits into two smaller swarms that fight on with the same grim patience, tolling for any who fall.
[concept] lore: Forged in a ruined cathedral's bell foundry from the unclaimed death-bells of plague victims, the Dirge Swarm exists to ring the dying home — whether or not they are ready to go.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline declared: "the swarm" — the call's own answer (kind), built from the name
[reskin] inline form: "the swarm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] extraction: 6 of 14 model clauses quote nothing the user typed and leave the record ("only rings when a creature is near death", "tolling in slow, overlapping waves", "surges forward as a single clattering mass", …)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm's bells swing outward and ring in a slow, overlapping dirge meant for the dying. Every creature near death who can hear the ring is pulled toward the swarm, stumbling closer against its will, while creatures in good health feel only a mournful noise." [action/always/movement] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] signature miss: action — "The swarm's bells swing outward and ring in a slow, overlapping dirge meant for the dying. Every creature near death who can hear the ring is pulled toward the swarm, stumbling closer against its will, while creatures in good health feel only a mournful noise." [action/always/movement] — the model picked "lure" (no verb, and it quotes nothing the GM typed) over a concept-verb template (active-toll)
[reskin] signature idea (trait): "Whenever a creature the swarm can hear falls near death, the bells answer on their own and begin tolling for it. From then on, the swarm always knows where that marked creature is, and its ringing follows the creature even through walls or darkness." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] signature template (trait): faultless-tracker -> Traits/"Tolling Mark" ("The bells mark a creature near death and from then on the swarm always knows whe [verb: always knows:idea, knows where:idea, follows:idea, marked:idea]")
[reskin] weapons answered: Iron Bells = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] audit rename: "Tolling Mark" -> "Tolling Knowledge"
[reskin] audit rename: "Iron Bells" -> "Iron Toll"
```


---


### Plague Warrenmother — a 2024 sheet

**Concept:** a plague-rat swarmlord whose bite rots the wound so it will not close

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Plague Warrenmother | 8 | skirmisher-8 | ok | ok | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | FAIL: save-fit |

- headerBody · soft · languages-type: a Beast that speaks (Common)
- headerBody · soft · lint:beast-intelligence: type Beast with INT 10 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- reader · fail · save-fit: Actions/Vermin Surge: a Strength save for an effect that calls for Constitution
- read: def 6 / off 10 → 8; sustained 57 (3 × Bite); nova Vermin Surge 44; dmg 67

```
Plague Warrenmother

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

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Plaguevermin Carpet. A creature that touches the warrenmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Necrotic damage.

Warren Slip. The warrenmother ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The warrenmother makes three Bite attacks.

Bite. Melee Attack Roll: +8, reach 5 ft. 19 (4d6 + 5) Piercing damage. If the target is a creature and doesn't already have a festering gash, it is subjected to the following effect. Constitution Saving Throw: DC 16. Failure: The target receives a festering gash. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 16 Wisdom (Medicine) check.

Vermin Surge (Recharge 5-6). Strength Saving Throw: DC 16, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 44 (8d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Fleet Agility. The warrenmother takes the Dash or Disengage action.

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

- Traits/Plaguevermin Carpet — template heated-body; library draw (seed unstamped); binds the GM's words: plague
- Traits/Warren Slip — the chassis
- Actions/Multiattack — the chassis
- Actions/Bite — authored for this sheet; a named part; the GM's clause "a plague-rat swarmlord whose bite rots the wound so it will not close"; binds the GM's words: wound+rot+fester+gash
- Actions/Vermin Surge — the chassis
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — swarm: a swarm is a mass of many — no mass in the words | skirmisher: ✓ ("plague-rat swarmlord") | skirmisher: no line key in the words — the model's read of its quote
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] resolve: archetype=skirmisher type=Beast themes=venomous/bestial mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bite that rots wounds so they will not close [behavior] | churning swarm of plague-rats [body] | shifting swarm-body that slips away from retaliation [body]
[concept] identity: The swarmlord opens by sending its churning mass of plague-rats to probe and harry, looking for a gap in the party's formation. Each round it darts in on a wave of vermin, bites with rot-wet teeth, and retreats before retaliation, leaving wounds that stubbornly refuse to heal. Bloodied but never panicked, it circles and toys with weakened prey, letting the infection do its patient work.
[concept] lore: It was born in the overflow of a flooded plague pit and now roams the warrens it made, seeking not to feed its endless brood but to spread the rot that defines it.
[reskin] nova capped: "Sweeping Area Attack" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8 -> CR 8
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] named parts: Bite (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the warrenmother" — the call's own answer (kind), built from the name; the rules would have said "Plague"
[reskin] inline on kit rows: "Plague" -> "the warrenmother"
[reskin] inline form: "the warrenmother" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] final price: the round ran 42 against the card's 60 — the attack rows re-solve at 143% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "a plague-rat swarmlord whose bite rots the wound so it will not close" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a plague-rat swarmlord whose bite rots the wound so it will not close" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The warrenmother's bite pumps the wound full of rot that will not close, leaving a festering gash that keeps weeping and weakening the victim each moment. Anyone still bearing such a wound when the swarmlord is nearby finds the infection blooming further, so the creature can dart away and let the rot do the work for it." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, gaze-single, snare, reel, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — affliction, contagion (wound, rot, plague, plagued)
[reskin] word match declined by the call: contagion — the key word does not mean the mechanic here
[reskin] signature rider: affliction -> Bite (appended; The bite leaves a festering, rot-filled wound that keeps weakening the victim ea [verb: wound:concept, rot:concept, fester:idea, gash:idea])
[reskin] signature idea (trait): "The warrenmother is not one rat but a churning mass of plague-vermin that crawls along its body and spills onto the ground around it. That filth-ridden carpet bites and gnaws at anyone who tries to fight it up close, wearing them down even as the warrenmother slips away." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — noxious-aura, bloodied-fury, heated-body, bloodied-burst (rot, wounded, plague)
[reskin] word match declined by the call: aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Plaguevermin Carpet" ("The plague-vermin crawling on and around the warrenmother bite and gnaw at anyon [verb: plague:concept]")
[reskin] weapons answered: Rot Bite = none; Vermin Surge = none
[reskin] chassis nova: "Vermin Surge (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] languages defaulted for sapient: Common
```


---


### Kneeling Vow — a print donor

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kneeling Vow | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Kneeling Vow

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

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The vow makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vow's next turn.

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

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace and no magi") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-first advance that refuses to be flanked [behavior] | chained iron flanged mace [object] | no magic, only weight and plate [body]
[concept] identity: The Iron Templar advances on foot, mace held low behind its kite shield, ignoring every ranged threat until it can close to punish the first enemy who tries to slip past. Every round it repeats the same lockstep ritual: shield first, mace second, punishing any foe who turns its back with a shattering blow to the spine. Under pressure it does not break formation — it bleeds, tightens its grip, and seeks to pin the offending body against a wall like a nail in the wall of its faith.
[concept] lore: A line-infantry priest of a fallen militant order, stripped of its god's favor but not its vows; it wanders the old battle-road, seeking a cause worth standing in front of so it can die usefully.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Mace Throw" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline declared: "the vow" — the call's own answer (kind), built from the name
[reskin] inline form: "the vow" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When the vow plants its kite shield and advances, it forces every foe in front of it to choose between stepping aside or being driven back, and any enemy already pressed against a wall or other solid surface takes the full weight of the shield and is left unable to move until it tears free. The vow cannot use this advance if it moved any distance toward the same targets earlier in the same round." [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: hook-rider, disarm, rally, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the vow plants its kite shield and advances, it forces every foe in front of it to choose between stepping aside or being driven back, and any enemy already pressed against a wall or other solid surface takes the full weight of the shield and is left unable to move until it tears free. The vow cannot use this advance if it moved any distance toward the same targets earlier in the same round." [trait/start_of_turn/movement] — the model found no template that holds it (offered: warded-mending, disarm, rally, hook-rider)
[reskin] fallback respects the call: rally, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 23.1 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The vow's iron-shod mace remembers every blow it lands: once it has struck a creature, that creature cannot slip around the vow to reach its flanks until it has first shaken off the mace's lingering bite. Any foe trying to move past the vow while still bearing that mark must break the grip of the previous strike or remain locked in place beside it." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: adhesive, faultless-tracker, sealed-body, bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The vow's iron-shod mace remembers every blow it lands: once it has struck a creature, that creature cannot slip around the vow to reach its flanks until it has first shaken off the mace's lingering bite. Any foe trying to move past the vow while still bearing that mark must break the grip of the previous strike or remain locked in place beside it." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Mace Throw = mace
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] vulnerability rejected — "Psychic" has no warrant in the concept's own text (print's default is none)
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Gravepit Crawler — one marked soft

**Concept:** a gravecrawler that drags the living into its pit and will not let go

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravepit Crawler | 6 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4.5 (print at 6 reads 3–8, n=42)
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Claw); nova none; dmg 40

```
Gravepit Crawler

Medium Undead, Neutral

AC 14
Initiative -1 (9)

HP 112 (15d8 + 45)

Speed 30 ft., Burrow 30 ft.

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

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The gravepit crawler makes two attacks, using Claw or Will Not Let Go in any combination. It can replace one attack with a use of Gravehaul.

Claw. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Gravehaul. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward the gravepit crawler by its grave-pit body and has the Grappled condition (escape DC 15).

Will Not Let Go. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15).

Bonus Actions

Entomb. The gravepit crawler entombs one Medium or smaller creature it is grappling. While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the gravepit crawler, and takes 7 (2d6) Necrotic damage at the start of each of the gravepit crawler's turns. The gravepit crawler can have only one creature entombed at a time. If the gravepit crawler takes 15 damage or more in a single turn from the entombed creature, the gravepit crawler must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the gravepit crawler. If the gravepit crawler dies, an entombed creature breaks free Prone by using 5 feet of movement.

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
- Actions/Gravehaul — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+haul
- Actions/Will Not Let Go — authored for this sheet; the GM's clause "will not let go"
- Bonus Actions/Entomb — binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm

**Engine trace**

```
[route] brute-grappler type=Undead mechanics=grapple, engulf — brute-grappler: ✓ ("drags the living into its pit and will n") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/grasping mind=bestial style=grappler energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: drags the living into its pit [behavior] | will not let go [behavior] | grave-pit body of packed corpses [body]
[concept] identity: The gravecrawler surfaces from its grave-pit by hurling a filth-caked claw to seize the nearest living leg, then spends every following round reeling the victim down into the pit's mouth. Once its grip closes, it never releases voluntarily — it drags relentlessly, taking any hits necessary, and fights to the destruction of its own rotting body before it lets prey go.
[concept] lore: A gravecrawler is what remains of a mass grave that grew hungry — when enough bodies were buried in one pit without rites, the mingled dead fused into a patient, grasping thing that still wants company below.
[reskin] donor: brute-5-grappler -> CR 6
[reskin] engulf engine: Entomb — the body's own verb
[reskin] inline by rule: "the gravepit crawler" — the call answered "the pit crawler" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "will not let go" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a gravecrawler" -> has (descriptive), head | "drags the living into its pit" -> has (mechanical) | "will not let go" -> has (mechanical)
[reskin] signature idea (action): "The crawler heaves its whole grave-pit body backward, hauling a creature it is already holding straight down toward the pit's mouth. The victim is wrenched along the ground with it and slammed against the earth, while anyone clinging to or standing over the victim is dragged a short way along too. It can only do this while it still has someone caught, and the harder the prey thrashes, the more the" [action/always/movement] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-rider (drag, drags)
[reskin] value check: "Gravehaul" EV 11.6 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Gravehaul" ("The crawler hauls a creature it is already holding straight down/backward with i [verb: drag:concept, haul:idea]")
[reskin] keys spent by the action: drag
[reskin] signature idea (trait): "The crawler is a walking mass grave, and the cold of the pit leaks out of it. Anything in contact with its packed corpse-body — held in its grip, swallowed inside the pit, or standing within arm's reach of the grave-dirt it drags along — is slowly sapped of warmth, more each moment it stays in contact. Prey that lingers near the creature is chilled toward the grave even before it is dragged under." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: noxious-aura — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The crawler is a walking mass grave, and the cold of the pit leaks out of it. Anything in contact with its packed corpse-body — held in its grip, swallowed inside the pit, or standing within arm's reach of the grave-dirt it drags along — is slowly sapped of warmth, more each moment it stays in contact. Prey that lingers near the creature is chilled toward the grave even before it is dragged under." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] repair: 1 clause(s) with no row — "will not let go"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Claw = none; Grave Rattle = none
[reskin] languages held: None stands — INT 4 on a Undead speaks nothing, whatever the mind read said
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Gravehaul.
[reskin] escape dc: Gravehaul → DC 15 (8 + PB + STR; a late row wore another number)
```


---


### Darkmaw Stalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Darkmaw Stalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

```
Darkmaw Stalker

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft., Climb 30 ft.

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
16
+3
+6
WIS
13
+1
+1
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

Skills Perception +4, Stealth +9

Senses blindsight 60 ft. (blind beyond this radius), tremorsense 30 ft.; Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Scent of Blood. The stalker can pinpoint the location of moving creatures within 60 feet of itself.

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Actions

Multiattack. The stalker makes two Bite attacks. It can replace one attack with a use of Blood Draw.

Bite. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Blood Draw. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the stalker regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the stalker takes the Hide action.

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
- Actions/Bite — the chassis
- Actions/Blood Draw — library seed drain
- Bonus Actions/Umbral Step — the chassis
- Traits/Scent of Blood — template uncanny-sense; library draw (seed unstamped); binds the GM's words: scent+blood
- Traits/Assassinate — template assassinate; library draw (seed unstamped)

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("tracks prey by scent alone") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=bestial/subterranean mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scent-based tracking of prey [behavior] | eyeless bone-plated head [body] | ambush pounce and drag [behavior]
[concept] identity: The Eyeless Hunter opens with a sudden pounce from concealment, its bone-plated maw clamping onto a single victim before it melts back into darkness; each round thereafter it circles unseen, striking only to drag prey down and feed, never standing to trade blows. Bloodied, it retreats to stalk from a distance, patient and relentless, until the wounded quarry falters.
[concept] lore: Born in the lightless caverns where scent is the only map, the Eyeless Hunter exists solely to follow the smell of blood and breath to its source, and it will cross any darkness to find it.
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] inline declared: "the stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the stalker" — the model's own reading of the name
[reskin] lacks asked: "eyeless", "eyeless hunter"
[reskin] lacks refused: "tracks prey by scent alone" names no absence — nothing in it takes anything away
[reskin] clauses: "an eyeless hunter" -> LACKS (mechanical) | "tracks prey by scent alone" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The Darkmaw Stalker has a predator's memory for the smell of blood and breath. When it wounds a creature with its bite, the scent is fresh enough to follow anywhere on the same plane for days, even through water or magic that hides tracks, and it knows the direction and distance to that creature as long as the wound has not been fully healed or the scent magically scrubbed away." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — isolation, focus (alone, track)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown isolation, focus, which the GM's words keyed
[reskin] key match declined: action — "isolation" was ranked first on the call's own menu for alone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The Darkmaw Stalker has a predator's memory for the smell of blood and breath. When it wounds a creature with its bite, the scent is fresh enough to follow anywhere on the same plane for days, even through water or magic that hides tracks, and it knows the direction and distance to that creature as long as the wound has not been fully healed or the scent magically scrubbed away." [rider/on_hit/condition] — the model found no template that holds it (offered: isolation, focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, spew)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Wherever blood or breath has been spilled on stone or soil, the Stalker reads the scent as clearly as a map. It cannot be surprised by any creature that has bled or breathed in the area within the last day, and no amount of visual obscurement hides a wounded creature from its pursuit unless the scent itself is masked." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): uncanny-sense -> Traits/"Scent of Blood" ("The stalker reads spilt blood and breath as a map, locating wounded or breathing [verb: scent:concept, blood:idea]")
[reskin] weapons answered: Bite = none
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
[reskin] audit rename: "Vitality Leech" -> "Blood Draw"
```


---


### Censersworn Crusader — in the run

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers with a censer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Censersworn Crusader | 8 | defender-8-leader | ok | ok | FAIL: multiattack-combination, lint:duplicate-entry | ok | ok | ok | ok | ok | ok |

- structure · fail · multiattack-combination: "in any combination" with one row: "The crusader makes three attacks, using Censer Swing in any combination."
- structure · fail · lint:duplicate-entry: Actions/Censer Swing: identical text to "Censer" — two names, one ability; rewrite this entry into something distinct
- read: def 6 / off 8 → 7; sustained 54 (3 × Censer); nova none; dmg 54

```
Censersworn Crusader

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

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Smoldering Censer Aura. The crusader regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and the censer is within 30 feet of it.

Aura of Authority. While in a 10-foot Emanation originating from the crusader, the crusader and its allies have Advantage on attack rolls and saving throws, provided the crusader doesn't have the Incapacitated condition.

Actions

Multiattack. The crusader makes three attacks, using Censer Swing in any combination.

Censer. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage.

Censer Swing. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage.

Bonus Actions

Lay on Hands (2/Day). The crusader touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). The crusader charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Answering Sting. One creature within 5 feet that hit the crusader with an attack roll since the end of the crusader's last turn takes 7 (2d6) Bludgeoning damage.

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

- Traits/Smoldering Censer Aura — template warded-mending; library draw (seed unstamped); binds the GM's words: mend+mends+mending
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Censer — the chassis
- Actions/Censer Swing — the chassis
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers with a censer"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("smites the unclean and mends her soldier")
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the censer swung as both weapon and blessing [object] | smoke that mends allies and sears the unclean [aura] | oath-driven refusal to abandon her troops [behavior]
[concept] identity: The Oathsworn Censersworn opens by marking the battlefield with a slow, deliberate censer swing that trails purifying smoke, then wades into the unclean with her iron-weighted censer, smiting foes while the smoke mends her soldiers. She fights beside her troops, parrying blows meant for them and never retreating — if bloodied, she plants herself and becomes a fixed point of defiance, refusing to flee while any ally still stands.
[concept] lore: She is a crusader bound by an oath sworn over a dying comrade's censer, wandering the scarred frontier to cleanse corruption and keep her soldiers alive with the same smoke that once carried her comrade's last breath.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "the crusader" — the call's own answer (kind), built from the name
[reskin] inline form: "the crusader" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (descriptive) | "mends her soldiers with a censer" -> has (descriptive)
[reskin] signature idea (action): "The crusader plants her censer and swears a binding oath over the battlefield. Until she falls, every ally who can see or hear her refuses to break and keeps fighting, and blows meant for them find her instead. She cannot leave the spot while any ally still stands." [action/once_per_fight/defense] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: curse-debt, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The crusader plants her censer and swears a binding oath over the battlefield. Until she falls, every ally who can see or hear her refuses to break and keeps fighting, and blows meant for them find her instead. She cannot leave the spot while any ally still stands." [action/once_per_fight/defense] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, aggro-curse)
[reskin] fallback respects the call: coating (already on the sheet), rally, curse-debt, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: push-prone (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: herd (EV 7 vs 45.6)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The censer is never only a weapon. Whenever it strikes a foe, it trails purifying smoke that clings to her allies, mending their wounds for a short while. The same swing that smites the unclean also heals her troops." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature template (trait): warded-mending -> Traits/"Smoldering Censer Aura" ("The censer's smoke clings to allies and mends their wounds for a short while, re [verb: mend:concept, mends:concept, mending:concept]")
[reskin] weapons answered: Censer = none; Censer Swing = none
[reskin] multiattack normalised: "The crusader makes three attacks, using Censer Swing in any combination."
[reskin] row narrowed: "Censer Swing" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---


### Thing in the Well — in the run

**Concept:** name: Thing in the Well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thing in the Well | 5 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Brine Lash); nova none; dmg 34

```
Thing in the Well

Large Aberration, Unaligned

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 30 ft., Swim 30 ft.

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

Skills Athletics +6, Perception +3

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Freezing Brine. A creature that touches the thing or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Cold damage.

Actions

Multiattack. The thing makes two Brine Lash attacks.

Brine Lash. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Bonus Actions

Swallow. The thing swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the thing, and takes 7 (2d6) Cold damage at the start of each of the thing's turns. The thing can have only one creature swallowed at a time. If the thing takes 15 damage or more in a single turn from the swallowed creature, the thing must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the thing. If the thing dies, a swallowed creature exits the body Prone by using 5 feet of movement.

Frozen Rebuke. One creature within 5 feet that hit the thing with an attack roll since the end of the thing's last turn takes 7 (2d6) Cold damage.

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
- Actions/Brine Lash — the chassis
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Bonus Actions/Frozen Rebuke — library seed own-turn-punisher
- Traits/Freezing Brine — template heated-body; library draw (seed unstamped)

**Engine trace**

```
[route] brute-grappler type=Aberration mechanics=grapple, engulf — brute-grappler: ✓ ("Thing in the Well") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Aberration themes=aquatic/devouring mind=sapient style=grappler energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Thing in the Well"
[concept] mechanics: grapple, engulf
[concept] signature elements: lurking in a lightless well and erupting at prey [behavior] | slick brine-soaked coils and a vertical, water-choked gullet [body] | the well itself as a drowning cage and threshold [aura]
[concept] identity: The Thing in the Well waits at the bottom of its shaft, a slick coil of brine-heavy flesh that erupts upward the moment a bucket or a shadow crosses its lip. Every round thereafter it wraps, constricts, and drags prey down its gullet into the black water, using the well itself as a throat and a cage. Wounded, it does not flee — it retreats just below the waterline, letting the dark and the drowning finish what its jaws began.
[concept] lore: A thing that was never meant to be pulled from the water, it fell or was cast into the well long ago and has grown into the shaft, feeding on what the village lowers and what the village forgets to miss.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] repair round 1: 1 defect(s) — no damage type for "Tendril Maw"
[reskin] proper noun: "Thing in the Well" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline by rule: "the thing" — the call answered "the well" (kind), which the name does not support
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thing in the Well" -> has (descriptive), head
[reskin] signature idea (action): "Calling on the cold, foul water it lives in, the Thing voids a black torrent up the well shaft, soaking every creature in reach in brine that clings and drags at their limbs. Those soaked find that what the Thing's tendrils touch sticks fast, giving it an opening to pull them in." [action/always/condition] — menu: leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: hook-drag, hook-rider — the key word does not mean the mechanic here
[reskin] nova declined: "Noxious Spew (Recharge 5-6)" — a whole-round ability the GM never asked for: the call offered no quote, and the key table finds no verb either; the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Thing's body is a slick, brine-heavy coil that clings to flesh. Any creature that grapples it, is grappled by it, or strikes it from close enough to feel its wet hide is left coated in freezing brine that keeps eating at them until they scrape it off." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Freezing Brine" ("Any creature that touches the creature or hits it with a melee attack while with [shape fit, no verb match]")
[reskin] weapons answered: Tendril Maw = none; Drowning Dark = none
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] audit rename: "Tendril Maw" -> "Brine Lash"
[reskin] audit rename: "Answering Sting" -> "Frozen Rebuke"
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

