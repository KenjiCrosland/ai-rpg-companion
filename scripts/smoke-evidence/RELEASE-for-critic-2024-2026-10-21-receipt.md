# The case: a receipt decides credit, not existence (2026-10-21, package six)

Answering the critic's review of `sweep-2026-10-21T18-15-11` (5 ship / 26
fix-lite / 9 fix) and its central finding, which inverted the case I had put:

> The catalog is not the bottleneck, and neither is the call. The rules deciding
> whether a row has enough provenance to exist are.

Accepted. This package is the forty that followed the fix:
`sweep-2026-10-21T22-17-49` — **5 FAIL of 40**, Jest 198 suites / 5763 passing
(26 skipped), build clean. Path mix: 13 twist, 16 homebrew, 7 class, 3 exact,
1 blank.

**Read the twists first** (the critic's item 9). The six rows rule 1d killed in
one forty are the reason this package exists.

---

## 1. What 1d was doing, and what replaced it

1d accepted a row on a quote of the GM (`asked`) or a concept-key bind. **The
trait seat is shown no text it can quote**, so neither route was open to it —
which killed six twists in one forty, each rejected for "quoting none of the GM's
words" while being exactly what the GM asked for.

The owner's ruling: **a receipt decides CREDIT, not EXISTENCE.** One free
signature row per sheet on every non-exact path, gated on a receipt the seat can
actually produce. Exact sheets get none — print closes the row set. A free row
earns no clause credit and still faces the value floor, dedup, adjudicability,
body legality and the nova caps.

The receipt is a new `expresses` field on the fit call: which of *this creature's
own* signature elements the row carries, from the closed list the concept call
already produced. `parseFit` validates it by MEMBERSHIP — the call picks one or
answers none, and cannot invent a third. Those elements were drawn from the GM's
description, so naming one is a receipt of the same kind as a quote.

**The five of the six killed twists that recur in this batch all carry their row:**

| twist | the row it now ships | element named |
|---|---|---|
| Hydra | `Smoldering Stumps` | "a scalding, blinding smoke shroud that thickens as it is wounded" |
| Vampire | `Briar Regrowth` | "bleeding vines and blood-fed roses that reknit its flesh" |
| Bone Sun Lich | `Shard Retort` | "a throne-core sun of splintered bone" |
| Adult Red Dragon | `Blindside Lash` | "a blinded eye from an old lance" |
| Stone Golem | `Sorrowful Wrath` | "carved saint in stone, weeping" |

17 free rows landed across the forty. **All 17 name an element that appears
verbatim in that sheet's own element list** — checked mechanically, not by eye.

## 2. THE CLAIM TO ATTACK — the element receipt is a sound substitute for a quote

I did **not** implement the critic's "homebrew gets free rows always" as a bare
allowance, because it would have reversed three standing pins with no evidence
(`Iron Fury`, `Marked Quarry`, the forged `ground-burst` — all unasked
decoration). All six structural kills were twist sheets, not homebrew generally.

So the allowance is narrower than the critic asked for: homebrew gets one free
row, **but only when the call can name the element it expresses.** Those three
pins still refuse their rows — now for naming no element rather than for failing
to quote.

**This is the claim to attack.** It rests on `expresses` being hard to satisfy
spuriously: the list is closed, membership-validated, and produced by a different
call than the one answering. If the critic can show a decoration row naming a
plausible element, the gate is a rubber stamp and the three pins are luck.

## 3. The gap trace now measures ship, not acceptance

`[nearest landed]` was stamped at ACCEPTANCE, ~100 lines before the receipt gate
and verb preference can veto the seat. It read "1 row in 41 shipped nothing";
**measured at ship it was 23 of 41.** Gap records now accumulate and emit once
the sheet is final, stamping `[landed: X]` or `[VETOED AFTER ACCEPTANCE: X]`.

On this forty, 30 seat records:

| outcome | count |
|---|---|
| landed | 20 (67%) |
| **VETOED after acceptance** | **10 (33%)** — was 23 of 41 (56%) |
| row dropped | 0 |

Cause of the gap, from the engine's own rejection reasons: 63% over-decline (a
same-seat template was on the menu and the call said no), 17% role shelf, 7%
legality, 13% genuine gap. The catalog remains ~93% complete for observed demand.

**A caveat on this instrument.** It read 0 of 30 on first use and printed a table
of zeroes that looks exactly like a clean run: its positional regex wanted the
outcome stamp before `[menu:]`, and the move to sheet-final emission put it last.
It now reads fields by name and prints whatever it cannot parse.

## 4. The three regressions the critic found, and the gate that is new

1. **Brother Halric's Mace** — a chassis row the call had renamed "Mace" carried
   no provenance, so the closed-path sweep deleted it while print's own
   Multiattack cited it. A row already carrying print's name IS print's row:
   claimed and stamped, in both the melee and ranged branches. *This forty:
   Halric ships `Mace` and `Radiant Flame`, exactly what its Multiattack cites.*
   The two `prints no row for it` firings were the Mage's `Mire Rot` and the
   Priest's `Warhammer` — print confirms the Mage prints neither and the Priest
   prints `Mace`, so both withdrawals hit duplicates, not print's own rows.
2. **Reedmarch's Guarded Stance** — the menu filter tested `monster.ac ?? scaled.ac`
   while the pool was built, but print canon moves the AC afterwards and three
   other paths ship a trait without passing that filter. Reconciled against the
   FINISHED AC, which cannot miss a path. *This forty: one withdrawal, correct.*
3. **Ossuar's indefinite paralysis** — a new `condition-duration` gate, but **not
   the rule as briefed.** "A row that imposes a condition states when it ends"
   **fails print 58 times**: over print's 171 affliction rows, Prone is 50 bare of
   51 (it self-ends — you stand up) and Grappled is always an escape DC, while
   Paralyzed, Stunned, Blinded, Charmed and Deafened are never bare. The gate
   covers only those, and admits print's own `while` bound. Zero false positives
   on print's 20 such rows. *This forty: one firing, on the Drowned Choir's
   `One Voice` (Deafened, unbounded) — correct.*

The **audit rename rule** also blocked 6 renames, all defensible. One is worth
noting: the same `One Voice` row was blocked from becoming "Deafening Chorus" for
dropping the GM's own word "voice". Both new guards engaged on one row; neither
mis-fired.

## 5. The forty is a long tail — with one exception, and we had that wrong

Five forties ran 2-3 FAIL with near-total turnover between them, which is why a
single run's FAIL list is not a work queue. We had generalised that too far.

Tallied across all six forties, `two-novas` fired **four times in three runs, on
three different creatures across both editions** — Knell Swarm, the Air Elemental
(2024, `lurker-5`, "Chorus Barrage" + "Whirlwind") and Rimeheart Stalker (2014,
`brute-9-juggernaut`, "Killing Cold" + "Threshold Execute"). Re-measured
independently: **0 of 329 print blocks carry two Recharge Action rows**, 72 carry
exactly one. The gate is sound and this is a real defect — the only item in the
"long tail of one-offs" that is not one. It is the next pick.

This forty's other FAILs: `duplicate-mechanic` (Purple Worm, 3 rows imposing
Prone — print has no block with three, 0 of 329), `control-aoe-ungated` and
`name-mechanic` (both Adult Red Dragon), `condition-duration` (correct, above).

## 6. Two things to look at that no gate failed

- **Coverage dropped 15 of 67 user clauses (78%).** A run with zero fails and
  60% coverage is a failing run; this is the number we watch hardest.
- **Four sheets read `concept 0/N`** — Scree Slide Thing, Trench Antiphon,
  Sanctum Rot, Well Drownedthing — against 86% concept share overall (187/218
  rows). All four have real, well-formed signature elements, so this is worth the
  critic's eye. **But note what the metric is:** concept share counts a row as
  the user's if it is a kit/feature/part/print row or **shares a word** with the
  clause. A free row naming an element need not share the GM's words at all, so
  the metric structurally cannot see an element receipt and will understate the
  new path. Trench Antiphon carries a free row and still reads 0/7. Read these
  four as sheets to inspect, not as a measured regression.

## 7. What remains in the critic's order, untouched

Item 1's other half (**verb preference standing down** — a keyed template the
call already declined is not a better answer) is UNTOUCHED, and remains first.
Then: recharge shedding restricted to single-target control; A2 payload
precedence; a strip changing the record and the text together; crediting an
existing row requiring a quote of the sheet; the reader's mixed-Multiattack
miscount (the Pit Fiend reads as 1 × Fiery Mace at CR 20); and item 7's list.

---

# 2024 blocks

## Review batch — sweep-2026-10-21T22-17-49

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Knell Warden | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/8 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Scree Slide Thing | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Siege-Timber Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Drowned Choir | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | FAIL: condition-duration | ok | ok | FAIL (1) | 1/1 | 4/5 |
| Vampire | 13 (2014) | 2014 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Plague Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | FAIL: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Rimeheart Stalker | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | FAIL: two-novas | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | FAIL: control-aoe-ungated | ok | ok | SOFT: print-rows | ok | FAIL: name-mechanic | ok | FAIL (2) | 0/1 | 10/10 |
| Brass Tyrant | 17 | 2024 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Bone Sun Lich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 11/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trench Antiphon | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/2 | 5/5 |
| Thresher of the Dead Hive | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/5 | 4/4 |
| Iron Oath Sentinel | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 7/7 |
| Merebog Yaga | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/6 |
| Renounced Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Swarm of Tolling Revenants | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sanctum Rot | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/6 |
| Thunderwall Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Old Quarry | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Elder Scalesheen | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Well Drownedthing | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/3 |
| Klahk | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 10/12 | 5/5 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 7/7 | 7/7 |
| Greatsword Skeleton | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Toll-Road Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |

**Dropped 15 of 67 user clauses** (coverage 78%); concept share 86% (187/218 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / structure: 1
- lurker-5-phantom / adjudicability: 1
- brute-13 / structure: 1
- brute-9-juggernaut / structure: 1
- dragon-15 / gates: 1
- dragon-15 / reader: 1



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

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rimebound Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks. It can replace one attack with a use of Frost-Rimed Bite.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Frost-Rimed Bite. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target's Speed is halved and it can't take Reactions until the end of the dire wolf's next turn.

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

- Traits/Rimebound Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Actions/Frost-Rimed Bite — template slow-bolt; library draw (seed unstamped); binds the GM's words: frost+chill

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack tactics and darting hit-and-run [behavior] | crippling hamstring and flanking bite [behavior]
[concept] identity: The dire wolf with a frost-rimed hide circles the pack's quarry in a wide, silent arc, letting the rime on its coat crackle and flare before it lunges to tear at a flank or hamstring and then wheels away again, always keeping a body between its prey and the open ground. It never fights alone or holds a line — it runs the edge of the fight in short, freezing dashes, snapping at whoever turns their back, and it knows the crunch of frost-stiffened limbs under its jaws. Cornered or bloodied, it does not flee outright but grows reckless, spending its cold-rimed hide in close, crushing bites until the pack's numbers tell or it dies in the snow.
[concept] lore: Raised in the high passes where a wolf's coat freezes to its own hide, these beasts are the mountain's warning that the cold is hungry — they harry travelers through the drifts to warm their packs on the fallen.
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
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the dire wolf hits a creature with its bite, splinters of its frozen hide lodge in the wound and the chill spreads. A foe harried this way loses its footing on the ice-rimed ground it fights on, staggering if it tries to run, so the wolf can dart past and cut it off. The chill can only be worked into a fresh wound once before it must be re-frozen in the open air." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: contagion, hook-rider — the key word does not mean the mechanic here
[reskin] signature template: slow-bolt -> Actions/"Frost-Rimed Bite" ("the chill in a fresh bite wound slows the harried foe and keeps it from fleeing, [verb: frost:concept, chill:idea]")
[reskin] keys spent by the action: frost
[reskin] trait cards excluded — verb spent by the action: heated-body
[reskin] signature idea (trait): "The … crusting the wolf's hide cracks and flares when it is struck, so closely that anything biting, grappling, or shouldering into it feels the cold bite back and is slowed in its limbs. Its hide is the mountain's own warning, and it makes the wolf's body a thing worth keeping at arm's length." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, aberrant-ground — the key word does not mean the mechanic here
[reskin] free signature row: "Rimebound Hide" — the trait seat cannot quote the GM, but the call names the element it expresses: "frost-rimed hide". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Rimebound Hide" answers "— with a frost-rimed hide" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): heated-body -> Traits/"Rimebound Hide" ("the frost-rimed hide cracks and bites back at anything that bites, grapples, or  [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Snow Stalker" is the seat's, not the Dire Wolf's
[reskin] multiattack replacement clause: It can replace one attack with a use of Frost-Rimed Bite.
audit finding below confidence gate: Bite Prone here has no stated duration or end condition beyond the base condition's own exit, and no save, leaving the target's recovery unstated in the entry.
audit finding below confidence gate: Rimebound Hide Passive damage reaction with no per-turn or per-creature limiter is adjudicable but ambiguous on stacking multiple hits in one turn.
[reskin] audit rename blocked — "Rime Spit" claims an element "Frost-Rimed Bite" does not pay (no damage)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Trench Antiphon — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trench Antiphon [seed 1/1] | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Slam + legendary Lunge and Crush); nova Cacophonous Bellow 78; dmg 180

```
Trench Antiphon

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

Senses blindsight 120 ft.; Passive Perception 19

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The antiphon can breathe air and water.

Legendary Resistance (3/Day). If the antiphon fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The antiphon makes two Slam attacks. It can replace one attack with a use of Resonant Retort.

Slam. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Cacophonous Bellow (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Resonant Retort. Strength Saving Throw: DC 24, one creature within 30 feet that is Deafened. Failure: 63 (14d8) Thunder damage. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the antiphon can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Lunge and Crush. The antiphon moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Tide Surge. Strength Saving Throw: DC 24, each creature within 10 feet of the antiphon. Failure: The target has the Prone condition.

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
- Actions/Slam — the chassis
- Actions/Cacophonous Bellow — the chassis
- Actions/Resonant Retort — library seed exploiter
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Lunge and Crush — the chassis
- Legendary Actions/Tide Surge — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Monstrosity mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: a Gargantuan body is not incorporeal — print's incorporeals are Medium and smaller | caster-binder: the call reads no worked magic in these words | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a song that drowns fleets [behavior] | brine-thick hide crusted with barnacle and reef [body] | the crushing pressure of the trench it rises from [aura]
[concept] identity: The Drowned Choir is a bulk of brine-thick flesh and barnacle-crusted hide that rises from the trench with its mouth already open, and the first thing it does in a fight is sing — a low, crushing note that rolls across the water and inside the skulls of everyone within reach. Every round after, it wades into the nearest ship or swimmer and trades blows with two mass-heavy limbs while the song keeps grinding, thickening and turning lethal as the fight drags on. Under pressure it does not retreat; it sinks a little, opens its mouth wider, and calls more bodies out of the deep, fighting to the last with the patience of something that has drowned a hundred fleets.
[concept] lore: It is the eldest thing in the trench, a leviathan whose song is the tide's own voice, and it wants only to be heard — every fleet that sails too close is invited down until the chorus is complete.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the antiphon" — the call's own answer (kind), built from the name
[reskin] inline form: "the antiphon" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The antiphon inhales and then releases the note it has been holding down all fight as a fresh, wider wave — but the real horror is what it does to those already caught in its song. Anyone still reeling from the crushing note hears it sharpened into a pitch that vibrates through water and bone alike, so the longer the choir has been singing, the more of the battlefield answers back. This only fires" [action/once_per_fight/damage] — menu: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, gaze-single, execute, seal, lure, pacify, snare-bolt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — lure (song)
[reskin] closest accepted: action — the call refused every template but named "execute" as nearest; it lands rather than the row being dropped (what it wanted: the wave widens and hits harder against creatures still deafened by its earlier )
[reskin] free signature row: action — "execute" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a song that drowns fleets" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Threshold Execute (1/Day)" EV 50.4 vs floor 64.2 (the whole Multiattack (2 attacks)) — added Success: Half; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Threshold Execute (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 48.8 vs floor 49.4 (one attack of 2) — dice 31 → 38; priced at the floor: dice 38 → 63 (the cap binds; the cap is the price)
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The leviathan's brine-thick hide is a living reef, and every blow that lands on it splits loose a burst of scalding, salt-choked spray that spatters back at the attacker. It is the tide answering for its eldest child — the harder the chiming blow, the more of the attacker it leaves stung and singing with salt." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] trait declined: "Brineback Spray" — no receipt, and this sheet's free-row allowance (1) is spent (1d: a receipt decides credit, not existence)
[reskin] weapons answered: Slam = none
[reskin] chassis nova: "Drowning Song (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Slam" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] save stat from print grammar: Actions/Drowning Song imposes Deafened by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] audit rename: "Drowning Song (Recharge 5-6)" -> "Cacophonous Bellow (Recharge 5-6)"
[reskin] audit rename: "Opportunist's Lash" -> "Resonant Retort"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Resonant Retort) — the sameness metric
[reskin] [gap] the wave widens and hits harder against creatures still deafened by its earlier song, so prior exposure sets the damage — "The antiphon inhales and then releases the note it has been holding down all fight as a fresh, wider wave — but the real horror is what it does to those already caught in its song. Anyone still reeling from the crushing note hears it sharpened into a pitch that vibrates through water and bone alike, so the longer the choir has been singing, the more of the battlefield answers back. This only fires" — Trench Antiphon [seat: action [action/once_per_fight/damage]] (closest offered: execute) [effect: damage] [menu: lure shield-bash escalating-dread terror-pulse herd drain exploiter gaze-single execute seal pacify snare-bolt own-turn-punisher] [same-cell unoffered: rampage wail] [same-seat rejected: zone:role wail:role] [VETOED AFTER ACCEPTANCE: execute never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
```


---


### Knell Warden — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Knell Warden | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Death Knell 13; dmg 38

```
Knell Warden

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

Funeral Din. Constitution Saving Throw: DC 13, any creature that starts its turn in a 5-foot Emanation originating from the warden. Failure: The target has the Deafened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Ethereal Sight. The warden can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The warden can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The warden makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Death Knell (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the warden. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the warden and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the warden's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the warden can see within 5 feet. Failure: The target is possessed by the warden; the warden disappears, and the target has the Incapacitated condition and loses control of its body. The warden now controls the body, but the target retains awareness. The warden can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The warden's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the warden leaves as a Bonus Action. When the possession ends, the warden appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The warden casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The warden is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Death Knell — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+ring+knell
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Funeral Din — template noxious-aura; library draw (seed unstamped)
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: tolling the bell for the dying [behavior] | a spectral chapel bell [object] | a knell of shadow that drains the living [aura]
[concept] identity: The bell-ringer's ghost does not stalk; it announces. On the first round of a fight it tolls its spectral bell, a Necrotic knell that rolls through the chapel and marks the nearest living soul as 'dying' — the clamor bends toward that target and its allies cannot hear themselves think. Every round after, it drifts through the walls to keep its dying mark in sight, tolling again to drain warmth and years from it, refusing to stop while the bell has a name to ring for. It is patient and ritual-bent — a ghost that flees light and holy ground but fights to the last knell once the toll begins, because in its mind the funeral is already underway.
[concept] lore: A chapel bell-ringer who died at the rope mid-stroke, the ghost returns each night believing the parishioners' deaths have gone unannounced, and tolls for whoever in the dark is nearest to dying.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The warden tolls its spectral bell, and every living creature that can hear it feels the knell drag at its warmth; the one nearest to death suffers the most, its flesh and years draining away while the warden marks it as the name the bell is ringing for. That marked soul cannot truly escape the clamor: it hears the toll in its bones, and the warden always seems to know which way it has gone." [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, trample, snare, shield-bash, push-prone, thrown-burst-seed, curse-debt (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] signature template: active-toll -> Actions/"Death Knell (Recharge 5-6)" ("The warden tolls its spectral bell, and every living creature that can hear it f [verb: toll:concept, bell:concept, ring:idea, knell:idea]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "The spectral bell tolls continuously while the warden keeps its mark, and every living thing near the marked soul hears the funeral din and cannot think straight, its senses blurred by ringing echoes; only silence or holy ground can quiet the bell." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, berserk (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "noxious-aura" has no key-table verb, but the call quotes "a chapel bell ringer's ghost that tolls for the dying" from the description
[reskin] seat takes its clause: "Funeral Din" answers "a chapel bell-ringer's" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): noxious-aura -> Traits/"Funeral Din" ("The tolling din of the bell blurs the senses of living creatures near the marked [shape fit, no verb match]")
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Slam" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the warden makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Death Knell" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Siege-Timber Golem — a homebrew with a nova

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Siege-Timber Golem | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Timber Fist); nova Siege Shoulder 27; dmg 54

```
Siege-Timber Golem

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

Immunities Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Splintering Tar. A creature that touches the siege-timber golem or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Piercing damage.

Lightning Absorption. Whenever the siege-timber golem is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The siege-timber golem can't shape-shift.

Magic Resistance. The siege-timber golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The siege-timber golem makes two Timber Fist attacks.

Timber Fist. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Siege Shoulder (Recharge 5-6). The siege-timber golem spends 5 feet of movement to jump to a space within 20 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 16, each creature in the destination space. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

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

- Traits/Splintering Tar — template heated-body; library draw (seed unstamped); binds the GM's words: burn+splinter+shard+jagged
- Traits/Lightning Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Timber Fist — the chassis
- Actions/Siege Shoulder — template leap; library draw (seed unstamped); binds the GM's words: drop

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✗ ("made of lashed timber, not carved stone")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shoulders through walls [behavior] | body of lashed and tarred timber [body] | headlong shattering charge [behavior]
[concept] identity: The Siege-Timber Golem opens combat with a full-body shoulder charge, splintering doorframes and masonry to reach the far side of a wall and the soft things behind it. Every round after that it wades forward in a straight line, battering with lashed timber fists and trampling anything caught in its path, never circling and never feinting. It is a mindless ram that fights to the last plank — no retreat, no tactics, only the next obstacle to break through.
[concept] lore: Built by a besieging warlord from the scavenged beams of ruined farms and bound with tarred rope, it was left running when the war moved on, and it still shoulders through wall after wall seeking the fortress it was made to crack.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] the call rejected the canon: the Clay Golem stands down — the resolve answered "golem" → canon ✗ on these words
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the siege-timber golem" — the call answered "the timber golem" (kind), which the name does not support
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The golem drops its shoulder and hurls its whole lashed mass in a straight line toward one creature it can see, driving through anything in between as though the wall were kindling. Every creature and loose obstacle along that path is shoved aside and battered by flying splinters and tumbling timber, and the golem ends pressed up against its target, already raising a fist. It never angles or dodge" [action/always/movement] — menu: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone-seed (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, blink, feint-slip, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] word match declined by the call: push-prone — the key word does not mean the mechanic here
[reskin] value check: "Siege Shoulder (Recharge 5-6)" EV 71.6 vs floor 14 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: leap -> Actions/"Siege Shoulder (Recharge 5-6)" ("The golem hurls its whole lashed mass in a straight line at one creature it can  [verb: drop:idea]")
[reskin] signature idea (trait): "The golem's body is beams lashed with tarred rope, and when it strikes something hard the ropes burst and splinter into a spray of jagged shards and burning pitch that cling and smolder on whatever stands close. Anything grappling it or clinging to it gets a face full of the same ruin, and the tar keeps smoldering where it lands." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: adhesive, death-burst, bloodied-burst, marking-light — the key word does not mean the mechanic here
[reskin] free signature row: "Splintering Tar" — the trait seat cannot quote the GM, but the call names the element it expresses: "body of lashed and tarred timber". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): heated-body -> Traits/"Splintering Tar" ("The lashed rope bursts into splintered shards and burning pitch that smolder on  [verb: burn:idea, splinter:idea, shard:idea, jagged:idea]")
[reskin] weapons answered: Timber Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Siege Shoulder Missing preposition connecting the save to its targets; reads as a dangling list rather than a proper 'each creature in the area must make a Dexterity saving throw' construction.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant [seed 1/2] | 17 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 140 a round is 26% under the card's 190
- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 17.5
- **dropped clause:** "rules a city of forges"
- read: def 14 / off 21 → 17.5; sustained 140 (2 × Ingot-Hammer + legendary Stride Forth); nova none; dmg 140

```
Brass Tyrant

Huge Construct, Lawful Evil

AC 20
Initiative +2 (12)

HP 241 (21d12 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+6
INT
14
+2
+2
MOD
SAVE
DEX
14
+2
+2
WIS
16
+3
+3
MOD
SAVE
CON
20
+5
+11
CHA
20
+5
+11

Skills Athletics +12, Persuasion +11

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 13

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Molten Rebuke. A creature that touches the brass tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Aura of Authority. While in a 10-foot Emanation originating from the brass tyrant, the brass tyrant and its allies have Advantage on attack rolls and saving throws, provided the brass tyrant doesn't have the Incapacitated condition.

Actions

Multiattack. The brass tyrant makes two Ingot-Hammer attacks.

Ingot-Hammer. Melee Attack Roll: +12, reach 10 ft. 15 (2d8 + 6) Bludgeoning damage plus 13 (3d8) Fire damage.

Bonus Actions

Molten Reckoning. One creature within 5 feet that hit the brass tyrant with an attack roll since the end of the brass tyrant's last turn takes 13 (3d8) Fire damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Stride Forth. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Ingot-Hammer attack.

Bow or Burn. One ally of the brass tyrant that can see or hear it can immediately use its Reaction to move up to half its Speed or to make one attack.

Rally the Forge. The brass tyrant and each of its allies within 10 feet of it that can see or hear it end the Charmed and Frightened conditions on themselves.

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

- Traits/Molten Rebuke — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+heat+scald+molten+furnace+fire
- Traits/Legendary Resistance — the chassis
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Ingot-Hammer — weapon warhammer
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Stride Forth — the chassis
- Legendary Actions/Bow or Burn — the chassis
- Legendary Actions/Rally the Forge — the chassis
- Bonus Actions/Molten Reckoning — library seed own-turn-punisher

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] defender-leader type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("rules a city of forges") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Construct themes=forged/elemental mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ruler of a city of forges [behavior] | body of burning brass [body] | aura of tyrannical heat that empowers allies [aura]
[concept] identity: The Brass Tyrant opens by flooding the forge-city's channels with molten brass and bellowing its decree, its searing aura turning every allied construct and smith-slave sharper and hotter while it strides into the front line. Each round it fights beside its troops, parrying blows with a warhammer of fused ingots and slamming the ground to send molten slag surging outward; it never retreats, standing to the death because a throne of brass does not bend. When bloodied it burns hotter, its aura intensifying as seams split and it vents furnace-light in a last tyrant's wrath.
[concept] lore: Forged in the first smelter-city and crowned by the guilds it devoured, the Brass Tyrant still rules its streets of forges, demanding tribute in heat and obedience in iron.
[reskin] donor: defender-17-leader -> CR 17 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the brass tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the brass tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The Brass Tyrant slams its ingot-hammer into the ground and floods the forge-channels beneath the battlefield with molten brass, laying down spreading rivers of searing metal that pool and cool across the field. The streams remain for a while, burning and slowing anyone who tries to cross them, so the tyrant's decree becomes terrain: the streets themselves obey it and swallow the faithful's enemie" [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, zone-seed (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, riposte, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Decree of Brass (2/Day)" EV 0 vs floor 49 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Decree of Brass (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Answering Sting" EV 7.2 vs floor 4.7 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 19 at CR 17, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Heat pours off the Brass Tyrant's body as a law of its nature: any blow that strikes its burning brass rebounds as a burst of furnace-light, scalding the attacker with the same fire it carries. When the tyrant is bloodied, the seams of its shell split and this backlash flares angrier, so the closer enemies press it, the more they are repaid in molten brass." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] word match declined by the call: resonant-body, fire-aura — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Molten Rebuke" ("any blow that strikes its burning brass rebounds as a burst of furnace-light, sc [verb: burn:concept, brass:concept, heat:idea, scald:idea, molten:idea, furnace:idea, fire:idea]")
[reskin] weapons answered: Ingot-Hammer = warhammer
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
audit finding below confidence gate: Stride Forth This legendary action's movement plus attack resolves with no adjudicable trigger recorded by the block; the attack happens 'as part of' an unknown transit direction, but the block never states whether the trigger or the attack is what must fall on the same target — the attack target is unreachable since the movement has no destination or target specification.
[reskin] audit rename: "Answering Sting" -> "Molten Reckoning"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Molten Reckoning) — the sameness metric
```


---


### Well Drownedthing — bands soft

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Drownedthing | 5 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2–8.5, n=52)
- read: def 2 / off 5 → 3.5; sustained 38 (2 × Tentacle); nova none; dmg 38

```
Well Drownedthing

Medium Aberration, Neutral Evil

AC 14
Initiative -1 (9)

HP 97 (13d8 + 39)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

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

Actions

Multiattack. The drownedthing makes two Tentacle attacks. It can replace one attack with a use of Deep Chill.

Tentacle. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Deep Chill. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the drownedthing. Failure: 31 (9d6) Cold damage. Success: Half damage.

Bonus Actions

Swallow. The drownedthing swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the drownedthing, and takes 7 (2d6) Cold damage at the start of each of the drownedthing's turns. The drownedthing can have only one creature swallowed at a time. If the drownedthing takes 15 damage or more in a single turn from the swallowed creature, the drownedthing must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the drownedthing. If the drownedthing dies, a swallowed creature exits the body Prone by using 5 feet of movement.

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
- Actions/Tentacle — the chassis
- Actions/Deep Chill — template exploiter; library draw (seed unstamped)
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "the thing in the well" | brute-grappler: ✓ ("the thing in the well") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "the thing in the well" is written in lowercase inside a description; the generator names it
[concept] resolve: archetype=brute type=Aberration themes=aquatic/grasping mind=bestial style=grappler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: seizing and dragging victims down the shaft [behavior] | a body of briny, weed-choked coils [body] | the flooded well it hollows out as its lair [aura]
[concept] identity: The thing in the well waits at the bottom of its shaft in absolute stillness, then erupts upward in a coil of wet, brine-slick limbs to seize a victim and drag them down into the black water. Every round after the first it holds prey under, constricting and drowning them while lashing at rescuers with the same barnacled tentacles, retreating back down the shaft whenever it is wounded to heal in the dark and wait for the next fool to lean over the edge.
[concept] lore: Something that fell into the well long ago never died there, and now it wears the well as a shell, feeding on anyone who comes to draw water and keeping their bones as trophies on the cistern floor.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — engulf_style "drown" is not on the menu — swallow, engulf, smother, whelm, cage, entomb, or cocoon
[reskin] repair round 2: 1 defect(s) — engulf_style "drown" is not on the menu — swallow, engulf, smother, whelm, cage, entomb, or cocoon
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drownedthing" — the call's own answer (kind), built from the name
[reskin] inline form: "the drownedthing" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] signature idea (action): "As it coils around its prey, the drownedthing suddenly heaves itself downward, hauling whatever it has gripped back toward the black water of its shaft — and anyone clinging to that victim comes along for the ride. Victims it drags into the water are seized by the cold dark and pulled under, left thrashing in the deep while it waits above." [rider/on_hit/movement] — menu: stunning-strike, charge-push, pounce (+ shelf: leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Well-Dragged Deep" EV 24 vs floor 23.4 (one attack of 2) — dice 14 → 18; priced at the floor: dice 18 → 31
[reskin] signature template: exploiter -> Actions/"Well-Dragged Deep" ("hauling a gripped victim and anyone clinging to it back toward the water, leavin [shape fit, no verb match]")
[reskin] signature idea (trait): "Its body weeps brine and trailing weed, and any creature that grapples it or tries to wrench free finds its limbs slick and its grip fouled — the drownedthing sheds the hold and slithers a little closer to the water each time someone lays hands on it." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: adhesive, aberrant-ground — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "adhesive" as nearest; it lands rather than the row being dropped (what it wanted: a creature that grapples it or escapes its grapple slips free and the drownedthi)
[reskin] trait declined: "Brine-Slick Coils" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] weapons answered: Tentacle = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Well-Dragged Deep.
audit finding below confidence gate: Tentacle The Restrained condition is applied by the same clause as Grappled with its own escape DC, so a target that escapes the Grapple via the DC 14 check also loses Restrained — but the text implies both are separate conditions with no separate exit for Restrained, creating ambiguity about whether escaping Grappled clears Restrained.
[reskin] audit rename: "Well-Dragged Deep" -> "Deep Chill"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a creature that grapples it or escapes its grapple slips free and the drownedthing moves a little toward water — "Its body weeps brine and trailing weed, and any creature that grapples it or tries to wrench free finds its limbs slick and its grip fouled — the drownedthing sheds the hold and slithers a little closer to the water each time someone lays hands on it." — Well Drownedthing [seat: trait [trait/on_being_hit/movement]] (closest offered: adhesive) [effect: movement] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge aberrant-ground adhesive faultless-tracker noxious-aura] [same-cell unoffered: none] [same-seat rejected: none] [VETOED AFTER ACCEPTANCE: adhesive never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
```


---


### Klahk — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Klahk | 4 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- **dropped clause:** "so it floats down from high passes on a cold wind rather than climbing"
- **dropped clause:** "testing them with a low click before it dives to rake them with those necrotic ribs"
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Rib Lattice); nova none; dmg 26

```
Klahk

Medium Aberration, Neutral Evil

AC 14
Initiative -1 (9)

HP 75 (10d8 + 30)

Speed 30 ft., Fly 30 ft. (hover)

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

Drag the Fresh Kill. While it has a creature Grappled or caged, At the start of each of the klahk's turns, it moves the freshest kill it holds up to its Speed toward its lair, dragging a Grappled creature with it.

Luring Click. The klahk knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions

Multiattack. The klahk makes two Rib Lattice attacks. It can replace one attack with.

Rib Lattice. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Wind Carry. Dexterity Saving Throw: DC 13, one creature within 30 feet that has the Grappled condition. Failure: 28 (8d6) Necrotic damage. Success: Half damage.

Bonus Actions

Cage. The klahk cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the klahk, and takes 6 (1d12) Necrotic damage at the start of each of the klahk's turns. The klahk can have only one creature caged at a time. If the klahk takes 12 damage or more in a single turn from the caged creature, the klahk must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the klahk. If the klahk dies, a caged creature pulls free Prone by using 5 feet of movement.

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
- Actions/Rib Lattice — the chassis
- Actions/Wind Carry — template condition-payoff; library draw (seed unstamped); binds the GM's words: helpless+caught
- Bonus Actions/Cage — the GM's clause "furred aberration whose ribcage has split open along the sternum into a drifting lattice of dead-white bone"; binds the GM's words: cage+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Drag the Fresh Kill — authored for this sheet; the GM's clause "every round thereafter it drags the freshest kill"
- Traits/Luring Click — template faultless-tracker; library draw (seed unstamped); the GM's clause "when bloodied it feigns a limp to lure the pursuit into a deadfall narrows"; binds the GM's words: pursuit+follows

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-grappler: ✓ ("drags the freshest kill and the choicest") | brute-grappler: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Aberration themes=uncanny/grasping mind=sapient style=grappler lore=✓
[concept] synthesis text: A Slope-Render is a single gaunt, furred aberration whose ribcage has split open along the sternum into a drifting lattice of dead-white bone, so it floats down from high passes on a cold wind rather than climbing. It shadows travelers for hours, testing them with a low click before it dives to rake them with those necrotic ribs, and every round thereafter it drags the freshest kill and the choicest loot back to a bone-littered crag. Scheming and patient, it hoards trophies by value, not hunger, and when bloodied it feigns a limp to lure the pursuit into a deadfall narrows. It is scheming (INT 14-16), and it is a hoarder that drags its kills back to a lair of trophies.
[concept] signature elements: necrotic bone lattice ribcage [body] | drags kills and loot to a hoard lair [behavior] | feigned limp lure into deadfall [behavior]
[concept] name proposal: Rib Drifter
[concept] lore: It nests in the highest, coldest crags above the passes, and it descends only when a traveler carries something worth adding to its frozen trophy hoard.
[reskin] donor: brute-5-grappler -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] engulf engine: Cage — the body's own verb
[reskin] engine interior scaled — CR 4 sits below the brute-5-grappler seat
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the klahk" — the call's own answer (kind), built from the name
[reskin] inline form: "the klahk" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "so it floats down from high passes on a cold wind rather than climbing" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "so it floats down from high passes on a cold wind rather than climbing" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "not hunger" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A Slope-Render is a single gaunt" -> has (descriptive), head | "furred aberration whose ribcage has split open along the sternum into a drifting lattice of dead-white bone" -> has (mechanical) | "so it floats down from high passes on a cold wind rather than climbing" -> has (mechanical) [asked: at_will/at_will/movement] | "It shadows travelers for hours" -> has (descriptive) | "testing them with a low click before it dives to rake them with those necrotic ribs" -> has (mechanical) [asked: attack] | "every round thereafter it drags the freshest kill" -> has (mechanical) | "the choicest loot back to a bone-littered crag" -> has (descriptive) | "Scheming and patient" -> has (descriptive) | "it hoards trophies by value" -> has (descriptive) | "not hunger" -> has (descriptive) | "when bloodied it feigns a limp to lure the pursuit into a deadfall narrows" -> has (mechanical) [asked: when_bloodied/condition] | "It is scheming (INT 14-16)" -> has (descriptive) | "it is a hoarder that drags its kills back to a lair of trophies" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The klahk takes hold of a creature it already has caught in its ribs, lifts it off the ground, and carries it away on the cold wind, flying at its full pace toward its lair — the held victim moving with it, helpless, until the klahk sets it down or lets go. Once a creature has been carried this way for more than a brief moment, the klahk can keep dragging it along even when it is no longer holding" [action/always/movement] — menu: leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, seal, lure, pacify, snare-bolt, slow-bolt, sensory-strike (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, rampage, patient-defense, feint-slip, riposte, charge-push, pounce)
[reskin] signature bound to the concept's verb: action — rampage (bloodied, blood)
[reskin] word match declined by the call: exploiter, pacify, condition-payoff — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "condition-payoff" as nearest; it lands rather than the row being dropped (what it wanted: carries the grappled creature along with the klahk's flight and keeps it in tow)
[reskin] value check: "Cold Wind Carry" EV 21.7 vs floor 18.2 (one attack of 2) — worth the trade
[reskin] signature template: condition-payoff -> Actions/"Cold Wind Carry" ("The idea is a carry/movement mechanic: the klahk lifts an already-grappled creat [verb: helpless:idea, caught:idea]")
[reskin] signature idea (trait): "The klahk's drifting ribs and clicking calls work on the mind, not just the flesh: a creature that hears its low click while the klahk is out of sight feels compelled to follow the sound and cannot look away from it, wandering toward the promise of a fight and leaving its back open. Whether the victim presses on or freezes, the klahk learns exactly where it is and can shadow it patiently from abov" [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — faultless-tracker, bloodied-fury, uncanny-sense, bloodied-burst (pursuit, bloodied, blood)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense, bloodied-burst, terrain-walk, shielded-mind, false-appearance, phobia, berserk, gaze-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "faultless-tracker" as nearest; it lands rather than the row being dropped (what it wanted: a failed save forces the victim to move toward the clicking creature, leaving it)
[reskin] signature template (trait): faultless-tracker -> Traits/"Luring Click" ("The closest is faultless-tracker: the klahk learns exactly where its victim is a [verb: pursuit:concept, follows:idea]")
[reskin] repair: 2 clause(s) with no row — "every round thereafter it drags the freshest kill", "it is a hoarder that drags its kills back to a lair of trophies"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Rib Lattice = none
[reskin] save follows the effect: Actions/"Cold Wind Carry" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Cold Wind Carry.
[reskin] row binds its clause: "Cage" answers "furred aberration whose ribcage has split open along the sternum into a drifting lattice of dead-white bone" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Luring Click" answers "when bloodied it feigns a limp to lure the pursuit into a deadfall narrows" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "so it floats down from high passes on a cold wind rather than climbing" asked for at_will/at_will and no row binds the clause
[reskin] ask vs row MISMATCH: "when bloodied it feigns a limp to lure the pursuit into a deadfall narrows" -> "Luring Click" — trigger: asked when_bloodied, row reads at_will
[reskin] name follows content: Actions/"Cold Wind Carry" carries Cold the row never deals — "Wind Carry" (the element word drops; the call's own noun stays)
[reskin] multiattack re-read — "Cold Wind Carry" left; "Multiattack" now reads "The klahk makes two Rib Lattice attacks. It can replace one attack with."
[reskin] save stat from print grammar: Actions/Wind Carry imposes Grappled by its own text — no record on the row, so the grammar stood in (A2 gap)
audit rewrite meta-language, dropped: Multiattack It can replace one attack with Wind Carry.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] carries the grappled creature along with the klahk's flight and keeps it in tow — "The klahk takes hold of a creature it already has caught in its ribs, lifts it off the ground, and carries it away on the cold wind, flying at its full pace toward its lair — the held victim moving with it, helpless, until the klahk sets it down or lets go. Once a creature has been carried this way for more than a brief moment, the klahk can keep dragging it along even when it is no longer holding" — Klahk [seat: action [action/always/movement]] (closest offered: condition-payoff) [effect: movement] [menu: rampage leap condition-payoff shield-bash active-toll random-ray ground-burst spew herd thrown-burst-seed drain wind-up exploiter seal lure pacify snare-bolt slow-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:legality zone-seed:role] [landed: condition-payoff]
[reskin] [gap] a failed save forces the victim to move toward the clicking creature, leaving it open — "The klahk's drifting ribs and clicking calls work on the mind, not just the flesh: a creature that hears its low click while the klahk is out of sight feels compelled to follow the sound and cannot look away from it, wandering toward the promise of a fight and leaving its back open. Whether the victim presses on or freezes, the klahk learns exactly where it is and can shadow it patiently from abov" — Klahk [seat: trait [trait/always/condition]] (closest offered: faultless-tracker) [effect: movement] [menu: faultless-tracker bloodied-fury uncanny-sense bloodied-burst false-appearance adhesive phobia terrain-walk aberrant-ground web-walker noxious-aura berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura death-burst] [same-cell unoffered: none] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role guarded-stance:role assassinate:role blurred-form:role] [landed: faultless-tracker]
```


---


### Air Elemental — in the run

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Air Elemental | 5 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | ok |

- structure · fail · two-novas: two Recharge novas on one sheet: "Chorus Barrage" and "Whirlwind"
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
+2
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+8
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
6
-2
-2

Skills Perception +3, Stealth +11

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Stolen Voices. The air elemental can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Chorus Barrage (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the air elemental. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success: Half damage only.

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
- Actions/Chorus Barrage — template active-toll; library draw (seed unstamped); binds the GM's words: ring+deafen
- Actions/Whirlwind — print's own row
- Traits/Stolen Voices — template mimicry; library draw (seed unstamped); the GM's clause "carries stolen voices"; binds the GM's words: stolen voice+stolen voices+voices
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] lurker-phantom type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("that carries stolen voices") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Elemental themes=voice/aerial mind=sapient style=phantom energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: hoarded stolen voices [object] | hurling voices as a thunderous barrage [behavior] | a shrieking storm-wind body [body]
[concept] identity: The stolen-voice elemental rushes a foe on a shrieking gust of storm-air, then hovers just out of reach to hurl the hoarded voices at it in a confusing, deafening barrage — every stolen shout, scream, and whisper detonating as thunder. It is a cowardly bully of the air: when bloodied it hurls one last stolen scream and tries to dissolve into mist, already hunting a new throat to rob.
[concept] lore: When a dying breath is loosed into a gale, the wind sometimes swallows it whole; an air elemental born of such a gale collects those final words like coins and will not be silent until every voice it stole has been played back at the living.
[reskin] print canon route: the Air Elemental's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 73 -> 90, AC 15 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The elemental gathers every stolen voice it hoards into one bursting chord and hurls it at a foe it can see, not as a single strike but as a rolling barrage of overlapping shouts and screams. Each voice that lands keeps ringing in the target's ears — the more times the barrage catches the same foe, the more deafened and disoriented they become, their own thoughts drowned under the dead. The elemen" [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, trample, thrown-burst-seed, curse-debt, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: sensory-strike, wail, thrown-burst-seed, ground-burst, wind-up, terror-pulse — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "active-toll" as nearest; it lands rather than the row being dropped (what it wanted: repeats the same ranged voice-bolt on later turns, stacking deafness each time i)
[reskin] seat takes its clause: "Chorus Barrage (Recharge 5-6)" answers "carries stolen voices" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: active-toll -> Actions/"Chorus Barrage (Recharge 5-6)" ("The core verb of the idea is a repeated ranged barrage of thunder that stacks a  [verb: ring:idea, deafen:idea]")
[reskin] signature idea (trait): "The elemental is never truly silent — stolen voices leak out of it constantly, whispering and shrieking just beneath hearing. Anyone who stands close to it hears their own name gasped in a stranger's dying accent, and the elemental always knows when a living creature with a voice comes near, no matter how well that creature hides." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, berserk (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] signature template (trait): mimicry -> Traits/"Stolen Voices" ("The creature carries stolen voices — voices leak out of it constantly, whisperin [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] weapons answered: Gust Slam = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Air Elemental's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 30 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gust Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the air elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Air Elemental's
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] row binds its clause: "Stolen Voices" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Chorus Barrage Name implies a musical/mimicry 'chorus' tied to Stolen Voices, but the entry only deals Thunder damage and Deafens; no voice, sound-mimicry, or chorus mechanic is delivered.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename blocked — "Whirlwind (Recharge 4-6)" is the user's own part name, a kit feature's real name, or print's own row
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] repeats the same ranged voice-bolt on later turns, stacking deafness each time it lands — "The elemental gathers every stolen voice it hoards into one bursting chord and hurls it at a foe it can see, not as a single strike but as a rolling barrage of overlapping shouts and screams. Each voice that lands keeps ringing in the target's ears — the more times the barrage catches the same foe, the more deafened and disoriented they become, their own thoughts drowned under the dead. The elemen" — Air Elemental [seat: action [action/save/damage]] (closest offered: active-toll) [effect: condition] [menu: leap gaze-single execute seal wail lure active-toll random-ray ground-burst spew obstacle-pull pacify escalating-dread terror-pulse snare-bolt slow-bolt sensory-strike drain zone-seed blighted-ground trample thrown-burst-seed curse-debt wind-up] [same-cell unoffered: thrown-burst condition-payoff burrow-ambush exploiter] [same-seat rejected: swallow:legality thrown-burst:role snare:role reel:role condition-payoff:legality shield-bash:role hook-drag:legality pull-through:legality burrow-ambush:legality disarm:role push-prone:role herd:role reveal:role exploiter:legality] [landed: active-toll]
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova none; dmg 48

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

Sorrowful Wrath. While Bloodied, the stone golem has Advantage on attack rolls.

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Sorrowful Pilgrimage.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Sorrowful Pilgrimage. Strength Saving Throw: DC 17, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the stone golem and has the Prone condition.

Bonus Actions

Slow (Recharge 5-6). The stone golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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
- Actions/Sorrowful Pilgrimage — template push-prone; library draw (seed unstamped); binds the GM's words: knock+push
- Traits/Sorrowful Wrath — template bloodied-fury; library draw (seed unstamped); binds the GM's words: fury
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: carved saint in stone, weeping [body] | relentless pilgrimage procession [behavior] | crushing, pinning stone grip [behavior]
[concept] identity: A hulking stone saint that advances in slow, deliberate pilgrimage-strides, then brings both massive hands down on whatever stands between it and its purpose. Every round it repeats the same relentless litany — step, weigh, crush — using its great stone mass to pin and break rather than chase; when its stone takes damage it weeps a trickle of cold grey tears and grinds faster, never retreating, only intensifying its brutal procession until destroyed.
[concept] lore: Carved as a weeping saint for a faith that had already forgotten it, this golem was animated by the grief poured into it and now walks a pilgrimage of penance, seeking a congregation to crush into its flock.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the stone golem" — the call answered "the stone golem" (kind), which the name does not support
[reskin] inline form: "the stone golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] signature idea (action): "It begins a slow, deliberate pilgrimage-stride that does not stop for anything: for a short while it simply walks forward at its unhurried pace, pushing through the space of anyone in its path and shoving them aside or knocking them down, and every creature it reaches on that walk gets one crushing downward blow from its stone hands. It never reverses, never circles, never chases; the procession o" [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest; it lands rather than the row being dropped (what it wanted: a forward stride that moves through and shoves aside creatures in its path while)
[reskin] seat takes its clause: "Sorrowful Pilgrimage" answers "— carved as a weeping saint" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: push-prone -> Actions/"Sorrowful Pilgrimage" ("It begins a slow, deliberate pilgrimage-stride that does not stop for anything: for a short while it simply walks forward at its unhurried pace, pushing through [verb: knock:idea, push:idea]")
[reskin] signature idea (trait): "Whenever its stone is chipped or cracked by an attack, cold grey tears well from the carved face and it grinds forward faster and harder, striking back harder with each blow that lands. The more punishment its saintly body takes, the more grief-fuelled fury it gathers, until it is destroyed." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, bloodied-burst, aberrant-ground, heated-body, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] free signature row: "Sorrowful Wrath" — the trait seat cannot quote the GM, but the call names the element it expresses: "carved saint in stone, weeping". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Sorrowful Wrath" answers "— carved as a weeping saint" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-fury -> Traits/"Sorrowful Wrath" ("the more punishment its body takes, the more grief-fuelled fury it gathers — chi [verb: fury:idea]")
[reskin] weapons answered: Stone Fists = none; Sorrowful Stones = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fists" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sorrowful Stones" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Sorrowful Pilgrimage.
audit finding below confidence gate: Slow (Recharge 5-6) The *Slow* spell is named in italics as a spell, but the statblock format uses plain text for spell references; the italic markers and the missing "spell" formatting may render inconsistently and are not statblock language.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a forward stride that moves through and shoves aside creatures in its path while striking each one reached — "It begins a slow, deliberate pilgrimage-stride that does not stop for anything: for a short while it simply walks forward at its unhurried pace, pushing through the space of anyone in its path and shoving them aside or knocking them down, and every creature it reaches on that walk gets one crushing downward blow from its stone hands. It never reverses, never circles, never chases; the procession o" — Stone Golem [seat: action [trait/start_of_turn/movement]] (closest offered: push-prone) [effect: movement] [menu: fire-aura warded-mending push-prone] [same-cell unoffered: none] [same-seat rejected: none] [landed: push-prone]
```


---


### Plague Archon — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plague Archon [seed 1/2] | 13 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 16 → 12.5; sustained 72 (3 × Talon); nova Stoop 67; dmg 93

```
Plague Archon

Large Fiend, Neutral Evil

AC 18
Initiative +5 (15)

HP 190 (20d10 + 80)

Speed 40 ft., Fly 80 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
20
+5
+10
WIS
16
+3
+8
MOD
SAVE
CON
18
+4
+4
CHA
12
+1
+1

Skills Perception +8, Stealth +10

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 18

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Brood Retort. A creature that touches the archon or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Poison damage.

Drifting. The archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Drift Step. When a creature the archon can see ends its turn within 5 feet of it, the archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The archon makes three Talon attacks.

Talon. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Stoop (Recharge 5-6). The archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 17. Failure: 67 (15d8) Poison damage, and the target has the Prone condition. Success: Half damage.

Bonus Actions

Aerial Agility. The archon takes the Dash or Disengage action.

Broodcall (2/Day). Each ally within 30 feet of the archon gains 13 (3d8) Temporary Hit Points.

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

- Traits/Brood Retort — template heated-body; library draw (seed unstamped); binds the GM's words: plague
- Traits/Drifting — the chassis
- Traits/Drift Step — the chassis
- Actions/Multiattack — the chassis
- Actions/Talon — the chassis
- Actions/Stoop — the chassis
- Bonus Actions/Aerial Agility — the chassis
- Bonus Actions/Broodcall — library seed rally; the GM's clause "commands lesser swarms"; binds the GM's words: command

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("archon of flies — a flyer")
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/aerial mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commands lesser swarms [behavior] | body of plague-bearing flies and chitin [body] | swooping snatch-and-drop strikes [behavior]
[concept] identity: The Plague Archon descends on wings of feverish, rattling flies, opening combat by loosing a squalling swarm from its own body to harry and poison a cluster of foes before it stoops. Every round thereafter it peels off its own living chitin to sustain the swarm, striking on the wing with a plague-crusted talon and dropping hauling victims from height when it can. Its mind is coldly tactician-sapient, circling and reassembling its brood when hurt, but it fights to the death once its hive is threatened.
[concept] lore: Spun from the corpse-litter of a forgotten god of pestilence, the Plague Archon drifts between blighted villages to seed new broods and feed its endless swarm on the living.
[reskin] donor: skirmisher-13-winged -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the archon" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The archon spits a screaming knot of its own flies at a spot it can see, and they cling and burrow into everything nearby. Those caught in the cloud are sickened by the plague they carry, and the brood stays put as a crawling haze that keeps harassing anyone still inside it while the archon circles above." [action/save/damage] — menu: condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, herd, gaze-single, snare, execute, seal, pacify, escalating-dread (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rally, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] word match declined by the call: contagion, sensory-strike, snare-bolt, herd, exploiter, condition-payoff — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "sensory-strike" as nearest; it lands rather than the row being dropped (what it wanted: creates a lingering cloud at a chosen point that sickens and keeps damaging crea)
[reskin] value check: "Brood Spit" EV 3.4 vs floor 13 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Brood Spit" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: herd, condition-payoff, sensory-strike, exploiter left the shelf — the call declined them for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is a living hive, so whenever it is wounded the spilled flies boil outward and fix on the attacker, plaguing them with the archon's sickness. It can shake loose its brood and call them home again, so the swarm is never truly lost while the archon lives." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature template (trait): heated-body -> Traits/"Brood Retort" ("whenever the archon is wounded, its spilled flies boil outward and fix on the at [verb: plague:concept]")
[reskin] weapons answered: Talon = none
[reskin] chassis nova: "Stoop (Recharge 5-6)" — the skirmisher-13-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] resistances derived: Cold
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] row binds its clause: "Bolstering Cry" answers "commands lesser swarms" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Swarm Shift" -> "Drift Step"
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Broodcall (2/Day)"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Broodcall (2/Day)) — the sameness metric
[reskin] [gap] creates a lingering cloud at a chosen point that sickens and keeps damaging creatures inside it over time — "The archon spits a screaming knot of its own flies at a spot it can see, and they cling and burrow into everything nearby. Those caught in the cloud are sickened by the plague they carry, and the brood stays put as a crawling haze that keeps harassing anyone still inside it while the archon circles above." — Plague Archon [seat: action [action/save/damage]] (closest offered: sensory-strike) [effect: condition] [menu: contagion condition-payoff shield-bash lure snare-bolt sensory-strike disarm exploiter herd gaze-single snare execute seal pacify escalating-dread patient-defense] [same-cell unoffered: trample leap thrown-burst active-toll ground-burst spew burrow-ambush thrown-burst-seed drain curse-debt wind-up blighted-ground] [same-seat rejected: swallow:legality trample:style leap:legality thrown-burst:style reel:style hook-drag:role active-toll:role pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role terror-pulse:role slow-bolt:role push-prone:role drain:role curse-debt:role reveal:role wind-up:role blighted-ground:role] [VETOED AFTER ACCEPTANCE: sensory-strike never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | FAIL: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok |

- structure · fail · duplicate-mechanic: 3 rows impose Prone — Bite, Tail Stinger, Swallow; print has no block with three (0 of 329)
- read: def 12 / off 12 → 12; sustained 51 (1 × Tail Stinger); nova Acid Burst 42; dmg 62

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

Acid Burst. The first time the worm is Bloodied in a fight, it releases a burst. Strength Saving Throw: DC 21, each creature in a 30-foot Emanation originating from the worm. Failure: 42 (12d6) Acid damage. Success: Half damage only.

Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the worm moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 22 (5d8) Acid damage and, if it is Huge or smaller, has the Prone condition. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage. If the worm moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 22 (5d8) Acid damage and, if it is Huge or smaller, has the Prone condition.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 17 (5d6) Acid damage at the start of each of the worm's turns.
If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the worm and has the Prone condition. If the worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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
- Actions/Bite — print's own row; binds the GM's words: ram
- Actions/Tail Stinger — print's own row; binds the GM's words: ram
- Traits/Acid Burst — template bloodied-burst; library draw (seed unstamped); binds the GM's words: wounded
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: a swallowed war-band's armoury churning in its gut [body] | spitting a volley of blades and mail [behavior] | swallowing prey whole down an acid throat [behavior]
[concept] identity: A Gargantuan purple worm whose gullet is a walking armoury — swords, shields, spearheads and mail grind and churn in its acid gut, and it can spit that loaded scrap back out in a shrapnel volley before lunging to bite and swallow. Each round it hauls its armoured length up from below to seize prey in its maw, using the swallowed war-band's blades as a biting edge and its iron-stuffed bulk as a ram; under pressure it burrows to reposition, then erupts again to drag a fresh victim down.
[concept] lore: A war-band's supply column vanished on the deep road, and the purple worm that took the whole train of blades and mail still carries the armoury in its gut, surfacing wherever the smell of more iron — or more men — draws it.
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
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The worm hauls its armoured length up and rams with the iron-stuffed bulk of its gut, driving the target back and off its feet before the maw comes down. Anyone struck this way is left sprawled and bleeding where the worm's coils can reach them, easy prey for the next bite or the shrapnel that follows. It can only wind up for this slam after a stretch of churning and grinding its swallowed hoard, " [action/save/condition] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "charge" as nearest; it lands rather than the row being dropped (what it wanted: a ram that drives the target back and knocks it Prone as part of a built-up slam)
[reskin] seat takes its clause: "Charge" answers "swallowed a war-band's armoury" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: charge -> Bite (appended; The worm hauls its armoured length up and rams with the iron-stuffed bulk of its gut, driving the target back and off its feet before the maw comes down. Anyone [verb: ram:idea])
[reskin] signature idea (trait): "The blades and mail lodged in its gut never stop grinding, and when the worm is wounded the acid-slicked scrap is churned up and sloshes loose from the wounds, spraying anyone pressed close to its hide. The more it is hurt, the more of the war-band's iron it sheds onto those around it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: heated-body, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] free signature row: "Scrap Spray" — the trait seat cannot quote the GM, but the call names the element it expresses: "a swallowed war-band's armoury churning in its gut". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Scrap Spray" answers "swallowed a war-band's armoury" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-burst -> Traits/"Scrap Spray" ("when wounded, the acid-slicked scrap is churned up and sloshes loose from the wo [verb: wounded:idea]")
[reskin] repair: 1 clause(s) with no row — "swallowed a war-band's armoury"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:swallowed a war-band's armoury"]
[reskin] clause answered in prose: "swallowed a war-band's armoury" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bite = none; Shrapnel Volley = none; Iron Gut Lunge = none
[reskin] chassis nova: "Shrapnel Volley (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Shrapnel Volley (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] save re-derived after a retype: Traits/Scrap Spray — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Scrap Spray" -> "Acid Burst"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a ram that drives the target back and knocks it Prone as part of a built-up slam — "The worm hauls its armoured length up and rams with the iron-stuffed bulk of its gut, driving the target back and off its feet before the maw comes down. Anyone struck this way is left sprawled and bleeding where the worm's coils can reach them, easy prey for the next bite or the shrapnel that follows. It can only wind up for this slam after a stretch of churning and grinding its swallowed hoard, " — Purple Worm [seat: action [action/save/condition]] (closest offered: charge) [effect: condition] [menu: swallow condition-payoff shield-bash hook-drag burrow-ambush escalating-dread terror-pulse herd drain exploiter gaze-single snare seal lure pacify snare-bolt hook-rider charge] [same-cell unoffered: noxious-aura truth-aura gaze-aura random-ray sensory-strike push-prone reveal] [same-seat rejected: trample:legality leap:legality thrown-burst:legality reel:role execute:role active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality obstacle-pull:role slow-bolt:role sensory-strike:role disarm:role curse-debt:role reveal:role wind-up:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: charge never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] one mechanic, at most twice: "Swallow" drops its Prone rider — 4 rows imposed it and print has none with three; the row, its damage and its name all stay
[reskin] one mechanic, at most twice: "Acid Burst" drops its Prone rider — 4 rows imposed it and print has none with three; the row, its damage and its name all stay
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 21 / off 11 → 16; sustained 43 (1 × Fiery Mace); nova Oath-Fueled Detonation 28; dmg 47

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

Oath-Fueled Detonation. The fiend explodes when it dies. Dexterity Saving Throw: DC 21, each creature in a 30-foot Emanation originating from the fiend. Failure: 28 (8d6) Fire damage. Success: Half damage. The explosion destroys the fiend's body.

Legendary Resistance (3/Day). If the fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oath Reaping.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Oath Reaping. Constitution Saving Throw: DC 21, one creature within 30 feet. Failure: 17 (5d6) Fire damage, and the fiend regains Hit Points equal to half the damage dealt.

Hellfire Spellcasting (Recharge 4-6). The fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

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

- Traits/Oath-Fueled Detonation — template death-burst; library draw (seed unstamped); the GM's clause "collects the oaths of dying knights"; binds the GM's words: dying
- Traits/Legendary Resistance — the chassis
- Traits/Diabolical Restoration — print's own row
- Traits/Fear Aura — print's own row
- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row, renamed
- Actions/Fiery Mace — print's own row; weapon mace
- Actions/Devilish Claw — print's own row
- Actions/Oath Reaping — template drain; library draw (seed unstamped); binds the GM's words: drink
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] brute type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to brute's plain line | defender: the call read "knights" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Fiend themes=fiendish/forged mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: harvesting the oaths of dying knights [behavior] | black-iron armor of fused vow-chains [body] | ensnaring chains and hooks [object]
[concept] identity: A Pit Fiend of the oath-forge advances slowly and openly, engaging the strongest foe in plain melee while its iron chains and hooked limbs corral the rest; once locked it demands nothing and grants nothing, simply grinding enemies down while every dying vow sworn in its presence knits its black-iron flesh back together. It never flees and never hurries — it is patient as a debt, and it lets wounded knights crawl a few steps only to remind them their word was already collected.
[concept] lore: Forged in the lowest vault of the Nine Hells from the molten chains of broken compacts, the Oath-Reaper descends to battlefields to harvest the final promises of dying knights — each sworn word hardening into new armor, each broken vow another link to be collected.
[reskin] print canon defenses: HP 347 -> 337, AC 20 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: brute-21 -> CR 20 (invented — no printed peer)
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the fiend" — the call answered "the fiend" (kind), which the name does not support
[reskin] inline form: "the fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "As dying foes fall around it, the fiend reaches down and reels in their final words, drawing strength from every oath abandoned mid-breath. For each creature near death in its presence, the chains drink the vow and mend its iron flesh, so that a battlefield full of broken knights only makes it harder to kill." [trait/start_of_turn/defense] — menu: fire-aura, warded-mending (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — aggro-curse (oath)
[reskin] closest accepted: action — the call refused every template but named "drain" as nearest; it lands rather than the row being dropped (what it wanted: regains Hit Points whenever a nearby creature drops near death — self-healing ke)
[reskin] seat takes its clause: "Oath Reaping" answers "collects the oaths of dying knights" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: drain -> Actions/"Oath Reaping" ("As dying foes fall around it, the fiend reaches down and reels in their final words, drawing strength from every oath abandoned mid-breath. For each creature ne [verb: drink:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Whenever a creature is freshly cowed or laid low in its presence, the last vow it shaped hardens into fresh black links that coil around the fiend's hide. Each new promise it takes makes its armor heavier and tougher until the collected oaths are spent." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, evasion, guarded-stance, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — death-burst, bloodied-burst (dying)
[reskin] word match declined by the call: death-burst, bloodied-burst — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "death-burst" as nearest; it lands rather than the row being dropped (what it wanted: grants the creature a stacking bonus to its Armor Class that it can expend inste)
[reskin] signature template (trait): death-burst -> Traits/"Oath-Harvested Armor" ("The idea is that oaths from freshly cowed or slain creatures harden into links t [verb: dying:concept]")
[reskin] weapons answered: Hooked Chain = none
[reskin] chassis nova: "Oath Harvest (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Fly 40 ft. — the concept's movement set decides
[reskin] languages by mind: "Infernal, Telepathy 120 ft." -> "Infernal, telepathy 120 ft." (sapient)
[reskin] print canon languages: "Infernal, telepathy 120 ft." -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Pit Fiend's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Hooked Chain" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "the fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Oath Harvest (Recharge 5-6)" is the seat's nova, not the Pit Fiend's
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Oath Reaping.
[reskin] row binds its clause: "Oath-Harvested Armor" answers "collects the oaths of dying knights" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Oath-Harvested Armor" -> "Oath-Fueled Detonation"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] regains Hit Points whenever a nearby creature drops near death — self-healing keyed to others' plight, not a one-target  — "As dying foes fall around it, the fiend reaches down and reels in their final words, drawing strength from every oath abandoned mid-breath. For each creature near death in its presence, the chains drink the vow and mend its iron flesh, so that a battlefield full of broken knights only makes it harder to kill." — Pit Fiend [seat: action [trait/start_of_turn/defense]] (closest offered: drain) [effect: defense] [menu: aggro-curse fire-aura warded-mending terror-pulse drain exploiter rally] [same-cell unoffered: none] [same-seat rejected: none] [landed: drain]
[reskin] [gap] grants the creature a stacking bonus to its Armor Class that it can expend instead of detonating something when nearby c — "Whenever a creature is freshly cowed or laid low in its presence, the last vow it shaped hardens into fresh black links that coil around the fiend's hide. Each new promise it takes makes its armor heavier and tougher until the collected oaths are spent." — Pit Fiend [seat: trait [trait/always/defense]] (closest offered: death-burst) [effect: defense] [menu: death-burst bloodied-burst false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura evasion guarded-stance blurred-form heated-body resonant-body] [same-cell unoffered: shell-withdraw patient-defense] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality assassinate:role] [landed: death-burst]
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
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: fused owl-and-bear body of hooked beak, feathers, and killing claws [body] | territorial ambush and relentless charge [behavior]
[concept] identity: An owlbear charges on four heavy limbs and rears to its full height to crush its prey beneath a bear's forelimbs and a hooked beak, then stands over the kill and tears it apart. Each round it lunges, rakes, and bites without a moment's setup, a wall of fused feather and muscle that would rather absorb a blow than dodge one. It fights to the death once bloodied, its temper flipping from sullen stalking to shrieking, all-in savagery.
[concept] lore: A mad wizard's union of owl and bear, the owlbear is a sterile, foul-tempered hybrid that stakes out a hunting ground and defends it against anything it can catch.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Claw = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Claw" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Disciplined Formation
- **dropped clause:** "fights from a shield wall"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

```
Vashka the Red

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

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Disciplined Formation. While Vashka isn't Bloodied, Vashka can't be moved against its will by any effect, and it has Immunity to the Frightened and Charmed conditions.

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Wall Drive. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from Vashka and has the Prone condition.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

- Traits/Disciplined Formation — authored for this sheet; the GM's clause "never breaks ranks"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Wall Drive — template push-prone; library draw (seed unstamped); binds the GM's words: shove+push
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: the never-breaking shield wall [behavior] | lacquered plate and shield [object] | punishing anyone who slips past the line [behavior]
[concept] identity: Vashka the Red plants his lacquered plate behind a locked shield wall and opens by advancing one slow, measured step until the front rank is in reach, daring the line to bend first. Every round after that he holds formation — shield high, blade working over the rim — punishing any foe who tries to slip past him with a hooked shield-bash and a short, brutal cut. He is a soldier, not a butcher: he never breaks ranks, never pursues a rout, and fights to the last with the cold patience of a commander who expects the line to hold.
[concept] lore: Vashka the Red rose from the rear ranks of a hobgoblin legion by never losing a shield wall, and now he sells that unbroken formation to whichever warlord pays — or crushes the one who doesn't.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: guarded-stance yields — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "fights from a shield wall" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "fights from a shield wall" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] the clause is its own quote: limit "at_will" stands on "never breaks ranks" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: at_will/at_will/buff_self] | "never breaks ranks" -> has (mechanical) [asked: at_will/resist]
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka drives the wall forward: he plants hard and shoves each enemy in front of him back a step with his shield, and any ally pressed up behind him can move that same distance with him, keeping the line unbroken instead of scattering. Foes who will not give ground stay locked against the rim, unable to back away while he keeps pushing — and once he has shoved them, he steps with them, so the spac" [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, wail, zone-seed (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, rampage, focus, feint-slip, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest; it lands rather than the row being dropped (what it wanted: shoves a line of foes back a fixed distance while allies pressed behind advance )
[reskin] seat takes its clause: "Shield Wall Drive" answers "Vashka the Red — A hobgoblin in lacquered plate" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: push-prone -> Actions/"Shield Wall Drive" ("The idea is a pushing shield wall that shoves foes back while allies advance abr [verb: shove:idea, push:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vashka fights shoulder to shoulder — any ally who stays close behind or beside him is sheltered by his high-held shield and lacquered plate, taking less of the harm from attacks and bursts that wash over the front rank, and he never lets an ally be pulled away from the formation while he still stands within reach to hook them back." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, evasion, blurred-form (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature template (trait): guarded-stance -> Traits/"Locked Shield Wall" ("While the creature isn't Bloodied, melee attack rolls against it are made with D [verb: shield wall:concept]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Broadsword = broadsword; Shield Bash = shield
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Gladiator's plus the concept's Goblin
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Broadsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Locked-Step Strike leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vashka makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] row binds its clause: "Locked Shield Wall" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "fights from a shield wall" -> "Locked Shield Wall" — trigger at_will, limit at_will
[reskin] ask vs row ok: "never breaks ranks" -> "Disciplined Formation" — limit at_will
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] [gap] shoves a line of foes back a fixed distance while allies pressed behind advance the same distance, and halted foes stay  — "Vashka drives the wall forward: he plants hard and shoves each enemy in front of him back a step with his shield, and any ally pressed up behind him can move that same distance with him, keeping the line unbroken instead of scattering. Foes who will not give ground stay locked against the rim, unable to back away while he keeps pushing — and once he has shoved them, he steps with them, so the spac" — Vashka the Red [seat: action [action/always/movement]] (closest offered: push-prone) [effect: movement] [menu: rally throw-retrieve seal shield-bash active-toll random-ray ground-burst obstacle-pull terror-pulse slow-bolt disarm push-prone herd curse-debt reveal wind-up wail zone-seed] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility focus feint-slip phase-slip] [same-seat rejected: none] [landed: push-prone]
[reskin] guarded stance withdrawn: Traits/"Locked Shield Wall" leaves the finished sheet — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the menu filter had checked an AC that print canon changed afterwards
```


---


### Thresher of the Dead Hive — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thresher of the Dead Hive | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "a shell that sheds acid"
- **dropped clause:** "It fights by pinning prey with two arms"
- **dropped clause:** "carving with the others"
- read: def 6 / off 10 → 8; sustained 62 (2 × Scythe-Arm); nova Caustic Spray 32; dmg 63

```
Thresher of the Dead Hive

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 40 ft., Fly 40 ft. (hover), Climb 40 ft.

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

Cracking Spray. The first time the thresher is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the thresher. Failure: 32 (5d12) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Actions

Multiattack. The thresher makes two Scythe-Arm attacks.

Scythe-Arm. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Slashing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Caustic Spray (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 32 (5d12) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Cage. The thresher cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the thresher, and takes 10 (3d6) Acid damage at the start of each of the thresher's turns. The thresher can have only one creature caged at a time. If the thresher takes 25 damage or more on a single turn from the caged creature, the thresher must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the thresher. If the thresher dies, a caged creature pulls free Prone by using 10 feet of movement.

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

- Actions/Multiattack — the GM's clause "carving with the others"
- Actions/Scythe-Arm — the chassis
- Actions/Caustic Spray — template spew; library draw (seed unstamped); binds the GM's words: spits
- Bonus Actions/Cage — binds the GM's words: cage+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Cracking Spray — template bloodied-burst; library draw (seed unstamped); binds the GM's words: crack+burst

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "acid" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: pinning prey with two scythe-arms while the other two carve [behavior] | acid-shedding shell [body] | four scythe-arms [body]
[concept] identity: The creature opens by lunging on buzzing wings to seize one foe in its two forward scythe-arms, pinning them while the remaining pair carves in overlapping strokes. Each round it spits a glob of caustic bile at anyone standing clear of its grip, and when struck its flaking shell sheds acid across everything within reach. It never retreats — it keeps squeezing, carving, and spitting until every warm thing in the chamber is still.
[concept] lore: Hatched in a lightless hive beneath a collapsed quarry, it was grown to be the colony's hands and jaws, and now that the hive is dead it keeps harvesting prey for a queen that will never come.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Cage — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the thresher" — the call answered "the dead hive" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "It has four scythe-arms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a shell that sheds acid" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "It fights by pinning prey with two arms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "carving with the others" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: at_will/attack] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/at_will/save_area] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: on_hit/at_will/condition] | "carving with the others" -> has (mechanical) [asked: at_will/attack]
[reskin] signature idea (action): "When the thresher has prey pinned in its forward arms, it does not bother spitting at that one — it hoses a fat glob of caustic bile across a whole stretch of open floor, splashing every creature not caught in its grip. Bystanders who rush in to free the pinned ally instead of keeping their distance find the floor eating through their boots and then their legs, so rescuing someone means stepping t" [action/save/damage] — menu: swallow, leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, trample, thrown-burst, execute, seal, lure, pacify (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce, snatch)
[reskin] signature bound to the concept's verb: action — exploiter, spew, shell-withdraw (pinned, spits, shell)
[reskin] value check: "Caustic Spray (Recharge 5-6)" EV 84.8 vs floor 54.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Caustic Spray (Recharge 5-6)" ("the thresher's spitting maw hoses caustic bile across open floor, splashing ever [verb: spits:concept]")
[reskin] keys spent by the action: spits
[reskin] signature idea (trait): "Whenever a blow lands hard enough to crack its shell, the flaking plates burst and spray acid in every direction — not just at the attacker, but at anyone pressed close, including prey it is carrying or caging. The harsher the hit, the worse the spray, so the fight gets more dangerous for everyone the longer they stand near it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] word match declined by the call: heated-body, death-burst, resonant-body, weapon-lodge, absorption — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-burst" as nearest; it lands rather than the row being dropped (what it wanted: A reaction that sprays acid in an area whenever a hit deals enough damage to cra)
[reskin] free signature row: "Cracking Spray" — the trait seat cannot quote the GM, but the call names the element it expresses: "acid-shedding shell". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): bloodied-burst -> Traits/"Cracking Spray" ("The idea is a reactive acid spray when the shell is cracked, scaling with the hi [verb: crack:idea, burst:idea]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"carving with the others","row":"Multiattack"}], unplaced []
[reskin] clause already answered: "carving with the others" is carried by "Multiattack" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Scythe-Arm = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] asked but unanswered: "It has four scythe-arms" asked for at_will and no row binds the clause
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit/at_will and no row binds the clause
[reskin] asked but unanswered: "It fights by pinning prey with two arms" asked for on_hit/at_will and no row binds the clause
[reskin] ask vs row ok: "carving with the others" -> "Multiattack" — limit at_will
[reskin] save stat from print grammar: Traits/Cracking Spray imposes Poisoned by its own text — no record on the row, so the grammar stood in (A2 gap)
audit finding below confidence gate: Cage A GM must mid-combat track per-turn damage from a single specific creature, hold the release until end of turn, then place the target in an unoccupied space — three branches stacked in one entry with an unplaced Prone state, which is not resolvable in ~10 seconds.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] A reaction that sprays acid in an area whenever a hit deals enough damage to crack the shell, harming both the attacker  — "Whenever a blow lands hard enough to crack its shell, the flaking plates burst and spray acid in every direction — not just at the attacker, but at anyone pressed close, including prey it is carrying or caging. The harsher the hit, the worse the spray, so the fight gets more dangerous for everyone the longer they stand near it." — Thresher of the Dead Hive [seat: trait [trait/on_being_hit/damage]] (closest offered: bloodied-burst) [effect: damage] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge aberrant-ground death-burst] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: none] [landed: bloodied-burst]
```


---


### Merebog Yaga — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Merebog Yaga | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova Saltblast 17; dmg 48

```
Merebog Yaga

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

Languages Common and any three languages

CR 7 (XP 2,900; PB +3)

Traits

Saltblast. The first time the yaga is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the yaga. Failure: 17 (5d6) Bludgeoning damage, and the target has the Blinded condition until the end of its next turn. Success: Half damage only.

Actions

Multiattack. The yaga makes three Arcane Burst attacks. It can replace one attack with a use of Brine Bog Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The yaga casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Brine Bog Hex. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: The target's Speed is halved and it can't take Reactions until the end of the yaga's next turn.

Bonus Actions

Misty Step (3/Day). The yaga casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The yaga casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Brine Bog Hex — template slow-bolt; library draw (seed unstamped); binds the GM's words: brine+bog
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Traits/Saltblast — template bloodied-burst; library draw (seed unstamped); binds the GM's words: burst
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: on the GM's own words "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("the marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=grave/aquatic mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: brine-soaked curses that steal the intruder's actions [behavior] | a body steeped and preserved in the fen's salt water [body] | the sucking marsh that pulls trespassers under [aura]
[concept] identity: The marsh witch opens a fight from cover, laying a curdling hex on the loudest trespasser before her reeds have even parted, then keeps every round aimed at taking actions away — blinding, slowing, and pinning intruders one at a time with brine-soaked curses hexed into their flesh. Under pressure she retreats into the fen, flinging curses over her shoulder and letting the marsh's sucking mud and her lingering hexes finish what she started; cornered, she fights like something drowned long ago, spiteful and never surrendering.
[concept] lore: A Fenland wise-woman who bargained with the mere for her curse-craft, she now guards the peat-water paths and leaves every trespasser to the marsh, hexed and sinking.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 4 defect(s) — name "Bog Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Bog Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Brine Hex" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Mire Rot" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] anatomy on a humanoid: "Bog Claw" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the yaga" — the call's own answer (kind), built from the name
[reskin] inline form: "the yaga" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy kept on a base row: "Brine Hex" Necrotic — the row's own noun pays for it
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] control spell gated to daily — Slow (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The yaga hurls a fistful of fen brine that clings and crusts wherever it spatters. Every foe struck by it feels the salt eat into their wounds and is left heavy and preserved, moving as though half set in a bog." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark, stunning-strike, pounce (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, gaze-single, snare, shield-bash, terror-pulse, push-prone, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] seat takes its clause: "Brine Bog Hex" answers "a marsh" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: slow-bolt -> Actions/"Brine Bog Hex" ("the fen brine clings and crusts, leaving foes heavy and preserved and moving as  [verb: brine:idea, bog:idea]")
[reskin] signature idea (trait): "The yaga's body is steeped in the fen's brine; whenever she is struck and her flesh splits, a gout of salt water bursts out at the attacker and anyone else pressed close by, stinging their eyes and soaking them." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, adhesive, berserk)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] free signature row: "Brine Burst" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body steeped and preserved in the fen's salt water". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Brine Burst" answers "a marsh" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-burst -> Traits/"Brine Burst" ("when her flesh splits from a hit, a gout of salt water bursts out, stinging the  [verb: burst:idea]")
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:curses trespassers"]
[reskin] clause answered in prose: "curses trespassers" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bog Claw = none; Brine Hex = none; Mire Rot = none; Sucking Curse = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Staff" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the yaga makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Brine Hex" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Mire Rot" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Brine Bog Hex.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Brine Burst" -> "Saltblast"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Renounced Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Renounced Templar | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Renounced Templar

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

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mace swung with both hands behind a shield [object] | holding the line and punishing anyone who moves past [behavior] | iron resolve that refuses to yield ground [aura]
[concept] identity: A templar priest who has renounced every prayer but the one that swings — he wades into the front rank with mace and shield, daring the line to break on his iron. Each round he plants himself between the party and what they protect, taking the hit and answering it with a blow that cracks mail and bone alike. He does not retreat when bloodied; a templar dies where he stands, and the more he bleeds the tighter he grips the haft.
[concept] lore: Stripped of his order and his god after a silent crusade, the templar keeps the vows he can still physically keep — shield the faithful, break the faithless — and has traded every miracle he once channeled for the weight of a mace he refuses to put down.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Haft-Thrown Hammer" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the templar" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] the clause is its own quote: limit "at_will" stands on "a templar priest with a mace" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: at_will/attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe within his reach tries to slip past him toward whatever he guards, the templar pivots and cracks his mace across the back of the attempt, stopping the movement cold and leaving the would-be runner staggered and exposed. He can do this even mid-swing, so long as he still holds his ground — the line does not open just because he is busy." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] closest accepted: action — the call refused every template but named "riposte" as nearest; it lands rather than the row being dropped (what it wanted: interrupts a creature's movement and stops it cold where it stands)
[reskin] fit declined: "Wardens' Rebuke" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The templar fights shoulder-forward behind his shield and drives the mace home with both hands; whenever a blow lands on him, the impact only winds him up, and his next swing comes back heavier while he is still bleeding from it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] closest accepted: trait — the call refused every template but named "weapon-lodge" as nearest; it lands rather than the row being dropped (what it wanted: the next Mace attack deals bonus damage after the templar is hit, scaling with b)
[reskin] trait declined: "Wounded Retaliation" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] weapons answered: Mace = mace; Shield Bash = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the templar makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
[reskin] ask vs row ok: "a templar priest with a mace" -> "Mace" — limit at_will
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] [gap] interrupts a creature's movement and stops it cold where it stands — "When a foe within his reach tries to slip past him toward whatever he guards, the templar pivots and cracks his mace across the back of the attempt, stopping the movement cold and leaving the would-be runner staggered and exposed. He can do this even mid-swing, so long as he still holds his ground — the line does not open just because he is busy." — Renounced Templar [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte slow-bolt reveal patient-defense own-turn-punisher] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:legality snap-shot:legality interpose:legality] [VETOED AFTER ACCEPTANCE: riposte never reached the sheet]
[reskin] [gap] the next Mace attack deals bonus damage after the templar is hit, scaling with blows taken rather than lodged weapons — "The templar fights shoulder-forward behind his shield and drives the mace home with both hands; whenever a blow lands on him, the impact only winds him up, and his next swing comes back heavier while he is still bleeding from it." — Renounced Templar [seat: trait [trait/on_being_hit/damage]] (closest offered: weapon-lodge) [effect: damage] [menu: absorption bloodied-burst resonant-body weapon-lodge false-appearance] [same-cell unoffered: heated-body ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality] [VETOED AFTER ACCEPTANCE: weapon-lodge never reached the sheet]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Swarm of Tolling Revenants — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Tolling Revenants | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Clapper); nova Wail 45; dmg 90

```
Swarm of Tolling Revenants

Medium Swarm of Tiny Undead, Neutral

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages None

CR 13 (XP 10,000; PB +5)

Traits

Grave Knell. At the end of each of the swarm's turns, each creature in a 5-foot Emanation originating from the swarm takes 13 (3d8) Necrotic damage.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Clapper. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

Wail (1/Day). Constitution Saving Throw: DC 17, each creature within 60 feet of the swarm that can hear it. Failure: 45 (13d6) Necrotic damage, and if the target has 45 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

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

- Traits/Grave Knell — template fire-aura; library draw (seed unstamped)
- Traits/Swarm — the chassis
- Actions/Clapper — the chassis
- Actions/Wail — template wail; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead themes=grave/uncanny mind=bestial style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a self-ringing swarm of funeral bells [body] | the death-knell aura drawn over the dying [aura] | bronze clappers and shards flung from the tolling [object]
[concept] identity: A flock of tarnished funeral bells drifts in silence until it finds the dying, then closes into a slow, clotted orbit overhead and begins to toll — a bone-deep knell that strips the last warmth from whoever lies beneath and stiffens them toward the grave. Each round it beats itself against the fading, ringing harder as the body fails, shaking loose a hail of chipped clappers and bronze shards at anything that tries to pull the victim free. It never lands and never flees; it is patient, greedy for last breaths, and will follow a wounded soul for miles rather than let another hand finish what it has begun.
[concept] lore: Born where a village buried its plague-dead in unconsecrated haste and their unmarked bells were left to molder, the ringers rise to claim the final toll that was denied them, gathering over any creature sliding toward death.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Tolling Revenant" -> "Swarm of Tolling Revenants" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the revenant" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, curse-debt, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm stops its slow orbit and hangs directly over one creature it can see, and every bell begins to toll at once—a knell aimed only at that creature, which hears it deep in its bones and feels the warmth and strength draining out of it. The tolling is patient, not a blast: it starts as a dull ache and grows more insistent while the swarm holds its station above the target, and it only ends wh" [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "wail" has no key-table verb, but the call quotes "a swarm of funeral bells that ring themselves over the dying" from the description
[reskin] value check: "Wail (1/Day)" EV 168.8 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: wail -> Actions/"Wail (1/Day)" ("the swarm hangs over one creature and every bell tolls a knell aimed only at it, [shape fit, no verb match]")
[reskin] signature idea (trait): "Any creature that is already badly hurt and lingers near the tolling pull feels its own wounds answering the bells—every toll sounds a little deeper to the dying, coaxing them further toward the grave. The worse the listener's condition, the harder the knell settles into it, dragging it closer to death the longer it stays within range." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "fire-aura" has no key-table verb, but the call quotes "funeral bells that ring themselves over the dying" from the description
[reskin] signature template (trait): fire-aura -> Traits/"Grave Knell" ("the tolling knell settles into wounded creatures near the bells each turn, dragg [shape fit, no verb match]")
[reskin] weapons answered: Clapper = none
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] threshold re-derived after the cap: Actions/Wail (1/Day) — 75 over the row's own 45 damage, so the kill branch beat the damage branch; threshold to 45
audit finding below confidence gate: Wail The Wail bypasses the swarm's own deaf-adjacent nature by requiring hearing, yet the block grants the swarm blindsight and no hearing-impaired targets are excluded; more critically the hearer-gate is a target restriction with no failing-tone narrative anchor, but the block never establishes what sound emanates, making the 'can hear it' clause unadjudicable against silence effects.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Thunderwall Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thunderwall Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 36 (2 × Claw); nova Thunder Cone 39; dmg 50

```
Thunderwall Drake

Medium Dragon, Neutral

AC 18
Initiative +1 (11)

HP 110 (17d8 + 34)

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

Actions

Multiattack. The thunderwall drake makes two Claw attacks.

Claw. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Thunder Cone (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 39 (6d12) Thunder damage. Success: Half damage.

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
- Actions/Thunder Cone — the chassis

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-wrought drake hide crackling with pressure [body] | arrogant sky-claiming temperament [behavior]
[concept] identity: The storm drake opens by gliding low and exhaling a rolling wall of thunder that crashes across the ground, flattening and scattering everything in a line. Every round after, it wheels and repositions to line up that same rolling breath before diving in to rake with claws and tail, always keeping its thunder corridor between itself and its prey. Under pressure it grows arrogant and theatrical, circling just out of reach and toying with foes rather than fleeing, only breaking off when genuinely bloodied.
[concept] lore: Hatched in the churning heart of a perpetual thunderstorm, a young storm drake rides the pressure fronts it was born from, seeking to claim a stretch of sky as its own and drive all rivals from its clouds.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Thunderwall Drake = literal; Thunder Roll = literal; Rolling Thunder = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the thunderwall drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the thunderwall drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, phase-slip, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, pacify, snare-bolt, sensory-strike, curse-debt, zone-seed, reveal (the sheet cannot render them)
[reskin] signature idea (action): "The drake takes wing and rides the storm-lightning it carries in its hide, shooting forward in a low, bellowing pass that drags a crackling wake behind it — a corridor of charged air that lingers where it flew. Any enemy caught in that wake feels its ears pop and its footing go wrong, its own movement dragged and staggered by the pressure still rolling through the air. The drake uses this to set u" [bonus_action/always/movement] — menu: rampage, lay-on-hands, second-wind (+ shelf: gaze-single, snare, zone, execute, seal, shield-bash, lure, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: charge, hook-rider — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "affliction" as nearest; it lands rather than the row being dropped (what it wanted: a lingering corridor of charged air that drags and staggers the movement of enem)
[reskin] rider declined: "Stormwake Corridor" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] signature idea (trait): "The drake's hide crackles with the storm it was hatched in, and the charge leaps to anyone who lands a blow on it — the harder they strike, the more the pressure discharges back into them, and the whole corridor of air around the drake goes tight and buzzing until its next breath. The drake loves this; it is why it circles in close and dares foes to swing." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, fire-aura — the key word does not mean the mechanic here
[reskin] free signature row: trait — "resonant-body" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "storm-wrought drake hide crackling with pressure" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] trait declined: "Stormhide Retort" — no receipt, and this sheet's free-row allowance (1) is spent (1d: a receipt decides credit, not existence)
[reskin] weapons answered: Claw = none; Thunder Roll = none
[reskin] chassis nova: "Thunder Roll (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] audit rename: "Thunder Roll (Recharge 5-6)" -> "Thunder Cone (Recharge 5-6)"
[reskin] [gap] a lingering corridor of charged air that drags and staggers the movement of enemies caught within it — "The drake takes wing and rides the storm-lightning it carries in its hide, shooting forward in a low, bellowing pass that drags a crackling wake behind it — a corridor of charged air that lingers where it flew. Any enemy caught in that wake feels its ears pop and its footing go wrong, its own movement dragged and staggered by the pressure still rolling through the air. The drake uses this to set u" — Thunderwall Drake [seat: action [bonus_action/always/movement]] (closest offered: affliction) [effect: movement] [menu: rampage lay-on-hands second-wind hook-rider affliction charge] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: blink:role shell-withdraw:legality patient-defense:role volley-order:role feint-slip:role phase-slip:role] [VETOED AFTER ACCEPTANCE: affliction never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
```


---


### Greatsword Skeleton — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Greatsword Skeleton | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Greatsword Skeleton

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

Bone Spike Riposte. A creature that touches the skeleton or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Bludgeoning damage.

Great Weapon Master. When the skeleton hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The skeleton makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

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
- Traits/Bone Spike Riposte — template heated-body; library draw (seed unstamped)
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a greatsword swung by bone [object] | relentless shock assault that stands and trades blows [behavior] | skeletal frame with no flesh to tire [body]
[concept] identity: The greatsword skeleton closes to reach with its oversized blade and never backs off, using its own body weight to commit to wide, cleaving swings that trade hits rather than dodge them. Every round it walks into the party's line and lets the sword do the talking, and it fights until it is shattered to splinters — it has no blood to flee with and no will to break.
[concept] lore: Raised by a necromancer who needed a champion rather than a soldier, this skeleton was given a greatsword too heavy for living hands and told to stand where the door is.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — renames for "Melee Attack" and "Ranged Attack" are both "Greatsword" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)
[reskin] repair round 2: 1 defect(s) — no damage type for "Hurled Blade"
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the skeleton" — the call's own answer (kind), built from the name
[reskin] inline form: "the skeleton" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The skeleton winds up and commits its whole frame to a single wide cleave that carves through everyone standing in front of it, friend or foe alike, with no interest in stopping itself. Anyone caught in that sweep is knocked staggering backward by the sheer bone-driven weight of the blade, and the momentum carries the skeleton a step forward into the gap it just made." [action/save/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, execute, curse-debt, blighted-ground (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: push-prone — the key word does not mean the mechanic here
[reskin] fit declined: "Sweeping Greatsword (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The skeleton does not brace or flinch — every blow landed on it drives it to swing harder, and it simply keeps coming until it is shattered." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] closest accepted: trait — the call refused every template but named "heated-body" as nearest; it lands rather than the row being dropped (what it wanted: hitting it makes its own attacks deal more damage)
[reskin] free signature row: "Heated Body" — the trait seat cannot quote the GM, but the call names the element it expresses: "relentless shock assault that stands and trades blows". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("The idea is that blows landed on it goad it to hit harder — no offered template  [shape fit, no verb match]")
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurled Blade" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Heated Body" -> "Bone Spike Riposte"
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] hitting it makes its own attacks deal more damage — "The skeleton does not brace or flinch — every blow landed on it drives it to swing harder, and it simply keeps coming until it is shattered." — Greatsword Skeleton [seat: trait [trait/on_being_hit/damage]] (closest offered: heated-body) [effect: damage] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge relentless-pursuit death-burst] [same-cell unoffered: ward-retaliation snap-shot riposte] [same-seat rejected: none] [landed: heated-body]
[reskin] multiattack re-read — "Shortbow" joins the combination; "The skeleton makes two attacks, using Greatsword or Shortbow in any combination."
```


---

