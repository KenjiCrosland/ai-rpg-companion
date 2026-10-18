# Case: the critic's six release conditions, worked

Runs, 33 blocks:
- `smoke-out/varied-2026-10-17T14-24-55` — 12 FRESH prompts, 3 FAIL (§5)
- `smoke-out/cues-2026-10-17T00-36-41` — 10, the cue-verdict scorecard (§2)
- `smoke-out/holds2-2026-10-17T02-23-27` — 6, auras + the critic's own prompts, 0 FAIL
- `smoke-out/bane-2026-10-17T14-21-04` — 5, the GM's bane + hold 3, 0 FAIL

Gates: 107 suites / 3454 passed; `npm run build` clean; 52 pins.

**Read §4 first.** It is what is NOT done, and two items there are weaker than
the rest of this document reads.

## 1. The six conditions

| # | condition | state |
|---|---|---|
| 1 | hold 3, the print-canon STR/DEX route | **done** — §3 |
| 2 | the troll keeps the GM's silver | **done** — §3 |
| 3 | auras aren't filler; species terrain-walk before class kit rows | **done**, both halves |
| 4 | the Serrin and Reedwraith prompts | **run**, 0 FAIL |
| 5 | a duplicate-mechanic check | **in**, as a checker SOFT note — §4 |
| 6 | failed and length-stopped calls visible | **done** |

**#3** — `Aura of Authority` was evicted twice as "chassis filler" because I had
made every rules-only donor row evictable. Filler is now what the brief says it
is, read off what the row DOES: `takes the Dash/Disengage/Hide`, or a terrain
walk. Protecting auras then cost the kit rows (Bolstering Cry and Riposte yielded
instead), which is why the critic wrote both halves together — species
terrain-walk now ranks below class kit rows. Riposte came back;
`Bolstering Cry` still yields on one sheet, where the aura is legitimately
un-evictable and nothing sits at a lower tier. That is the cap refusing a
newcomer, not a leak, and it is a policy choice now rather than a bug.

**#6** — `extractResponse` discarded `finish_reason`, so a response cut off at the
token limit returned as if complete. That is Corvane's *"Frightened of him until
the e."* passing every gate: the text was syntactically fine, just unfinished.
A length stop now throws, and callers already handle a failed call.

## 2. The cue verdict, the only evidence for 4b step 3

Ten prompts built to make the field answer both ways. Six where the override must
survive, drawn from the 497 overrides measured across 5097 saved blocks (9.8%):

| prompt | expected | result |
|---|---|---|
| "crushes the drowned against the stones" | keep | `brute-grappler ✓` |
| "charges down the chapel gate" | keep | `brute-charger ✓` |
| "guards the only bridge" | keep | `defender ✓`, "sergeant" refused as a job noun |
| "surfaces beneath a traveller" | keep | `lurker ✓` |
| "a giant crab" (BODY key) | keep | `brute-grappler ✓` |
| **"charges a fee** for every wagon" | REFUSE | `the call read "charges" as not meaning that mechanic here` |
| **"crushes his rivals in the courts of law"** | REFUSE | `the call read "crushes" as not meaning that mechanic here` |

**Two correct refusals, zero false negatives on the six keeps.** One run.

The miss is block 04: *"a battle-chaplain who blesses the faithful"* landed
`skirmisher` because `MAGIC_WORD` refused the warpriest line before the cue
question was reachable — then failed `attack-stat: Censer-Staff +7 derives from
DEX`. That is §4's open door with a reproducing prompt.

## 3. Two fixes the owner's pushback shaped

**Hold 3 was not the fork I described.** I presented it as "fix the druid or keep
the priest". The owner: *"it doesn't make sense that fixing the one would break
the other — this is not mutually exclusive."* Correct. Print's Druid DOES cast —
Spellcasting lives in `rulesRows`, and the "does this body cast" test read only
`sections.Actions` and `derived.has_spellcasting`. So the Druid looked like a body
with no magic and the plain-line forcing sent it to the skirmisher line on DEX 12
over STR 10.
`casts` could not change — the unicorn and hag pins assert it false on purpose
("casts in print, fights in melee: not casting-PRIMARY"). A separate `spellcasts`
flag reading `rulesRows`, consulted by the forcing. Live:
`Briarwarden of the Stones — donor caster-6, STR 10 DEX 12 WIS 16, rows: Verdant
Wisp | Spellcasting | Thornbound Allure | Divine Aid`. Print's array kept, keying
its real top stat. The Doppelganger still routes skirmisher; its pin holds.

**The troll's bane is a call field, not a wider word rule.** The owner: *"we can
use the keyword to modify the prompt so the llm can pay attention to the word
unless and what it actually means."* So `unless`/`only`/`except` decides whether
to ASK; the route call answers what the clause means, with a quote; the engine
validates against a closed list (nine damage types, plus silver, adamantine, cold
iron) and checks the quote verbatim. Live:

| sheet | key |
|---|---|
| Reknitting Runoff | **`damage from a silvered weapon`** |
| Wax Abbot | `Fire damage` |
| Fen Altar Troll (control, no clause) | `Acid or Fire damage` — print's default |

Two defects found on the way, both worth the critic's attention:
- the call read silver and **the sheet ignored it** — print canon installs print's
  Regeneration verbatim AFTER the bane is derived. The key is stamped in a late
  pass now. That is the ordering law for the seventh time today.
- a MATERIAL needs print's grammar: the Werewolf keys "damage from silvered
  weapons", not "silver damage".
- and the call **over-answered**, volunteering a bane on two prompts with no
  weakness clause, quoting "bog troll" and "briars" verbatim. Refused now:
  *"the words carry no weakness clause, so "fire" answers a question nobody
  asked"*.

**A pattern, not three lessons.** Polarity, the asked trigger/limit, and the bane
each needed the same gate: a field only asked under a condition must only be
ACCEPTED under that condition. Discovered separately three times. It belongs in
the 4b schema as a property of the schema.

## 4. What is NOT done, and where this document is weak

- **4b step 3 is one door of four.** The override asks. `MAGIC_WORD` (block 04
  above), `ARCHER_NOUN` and `SWARM_WORDS` still refuse lines before the cue
  question is reachable. Each is defended by a pin from an earlier critic read, so
  per the critic's own protocol they are rulings, not rewrites. The varied batch
  did NOT exercise the last two — no refusal fired — so they have no fresh
  evidence either way.
- **The duplicate-mechanic check and the dangling-reference guard are both pinned
  at the predicate and NEITHER has fired on a live run.** The duplicate check took
  three wrong shapes first: a word-subset test rejected print's Werebear (the
  329-block corpus test caught it), then print's Swarm trait, then it flagged
  nothing at all because `seen` fills as it iterates. It is a prefix test over
  pairs now, reporting from the checker rather than repairing from the lint —
  as a lint `correctable` it drove the repair path and rewrote unrelated rows.
- **The consistency pass is a proposal, not code.** Four separate ad-hoc passes
  now edit a verbatim row where it contradicts the sheet: the weapon retable
  (range), the bane stamp (key), the rename re-weapon block (name vs numbers),
  the dangling decline (cited rows). None knows about the others, and Pack
  Tactics' *"the warrior"* is the fifth instance, still open because no pass owns
  it. Measured: 15 templates carry a flavor slot, 66 carry none — verbatim is
  working as designed, so the gap is consistency, not licence.
- **Seed share says nothing yet.** The varied batch drew only 4 seeds in 12
  blocks (`exploiter` x2, `escalating-dread` x2). Too small for the stage 5
  target.

## 5. The varied batch's three fails

Fresh prompts, chosen to probe rather than to pass:

- `lack-honored` — *"a star-blind oracle"* and the sheet still carries sight. A
  GM's absence dropped, which is the fidelity line.
- `two-novas` — two Recharge novas on the canal-lock elemental.
- `gate-fit` — an at-will condition action with no Multiattack to join.

## 6. Corrections to my own claims, carried forward

1. Hold 3's "fork" — there was none (§3).
2. "The table decides before the call is asked" — wrong; the route call runs first
   and IS overruled. One trace line carrying both events read as one.
3. "Identical verdicts, 0 FP and 0 FN" for the dangling regex — scoped to 12 runs
   and written as settled. On the full 74 it was carrying **3 false failures**:
   bounding the capture to capitalised words made `"a use of Vow of Silence"`
   capture `"Vow"`.
4. I reported the Dame Oriel gate working on a trace line that fired; the trait
   shipped anyway on two of three blocks. A trace says a gate ran, not that the
   row is gone.
5. I reported "precedence flipped" and ran three batches on a **dead edit** —
   `quotedPick` declared and read, never assigned, because I asserted on one
   substitution and not the other.
6. The `attack-stat` family: filed as unrelated pre-existing, then shown to be
   routing in three distinct mechanisms — keyword override, line→donor mismatch,
   and a key gate refusing the right line.

---

# 2024 blocks

## Review batch — varied-2026-10-17T14-24-55

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bell-Founder's Ghost | 4 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Salt-Drowned Sailor | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: gate-fit | FAIL (1) | 1/1 | 3/4 |
| Ledger-Shelver Golem | 9 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 8/8 |
| Gravespore Hound | 6 | 2024 | lurker-5 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Copper-Pin Collector | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Canal-Lock Elemental | 11 | 2024 | brute-9 | ok | SOFT: hot-offense | FAIL: two-novas | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/5 |
| Star-Blind Oracle | 13 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | FAIL (1) | 0/2 | 3/5 |
| Ossuary Beetle Swarm | 5 | 2024 | swarm-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Doorwarden Dain | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Cowl of the Treeline | 4 (2014) | 2014 | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/7 |
| Old Wolf | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Vessel of the Swallowed Hoard | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 5 of 15 user clauses** (coverage 67%); concept share 80% (44/55 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-1-phantom / reader: 1
- brute-9 / structure: 1
- caster-8-binder / reader: 1



---


### Copper-Pin Collector — lowest CR

**Concept:** a tax-farmer's enforcer who breaks fingers one at a time

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Copper-Pin Collector | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Breaks Fingers); nova none; dmg 12

```
Copper-Pin Collector

Medium Humanoid, Neutral Evil

AC 12
Initiative -1 (9)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
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
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
6
-2
-2

Skills Athletics +5, Perception +1

Senses Passive Perception 11

Languages Common

CR 2 (XP 450; PB +2)

Actions

Breaks Fingers. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13).

Joint Ledger. Wisdom Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the collector's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Psychic damage.

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

- Actions/Breaks Fingers — authored for this sheet; a named part; the GM's clause "breaks fingers one at a time"
- Actions/Joint Ledger — template escalating-dread; library draw (seed unstamped)

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("breaks fingers one at a time") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=grasping/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: breaking fingers one joint at a time [behavior] | an iron pincer and thumb-screw hung from the belt [object] | the cold accounting of what is owed [behavior]
[concept] identity: It opens by seizing a debtor and pinning the hand flat against a table, doorframe, or its own knee, then takes the fingers one at a time with a slow deliberate snap, naming the sum owed after each break. Every round it keeps at least one hand trapped and works through the fingers methodically, using the victim's pain as leverage on anyone watching. Under pressure it does not tire or bargain; it backs toward a wall, drags the nearest body in front of it as a shield, and calmly finishes the hand it started before turning to the next.
[concept] lore: A tax-farmer's collector hires these enforcers from the debtor wards, paying them a copper per finger broken and letting them keep whatever coin shakes loose from the client's pockets.
[reskin] donor: brute-2 -> CR 2
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Breaks Fingers (slot, Grappled) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the collector" — the call's own answer (kind), built from the name
[reskin] inline form: "the collector" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "does not tire" quotes nothing the user typed
[reskin] lacks refused: "does not bargain" quotes nothing the user typed
[reskin] asked field dropped: "breaks fingers one at a time" carries no trigger word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] asked field dropped: "breaks fingers one at a time" carries no frequency word, so the call's "once_per_turn" has no receipt in the GM's own clause
[reskin] clauses: "a tax-farmer's enforcer" -> has (descriptive), head | "breaks fingers one at a time" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "It finishes the hand it started, naming the debt after each joint. Each time it keeps grinding a victim it already has pinned, it forces everyone watching the ordeal to break and give ground or drop what they're carrying, while the pinned victim's pain mounts without a fresh grip needed. It can keep working the same hand only while that victim stays caught." [action/always/condition] — menu: trample, condition-payoff, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "escalating-dread" has no key-table verb, but the call quotes "breaks fingers one at a time" from the description
[reskin] value check: "Joint Ledger" EV 9.6 vs floor 7.3 (one attack of 1) — dice 7 → 14
[reskin] signature template: escalating-dread -> Actions/"Joint Ledger" ("it keeps grinding the victim it already has pinned, and the mounting pain hits a [shape fit, no verb match]")
[reskin] signature idea (trait): "The iron pincer and thumb-screw on its belt let it latch onto a caught debtor's fingers and crank them whenever that victim struggles, so every attempt to wrench free bites back harder the longer it is held. It must have a hand to work, so once the victim is loose the pincer goes slack." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The iron pincer and thumb-screw on its belt let it latch onto a caught debtor's fingers and crank them whenever that victim struggles, so every attempt to wrench free bites back harder the longer it is held. It must have a hand to work, so once the victim is loose the pincer goes slack." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, resonant-body)
[reskin] weapons answered: Knuckle Cudgel = club
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename blocked — "Breaks Fingers" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Star-Blind Oracle — highest CR

**Concept:** a star-blind oracle who answers every question with a wound

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Star-Blind Oracle | 13 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: lack-honored |

- bands · soft · band: reads CR 11.5 (print at 13 reads 10.5–18, n=11)
- reader · fail · lack-honored: the GM asked for an absence — "a star-blind oracle" — and the sheet still carries it
- **dropped clause:** "a star-blind oracle"
- **dropped clause:** "answers every question with a wound"
- read: def 8 / off 15 → 11.5; sustained 87 (3 × Nails); nova none; dmg 87

```
Star-Blind Oracle

Medium Humanoid, Neutral

AC 17
Initiative +2 (12)

HP 187 (22d8 + 88)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+7
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+10

Skills Perception +7, Deception +10

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 17

Languages Common

CR 13 (XP 10,000; PB +5)

Actions

Multiattack. The star-blind oracle makes three attacks, using Nails or Wounding Stare in any combination. It can replace one attack with a use of (A) Branding Question or (B) Spellcasting to cast Mind Spike.

Nails. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Slashing damage.

Wounding Stare. Ranged Attack Roll: +10, range 60 ft. 27 (5d8 + 5) Piercing damage.

Branding Question. Constitution Saving Throw: DC 17, one creature within 60 feet. Failure: 27 (6d8) Bludgeoning damage, and the target has the Deafened condition until the end of its next turn.

Spellcasting. The star-blind oracle casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Mind Spike, Detect Magic, Bestow Curse, Blindness/Deafness

Sightless Reckoning. Wisdom Saving Throw: DC 17, one creature within 60 feet that has the Deafened condition. Failure: 32 (5d12) Bludgeoning damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage.

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
- Actions/Nails — the chassis
- Actions/Wounding Stare — the chassis
- Actions/Branding Question — the chassis
- Actions/Spellcasting — the chassis
- Actions/Sightless Reckoning — template condition-payoff; library draw (seed unstamped)

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=gaze — caster-binder: ✓ ("answers every question with a wound") | caster-binder: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] resolve: archetype=caster type=Humanoid themes=mind mind=sapient style=binder energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: gaze
[concept] signature elements: answers every question with a wound [behavior] | sightless eyes that cannot be evaded [body] | probing oracle questions that unmake a target [behavior]
[concept] identity: A star-blind oracle opens by asking its own question first — a probing ray that brands the target with a distracting, searing truth — then answers every reply with a wound, dealing Psychic damage through an unerring stare or a lashing strike that opens old hurts. It never flees; it toys with a bloodied foe, punishing every action taken against it by reflecting the question back as a curse, so the fight is won by spending the enemy's actions rather than their Hit Points.
[concept] lore: Blinded by looking too long at a star that does not exist, the oracle wanders under dead skies, wanting only to make others see the wound it saw — and to take, in blood and ruin, the answers the light refused to give it.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] donor: caster-8-binder -> CR 13
[reskin] repair round 1: 3 defect(s) — "Wounding Stare" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type | "Searing Truth" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type | name "Searing Truth" claims an element its damage (Psychic) does not pay
[reskin] repair round 2: 2 defect(s) — "Wounding Stare" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type | "Branding Question" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type
[reskin] inline by rule: "the star-blind oracle" — the call answered "the oracle" (kind), which the name does not support
[reskin] inline on kit rows: "the oracle" -> "the star-blind oracle"
[reskin] inline form: "the oracle" — the model's own reading of the name
[reskin] energy rider withheld: Psychic on a Humanoid with no Psychic in the concept's own words
[reskin] energy withheld on a base row: "Wounding Stare" Psychic -> Piercing (the body's physical type; a Humanoid deals no Psychic its concept never gave it)
[reskin] energy withheld on a base row: "Branding Question" Psychic -> Bludgeoning (the body's physical type; a Humanoid deals no Psychic its concept never gave it)
[reskin] spell DC coherence: DC 17 -> 18 off Charisma 20 (the stat makes the attack rolls)
[reskin] lacks asked: "star-blind"
[reskin] asked field dropped: "answers every question with a wound" carries no trigger word, so the call's "on_being_hit" has no receipt in the GM's own clause
[reskin] clauses: "a star-blind oracle" -> LACKS (mechanical) | "answers every question with a wound" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The oracle fixes its sightless eyes on a foe it has already wounded, and that stare cannot be avoided or turned aside — no cleverness, cover, or scrambling saves the target. The wound it sees is a real one, and looking at an injured creature this way tears the hurt open anew, so the fight becomes a choice between letting the oracle look and letting it bleed you." [action/always/damage] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, own-turn-punisher, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — sensory-strike, own-turn-punisher (blind, answer)
[reskin] word match declined by the call: sensory-strike, own-turn-punisher, pacify — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "condition-payoff" has no key-table verb, but the call quotes "answers every question with a wound" from the description
[reskin] value check: "Sightless Reckoning" EV 28.9 vs floor 15.6 (one attack of 3) — dice 60 → 32 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Sightless Reckoning" ("The stare targets a creature already wounded (carrying a condition from the orac [shape fit, no verb match]")
[reskin] signature idea (trait): "Whenever a foe strikes or curses the oracle, it turns the blow back into a question, and the answered wound festers on the attacker's own flesh — anyone who harms it is left marked and unsteady for a moment thereafter. The oracle does not need to see to do this; the offense itself points back at its source." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for wounded, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever a foe strikes or curses the oracle, it turns the blow back into a question, and the answered wound festers on the attacker's own flesh — anyone who harms it is left marked and unsteady for a moment thereafter. The oracle does not need to see to do this; the offense itself points back at its source." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, absorption, resonant-body, faultless-tracker)
[reskin] seat owes nothing: the binder line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Nails = none; Wounding Stare = none; Searing Truth = none; Reflected Question = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Branding Question or (B) Spellcasting to cast *Mind Spike*.
audit finding below confidence gate: Sightless Reckoning The only Deafened source in the block is Branding Question, which applies Deafened 'until the end of its next turn' — so Sightless Reckoning can only be used on a target already Deafened, but the oracle's own Multiattack has no way to combine Branding Question and Sightless Reckoning in the same turn unless the GM tracks the timing precisely; more importantly, the Deafened condition is the only prerequisite and nothing prevents the target from simply not being Deafened, making this action dead unless the oracle first lands Branding Question, which requires the GM to adjudicate cross-turn condition timing with no stated interaction.
```


---


### Bell-Founder's Ghost — a 2024 sheet

**Concept:** a bell-founder's ghost that rings the hours wrong

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bell-Founder's Ghost | 4 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Withering Touch); nova none; dmg 24

```
Bell-Founder's Ghost

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

CR 4 (XP 1,100; PB +2)

Traits

Wrong-Hour Clang. A creature that hits the bell-founder's ghost with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The bell-founder's ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The bell-founder's ghost can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The bell-founder's ghost makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5 (with Advantage during the first round of each combat), reach 5 ft. 12 (2d8 + 3) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the bell-founder's ghost and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the bell-founder's ghost's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the bell-founder's ghost can see within 5 feet. Failure: The target is possessed by the bell-founder's ghost; the bell-founder's ghost disappears, and the target has the Incapacitated condition and loses control of its body. The bell-founder's ghost now controls the body, but the target retains awareness. The bell-founder's ghost can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The bell-founder's ghost's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the bell-founder's ghost leaves as a Bonus Action. When the possession ends, the bell-founder's ghost appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The bell-founder's ghost casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The bell-founder's ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Withering Touch — print's row, renamed
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Wrong-Hour Clang — template resonant-body; library draw (seed unstamped); the GM's clause "rings the hours wrong"; binds the GM's words: bell+ring+hollow
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("bell-founder's ghost") | lurker-phantom: key "ghost" (class body) | bane refused: the words carry no weakness clause, so "sunlight" answers a question nobody asked
[concept] hints: phantom→style ✓ ("bell-founder's ghost that rings")
[concept] resolve: archetype=lurker type=Undead themes=grave/uncanny mind=sapient style=phantom energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ringing the hours wrong [behavior] | spectral bell and hammer [object] | draining warmth with each toll [aura]
[concept] identity: The bell-founder's ghost drifts through the walls of its old foundry, opening with a wrong-struck chime that disorients and drains warmth from the living. Each round it tolls again, layering discordant hours that pull at the mind and flesh, retreating through stone when cornered but never fleeing far — it has a foundry's worth of wrong hours left to ring. Under pressure it grows frantic, hammering its spectral bell faster, but it fights to the death rather than abandon its unfinished work.
[concept] lore: The bell-founder died mid-casting, his final bell still cooling in the pit, and his ghost now rings the hours wrong to warn the living that time itself is out of joint — or to draw them into the pit with him.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 49 -> 45, AC 15 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +6 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a bell-founder's ghost that rings the hours wrong" heads on the Ghost — print's rows ride along; the seat stays
[reskin] inline by rule: "the bell-founder's ghost" — the call answered "the ghost" (kind), which the name does not support
[reskin] inline on kit rows: "the ghost" -> "the bell-founder's ghost"
[reskin] inline form: "the ghost" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a bell-founder's ghost" -> has (descriptive), head | "rings the hours wrong" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ghost swings its spectral hammer at its unseen bell and rings an hour that never was. Every living creature near it feels time lurch — their thoughts drag, their limbs come a beat late, and the wrong hour clings to them until they shake it off. The more dissonant hours already hanging on a victim, the harder it is to break free of the newest one." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: lure, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (bell)
[reskin] word match declined by the call: active-toll, sensory-strike, hook-rider, obstacle-pull, self-invisibility, leap, gaze-single, execute, seal, wail, random-ray, ground-burst, spew, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, drain, zone-seed, blighted-ground — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown active-toll, sensory-strike, which the GM's words keyed
[reskin] key match declined: action — "active-toll" was ranked first on the call's own menu for bell, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The ghost swings its spectral hammer at its unseen bell and rings an hour that never was. Every living creature near it feels time lurch — their thoughts drag, their limbs come a beat late, and the wrong hour clings to them until they shake it off. The more dissonant hours already hanging on a victim, the harder it is to break free of the newest one." [action/save/condition] — the model found no template that holds it (offered: active-toll, sensory-strike, leap, gaze-single, execute, seal, wail, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, drain, zone-seed, blighted-ground, hook-rider, self-invisibility)
[reskin] fallback respects the call: sensory-strike, gaze-single, execute, escalating-dread, terror-pulse, drain left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a bell-founder's ghost that rings the hours wrong" heads on the Ghost and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Strike the ghost and the bell answers: a hollow, off-key clang rolls off its body, and the attacker's own heartbeat skips to match the wrong hour, leaving them slow to act until the sound fades. Living things that ring this ghost feel time bend around them; the dead and the clockwork do not." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body, bloodied-burst (bell)
[reskin] signature template (trait): resonant-body -> Traits/"Wrong-Hour Clang" ("Striking the ghost makes a hollow off-key clang answer and the attacker's timing [verb: bell:concept, ring:idea, hollow:idea]")
[reskin] weapons answered: Toll = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Toll" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a bell-founder's ghost that rings the hours wrong" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a bell-founder's ghost that rings the hours wrong" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Wrong-Hour Clang" answers "rings the hours wrong" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Wrong-Hour Clang The ghost is immune to Poison, Charmed, Frightened, etc., but the trait names a clang that should plausibly fit the bell theme; more concretely, the 'Wrong-Hour' name promises a time/off-beat mechanic that the text never delivers — it is a plain retaliatory thunder zap.
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---


### Ledger-Shelver Golem — a print donor

**Concept:** an archivist golem that files intruders between its plates

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ledger-Shelver Golem | 9 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Magic Resistance
- **dropped clause:** "files intruders between its plates"
- read: def 12 / off 12 → 12; sustained 76 (2 × Slam); nova none; dmg 76

```
Ledger-Shelver Golem

Large Construct, Unaligned

AC 14
Initiative -1 (9)

HP 123 (13d10 + 52)

Speed 20 ft.

MOD
SAVE
STR
20
+5
+9
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
8
-1
-1
MOD
SAVE
CON
18
+4
+8
CHA
1
-5
-5

Skills Athletics +9, Perception +3

Resistances Bludgeoning, Piercing, Slashing

Immunities Acid, Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 9 (XP 5,000; PB +4)

Traits

Filing Snag. The ledger-shelver golem adheres to anything that touches it. A Huge or smaller creature adhered to the ledger-shelver golem is also Grappled by it (escape DC 17). Ability checks made to escape this grapple have Disadvantage.

Immutable Form. The ledger-shelver golem can't shape-shift.

Magic Resistance. The ledger-shelver golem has Advantage on saving throws against spells and other magical effects.

Acid Absorption. Whenever the ledger-shelver golem is subjected to Acid damage, it takes no damage and instead regains a number of Hit Points equal to the Acid damage dealt.

Berserk. Whenever the ledger-shelver golem starts its turn Bloodied, roll 1d6. On a 6, the ledger-shelver golem goes berserk. On each of its turns while berserk, the ledger-shelver golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the ledger-shelver golem attacks an object. Once the ledger-shelver golem goes berserk, it continues to be berserk until it is destroyed or it is no longer Bloodied.

Actions

Multiattack. The ledger-shelver golem makes two Slam attacks. It can replace one attack with a use of Creeping Dread.

Slam. Melee Attack Roll: +9, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage plus 6 (1d12) Acid damage, and the target's Hit Point maximum decreases by an amount equal to the Acid damage taken.

Creeping Dread. Wisdom Saving Throw: DC 17, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the ledger-shelver golem's next turn. If the target was already Frightened by this ability, it also takes 32 (5d12) Psychic damage.

Bonus Actions

Hasten (Recharge 5-6). The ledger-shelver golem takes the Dash and Disengage actions.

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
- Actions/Slam — print's row, renamed
- Actions/Creeping Dread — library seed escalating-dread
- Traits/Filing Snag — template adhesive; library draw (seed unstamped); binds the GM's words: chest
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — the chassis
- Traits/Acid Absorption — print's own row
- Traits/Berserk — print's own row
- Bonus Actions/Hasten — print's own row

**Engine trace**

```
[route] brute type=Construct mechanics=grapple — brute-grappler: ✓ ("files intruders between its plates") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it | bane refused: the words carry no weakness clause, so "lightning" answers a question nobody asked
[concept] hints: golem→canon ✓ ("archivist golem that files intruders")
[concept] resolve: archetype=brute type=Construct themes=forged/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: filing intruders between its plates [behavior] | iron plate-body with hinged chest shelves [body] | silent cataloguing of victims [behavior]
[concept] identity: The archivist golem opens by choosing the most disordered intruder and advancing behind its flat, shelf-like forearm plates, forcing them into the narrow gap between its torso and its hinged chest. Once a victim is pinned, its plate-edges grind shut in a slow, implacable filing action, reducing armor, limbs, and dignity to neat sequential fragments. It fights to the death as an automaton should, calmly continuing its cataloguing work even as it is broken.
[concept] lore: Built from iron and ledger-scrap by a vanished order of librarians, the archivist golem still files every intruder into its plates, certain it is shelving the last unreturned books.
[reskin] print canon defenses: HP 165 -> 123, AC 15 -> 14 — the Clay Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 9, CON 18, INT 3, WIS 8, CHA 1 — the Clay Golem's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: brute-9 -> CR 9
[reskin] print canon: "an archivist golem that files intruders between its plates" heads on the Clay Golem — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] alignment by body: Lawful Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline by rule: "the ledger-shelver golem" — the call answered "the shelver golem" (kind), which the name does not support
[reskin] save dc derived: DC 15 -> 17 (8 + PB 4 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "files intruders between its plates" carries no trigger word, so the call's "on_hit" has no receipt in the GM's own clause
[reskin] clauses: "an archivist golem" -> has (descriptive), head | "files intruders between its plates" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "The golem lunges to slam an intruder flat against its own chest and folds its hinged chest plates inward, clamping the victim into the narrow gap between torso and shelf. While clamped, the victim is carried bodily along as the golem moves and can only be freed by prying the iron plates apart from inside, a slow and grinding labor the golem never stops working at. Each round the plates ratchet one" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: hook-rider, charge-push, charge, pounce, push-prone, stunning-strike, affliction, contagion, wind-up — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The golem lunges to slam an intruder flat against its own chest and folds its hinged chest plates inward, clamping the victim into the narrow gap between torso and shelf. While clamped, the victim is carried bodily along as the golem moves and can only be freed by prying the iron plates apart from inside, a slow and grinding labor the golem never stops working at. Each round the plates ratchet one" [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, push-prone, wind-up)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "an archivist golem that files intruders between its plates" heads on the Clay Golem and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 22 vs floor 16.6 (one attack of 2) — dice 16 → 32
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever something strikes the golem's iron chest-plates, the impact jolts a shelf-edge loose and the golem reflexively files the attacker's limb or weapon into the gap for a moment, snagging them against the grinding plates. Its calm catalogue continues regardless of what lands on it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): adhesive -> Traits/"Filing Snag" ("the golem's chest plates snag and hold an attacker's limb or weapon, filing intr [verb: chest:idea]")
[reskin] weapons answered: Plate-Shelf = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Common plus one other language" — the Clay Golem's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Clay Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Plate-Shelf" -> "Slam" — the Clay Golem's own row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Acid, Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned; resistances none -> Bludgeoning, Piercing, Slashing — the Clay Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Acid Absorption — "an archivist golem that files intruders between its plates" is the Clay Golem (print's own row)
[reskin] print canon trait: Berserk — "an archivist golem that files intruders between its plates" is the Clay Golem (print's own row)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Hasten (Recharge 5-6) — the Clay Golem's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
audit finding below confidence gate: Filing Snag The adherence is automatic on any touch with no save, timing gate, or size-independent escape for the initial grab beyond the Grappled condition itself, and the trigger ('anything that touches it') is ambiguous about whether a creature making a melee attack, being hit by the Slam, or merely brushing past is affected.
```


---


### Gravespore Hound — one marked soft

**Concept:** a mushroom-choked hound whose spores make you see your dead

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravespore Hound | 6 | lurker-5 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 78 is 26% under the card's 105
- bands · soft · band: reads CR 4 (print at 6 reads 3–8.5, n=42)
- read: def 2 / off 6 → 4; sustained 32 (2 × Bite); nova Fire Breath 33; dmg 43

```
Gravespore Hound

Medium Fiend, Lawful Evil

AC 15
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
6
-2
-2
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
14
+2
+2
CHA
6
-2
-2

Skills Perception +4, Stealth +10

Resistances Cold

Immunities Fire

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands Infernal but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Gravespore Gaze. Wisdom Saving Throw: DC 14, any creature that starts its turn within 30 feet of the hound and can see it. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Pack Tactics. The hound has Advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The hound makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 3 (1d6) Fire damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target has the Poisoned condition. While Poisoned this way, the target can't regain Hit Points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic. Success: The target is immune to this creature's contagion for 24 hours.

Fire Breath (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: 33 (6d10) Fire damage. Success: Half damage.

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
- Actions/Fire Breath — print's own row
- Traits/Gravespore Gaze — template gaze-aura; library draw (seed unstamped)
- Traits/Pack Tactics — print's own row

**Engine trace**

```
[route] lurker type=Plant mechanics=aura — lurker-trap: ✓ ("spores make you see your dead") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=lurker type=Plant themes=grave/bestial mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: spores that force the victim to see their own dead [aura] | mushroom-choked hound carcass [body] | stalking ambush that strikes through the hallucination [behavior]
[concept] identity: A mushroom-choked hound opens with a silent rush out of the undergrowth, its first bite bursting a cloud of grave-spores that make the victim see their own dead standing where the beast is — and it strikes through that vision while they flinch. Every round after, it breaks line of sight, circles on soft rot-padded feet, and bursts again from a new angle to re-dose the prey, herding a panicking target ever deeper into the fungused dark. It is patient, cruel beyond animal instinct, and will not flee until badly bloodied — then it simply vanishes into the spores and lets the hallucination finish the job.
[concept] lore: A hound that died in the woods and was claimed by the mushroom bed that drank its corpse, it now hunts to seed the dead it sees through every victim's eyes.
[reskin] print canon array: STR 17, DEX 18, CON 14, INT 6, WIS 13, CHA 6 — the Hell Hound's, DEX fitted to +7
[reskin] donor: lurker-5 -> CR 6
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a mushroom-choked hound whose spores make you see your dead" heads on the Hell Hound — print's rows ride along; the seat stays
[reskin] inline declared: "the hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the hound" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mushroom-choked hound whose spores make you see your dead" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the hound strikes a creature it has been stalking unseen, the wound blossoms with grave-spores and the victim is suddenly surrounded by the accusing dead — faces of everyone they have lost, all turning toward them at once. While the hound stays near that prey, the apparitions refuse to clear, and the victim cannot tell which of the shapes is the real beast to defend against." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, zone, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — zone-seed, zone (spores)
[reskin] word match declined by the call: zone-seed, zone, affliction — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "contagion" has no key-table verb, but the call quotes "spores make you see your dead" from the description
[reskin] signature rider: contagion -> Bite (appended; The bite plants grave-spores that afflict the struck creature (Poisoned, unable  [shape fit, no verb match])
[reskin] signature idea (trait): "Spores clinging to a wounded creature keep blooming in its flesh, so anyone the hound has recently bitten sees the dead standing at the edges of their sight and cannot shake the sense of being watched from behind. The longer the fight drags, the more of the victim's own ghosts crowd in to shepherd them deeper into the dark." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker, noxious-aura (hound, spores)
[reskin] pick kept on the GM's own words: trait — "gaze-aura" has no key-table verb, but the call quotes "a mushroom choked hound whose spores make you see your dead" from the description
[reskin] signature template (trait): gaze-aura -> Traits/"Gravespore Visions" ("the spores seed hallucinations of the dead that crowd the victim's sight and mak [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Hell Hound's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Plant -> Fiend — the Hell Hound's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Infernal but can't speak" — the Hell Hound's
[reskin] print canon speed: 40 ft. -> 50 ft. — the Hell Hound's walk; the concept's other modes stay
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire — the Hell Hound's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "a mushroom-choked hound whose spores make you see your dead" is the Hell Hound (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Hell Hound's
[reskin] print canon row priced: Fire Breath (Recharge 5-6) — dice 17 → 33 (nova budget)
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Hell Hound's own
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Gravespore Visions The trait is titled a Visions/gaze effect but its trigger is 'can see it' rather than the hound seeing the target or the target meeting its eyes, creating an asymmetric sight requirement inconsistent with the gaze framing.
[reskin] audit rename: "Gravespore Visions" -> "Gravespore Gaze"
```


---


### Salt-Drowned Sailor — bands soft

**Concept:** a salt-crusted drowned sailor who drags shipmates down by the ankles

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Salt-Drowned Sailor | 3 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: gate-fit |

- bands · soft · aim-hp: HP 44 is 27% under the card's 60
- reader · fail · gate-fit: Actions/Drowning Drag: an at-will condition action with no Multiattack to join — a shed use limit needs one
- read: def 2 / off 3 → 2.5; sustained 21 (1 × Blow); nova none; dmg 21

```
Salt-Drowned Sailor

Medium Undead, Neutral

AC 12
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 5 ft., Fly 50 ft. (hover), Swim 30 ft.

MOD
SAVE
STR
1
-5
-5
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
10
+0
+0
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

Skills Stealth +5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 10

Languages None

CR 3 (XP 700; PB +2)

Traits

Incorporeal Movement. The salt-drowned sailor can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the salt-drowned sailor has Disadvantage on ability checks and attack rolls.

Actions

Blow. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 9 (2d8) Necrotic damage.

Drowning Drag. Strength Saving Throw: DC 13, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the salt-drowned sailor by salt-crusted hands and has the Grappled condition (escape DC 13).

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

- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Blow — the chassis
- Actions/Drowning Drag — template hook-drag; library draw (seed unstamped); the GM's clause "drags shipmates down by the ankles"; binds the GM's words: drag+pull+haul

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=grapple — lurker-phantom: ✓ ("drowned sailor") | lurker-phantom: key "drowned" (class body) | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] hints: grappler→style ✓ ("drags shipmates down by the ankles")
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=bestial style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: seizing swimmers by the ankle and dragging them under [behavior] | salt-crusted drowned corpse [body]
[concept] identity: The salt-crusted drowned sailor waits in the dark water beside a hull or under a dock, then surges up to seize a swimmer's ankle and haul them down, salt-heavy and silent. Every round it keeps its grip and drags them deeper, letting the water and its own brine-crusted mass do the killing while it hangs on with dead, unshakeable patience. It is a spiteful thing that does not flee — it releases only to re-grab, and will follow a panicked target along the hull until one of them stops moving.
[concept] lore: A sailor lost over the side and never recovered, the sea packed its salt into the corpse until it forgot the surface; now it waits in the shallows for anyone who goes into the water, wanting only to share the bottom with the living.
[reskin] donor: lurker-1-phantom -> CR 3
[reskin] repair round 1: 1 defect(s) — name "Grasp" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word
[reskin] inline by rule: "the salt-drowned sailor" — the call answered "the drowned sailor" (kind), which the name does not support
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "drowned" names no absence — nothing in it takes anything away
[reskin] lacks refused: "salt-crusted" names no absence — nothing in it takes anything away
[reskin] asked field dropped: "drags shipmates down by the ankles" carries no trigger word, so the call's "on_hit" has no receipt in the GM's own clause
[reskin] clauses: "a salt-crusted drowned sailor" -> has (descriptive), head | "drags shipmates down by the ankles" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When it grabs a swimmer, it hauls them straight down through the water with it — the victim is pulled underwater and held there, and the sailor keeps sinking as long as it holds on, so rescuers have to plumb deeper and deeper after them. It only lets go to snatch at someone who got loose, never to flee." [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: swallow, leap, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — hook-rider (drag, drags)
[reskin] value check: "Drowning Drag" EV 12.7 vs floor 12 (one attack of 1) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Drowning Drag" ("The sailor grabs a target and hauls them down with it, holding on as it sinks —  [verb: drag:concept, pull:idea, haul:idea]")
[reskin] keys spent by the action: drag
[reskin] signature idea (trait): "Its brine-packed body leaches salt into anyone in the water with it: creatures floundering or submerged near the sailor feel their strength and breath salted away, and wounds it opens in water keep bleeding brine that saps them further." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: adhesive, aberrant-ground — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its brine-packed body leaches salt into anyone in the water with it: creatures floundering or submerged near the sailor feel their strength and breath salted away, and wounds it opens in water keep bleeding brine that saps them further." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Grasp = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] row binds its clause: "Drowning Drag" answers "drags shipmates down by the ankles" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] name follows content: Actions/"Grasp" promises the Grappled condition the row never delivers — "Blow" (the call's modifier kept, the claim word swapped for a noun the row earns)
audit finding below confidence gate: Incorporeal Movement The creature's Speed lists Fly 50 ft. (hover) and Swim 30 ft. but a ground Speed of only 5 ft., and Incorporeal Movement lets it pass through objects yet its Immunities include Grappled and Restrained but not the more typical incorporeal suite — not a defect itself; however the trait's name and mechanics fit an incorporeal body while the creature is typed Undead, which is a valid 5e typing for a ghost — not a contradiction.
audit finding below confidence gate: Drowning Drag This imposes an unknown state for adjudication: the creature is immune to Grappled, yet its own action applies Grappled — the creature being immune does not matter to the rider itself, but the action is named 'Drowning Drag' and the block lacks a swim/underwater mechanic for drowning, yet the target is pulled across dry air; the effect is rules-legal with an escape DC, so not a defect under principle 1.
```


---


### Canal-Lock Elemental — bands soft

**Concept:** a canal-lock elemental that opens and drowns a street

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Canal-Lock Elemental | 11 | brute-9 | ok | SOFT: hot-offense | FAIL: two-novas | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 15, 4 over; the HP axis pulls the read to 12
- structure · fail · two-novas: two Recharge novas on one sheet: "Lockgate Surge" and "Whirlwind"
- **dropped clause:** "opens and drowns a street"
- read: def 9 / off 15 → 12; sustained 82 (2 × Thunderous Slam); nova Lockgate Surge 59; dmg 94

```
Canal-Lock Elemental

Large Elemental, Neutral

AC 15
Initiative +5 (15)

HP 195 (26d10 + 52)

Speed 10 ft., Fly 90 ft.

MOD
SAVE
STR
20
+5
+9
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
+6
CHA
6
-2
-2

Skills Athletics +9, Perception +4

Resistances Cold

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 14

Languages Primordial (Auran)

CR 11 (XP 7,200; PB +4)

Traits

Sluicegate Surge. The first time the canal-lock elemental is Bloodied in a fight, it releases a burst. Strength Saving Throw: DC 17, each creature in a 20-foot Emanation originating from the canal-lock elemental. Failure: 39 (6d12) Cold damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Air Form. The canal-lock elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The canal-lock elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +9, reach 10 ft. 41 (8d8 + 5) Thunder damage.

Lockgate Surge (Recharge 5-6). Strength Saving Throw: DC 17, each creature in a 15-foot Emanation originating from the canal-lock elemental. Failure: 59 (17d6) Cold damage. Success: Half damage.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 17, one Medium or smaller creature in the canal-lock elemental's space. Failure: 59 (17d6) Thunder damage, and the target is pushed up to 20 feet straight away from the canal-lock elemental and has the Prone condition. Success: Half damage only.

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
- Actions/Thunderous Slam — print's row, renamed
- Actions/Lockgate Surge — template ground-burst; library draw (seed unstamped)
- Actions/Whirlwind — print's own row
- Traits/Sluicegate Surge — template bloodied-burst; library draw (seed unstamped); binds the GM's words: crack
- Traits/Air Form — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Elemental mechanics=grapple — brute-juggernaut: ✓ ("canal-lock elemental") | lurker-phantom: the call read "drowns" as not meaning that mechanic here — no override | brute-juggernaut stands: every key that would override it was read as a figure of speech | brute-juggernaut: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "cold" answers a question nobody asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/aquatic mind=sapient style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: opening the lock-gates to flood a street [behavior] | a body of lock-masonry and canal water [body] | the rising, drowning flood it wades through [aura]
[concept] identity: When the lock-gates groan open, the elemental does not charge — it simply stands in the channel and lets a street's worth of canal water come roaring down the cut behind it, then wades through the flood, battering anything still upright and hammering through walls and gates to widen the drown. Every round it works the machinery of its own body: sluice-stones shift aside, a new torrent is let in, and the water rises; it does not tire, does not withdraw bloodied, and will stand in the deepening water fighting to the last stone even as the flood tears its own bricks loose.
[concept] lore: Born where a lock's mossy paddles were left open too long and the canal learned the taste of the street, it wants only to keep opening — to find the next gate, the next channel, and let the water follow.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 20, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's, STR fitted to +9
[reskin] donor: brute-9 -> CR 11
[reskin] print canon: "a canal-lock elemental that opens and drowns a street" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the canal-lock elemental" — the call answered "the canal-lock elemental" (kind), which the name does not support
[reskin] inline form: "the canal-lock elemental" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 17 (8 + PB 4 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a canal-lock elemental" -> has (descriptive), head | "opens and drowns a street" -> has (mechanical)
[reskin] signature idea (action): "The elemental wrenches open a lock-gate inside itself and lets the canal come roaring down the cut, and the flood does not recede — it stays, rising knee-deep and then waist-deep across the whole street, spreading further each time it is used. While the water stands, everything in it is dragged and shoved toward the elemental, so anything upright on the street ends up pressed in against the masonr" [action/save/movement] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] pick kept on the GM's own words: action — "ground-burst" has no key-table verb, but the call quotes "opens and drowns a street" from the description
[reskin] value check: "Lockgate Surge (Recharge 5-6)" EV 91.5 vs floor 65.9 (the whole Multiattack (2 attacks)) — dice 39 → 59 (nova budget)
[reskin] signature template: ground-burst -> Actions/"Lockgate Surge (Recharge 5-6)" ("The lock-gate wrenches open and the canal floods the street around the elemental [shape fit, no verb match]")
[reskin] signature idea (trait): "Its body is a working lock, not a shell of stone: every blow that lands on it cracks a paddle or shifts a sluice-stone, and the released water surges out at whoever struck it, soaking them and pulling them off balance. The more it is hit, the more of the canal it lets loose — the flood grows from the fight itself." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, false-appearance, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Sluicegate Surge" ("The lock's paddles crack and sluice-stones shift as blows land, releasing the ca [verb: crack:idea]")
[reskin] weapons answered: Sluice = none
[reskin] print canon modes: swim off — the Air Elemental has no such mode and the words name none
[reskin] speed by concept: dropped Swim 40 ft.; added Fly 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] rider folded: "Sluice" keeps its budget — the chassis's rider half (16) folds into the base; the Air Elemental pays no damage rider of its own
[reskin] print canon attack: "Sluice" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Air Form — "a canal-lock elemental that opens and drowns a street" is the Air Elemental (print's own row)
[reskin] print canon row priced: Whirlwind (Recharge 4-6) — dice 24 → 59 (nova budget)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] save re-derived after a retype: Traits/Sluicegate Surge — a Constitution save for an effect that calls for Strength or Dexterity; the save follows the condition
```


---


### Ossuary Beetle Swarm — in the run

**Concept:** a tomb-beetle swarm that strips a corpse in a minute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Beetle Swarm | 5 | swarm-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strips a corpse in a minute"
- read: def 4 / off 5 → 4.5; sustained 34 (1 × Mandibles); nova none; dmg 34

```
Ossuary Beetle Swarm

Medium Swarm of Tiny Beasts, Unaligned

AC 13
Initiative +3 (13)

HP 78 (12d8 + 24)

Speed 30 ft., Climb 30 ft.

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
16
+3
+3
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
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned

Senses tremorsense 30 ft.; Passive Perception 10

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Mandibles. Melee Attack Roll: +6, reach 5 ft. 34 (7d8 + 3) Slashing damage, or 17 (5d6) Slashing damage if the swarm is Bloodied.

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
- Actions/Mandibles — the chassis

**Engine trace**

```
[route] swarm type=Beast mechanics=none — swarm: ✓ ("a tomb-beetle swarm") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a tomb-beetle swarm that strips a corpse")
[concept] resolve: archetype=swarm type=Beast themes=devouring/grave mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stripping a corpse to bone in a minute [behavior] | countless mandibles in a rustling chitin sheet [body] | nests in crypts and ossuaries [behavior]
[concept] identity: A tomb-beetle swarm pours through cracks and grave seams as a single rustling sheet, engulfing a corpse or a living target and stripping flesh to bone in under a minute. Each round it presses the same hungry embrace, scouring with thousands of chitin mandibles and receding into the coffin-dark when wounded, only to return when the prey stops moving. It has no malice, only a voracious, unbroken appetite.
[concept] lore: Tomb-beetle swarms nest in the sealing wax and hollowed ossuaries of old crypts, waking when a fresh body is interred and consuming it before the mourners have finished their prayers.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-3 -> CR 5
[reskin] swarm type stamped: Beast -> Swarm of Tiny Beasts
[reskin] inline declared: "the beetle swarm" — the call's own answer (kind), built from the name; the rules would have said "the swarm"
[reskin] inline on kit rows: "the beetle swarm" -> "the swarm"
[reskin] inline form: "the beetle swarm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tomb-beetle swarm" -> has (descriptive), head | "strips a corpse in a minute" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm surges over a wounded or fallen creature and begins stripping its flesh, digging in with countless mandibles so the victim drags the beetles along if it tries to flee — the feeding clings to the target and keeps scouring it each round until it dies or the beetles are pried away. As it strips, a creature that has bled enough crumbles faster, and the swarm's feasting emboldens it toward th" [action/save/damage] — menu: trample, leap, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: rampage, shell-withdraw, patient-defense, second-wind, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] rider declined: "Ossuary Feeding" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] signature idea (trait): "The rustling chitin sheet leaves nothing but bone in its wake: anyone touching, striking, or lying among the swarm finds mandibles worrying at every seam, so the beetles gnaw at whoever shares their space and grow hungrier over a body that has stopped moving." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — undead-fortitude (corpse)
[reskin] word match declined by the call: undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown undead-fortitude, which the GM's words keyed
[reskin] key match declined: trait — "undead-fortitude" was ranked first on the call's own menu for corpse, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The rustling chitin sheet leaves nothing but bone in its wake: anyone touching, striking, or lying among the swarm finds mandibles worrying at every seam, so the beetles gnaw at whoever shares their space and grow hungrier over a body that has stopped moving." [trait/always/damage] — the model found no template that holds it (offered: undead-fortitude, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] repair: 1 clause(s) with no row — "strips a corpse in a minute"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Mandibles = none
[reskin] immunities stamped for type: Swarm of Tiny Beasts + donor suite -> Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] bloodied half re-derived: "Mandibles" — 11 -> 17, half of the main 34 (print's ratio on all seven swarms)
```


---


### Doorwarden Dain — in the run

**Concept:** a dwarf shield-singer who holds a doorway for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Doorwarden Dain | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Shield Rim); nova none; dmg 52

```
Doorwarden Dain

Medium Humanoid, Lawful Good

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

Senses Passive Perception 14

Languages Dwarvish, Common

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Dain makes two attacks, using Shield Rim or Cracking Note in any combination. It can replace one attack with a use of Warden's Rebuke.

Shield Rim. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Cracking Note. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Piercing damage.

Warden's Rebuke. Wisdom Saving Throw: DC 15, one creature within 30 feet that is Charmed by Dain. Failure: 21 (6d6) Piercing damage. Success: Half damage.

Bonus Actions

Captain's Charm. Wisdom Saving Throw: DC 15, one creature Dain can see within 30 feet. Failure: The target has the Charmed condition until the start of Dain's next turn.

Bolstering Cry (2/Day). Each ally within 30 feet of Dain gains 13 (3d8) Temporary Hit Points.

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
- Actions/Shield Rim — the chassis
- Actions/Cracking Note — the chassis
- Actions/Warden's Rebuke — library seed exploiter
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "shield singer"
- Bonus Actions/Bolstering Cry — template rally; bard kit; the GM's clause "shield singer"

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a dwarf shield-singer who holds a doorwa") | brute-grappler: the call read "holds" as not meaning that mechanic here — no override | defender stands: every key that would override it was read as a figure of speech | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "dwarf shield-singer who holds a doorway …" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: holding a doorway no one may pass [behavior] | the sung ward that rings the air [behavior] | his iron-bound shield [object]
[concept] identity: The shield-singer plants himself in the doorway and opens with the first verse of his song, a low ringing hum that hardens the air in front of his shield into a wall of sound; anyone who tries to slip past strikes that wall and is thrown back. Every round he holds the threshold, battering intruders with his shield's rim and punishing any who turn their backs with a rising note that cracks armor and bone, singing the dying through their last breaths. He never leaves the door — not for bloodied wounds, not for any bait — and fights to the death, because the verses must not stop while someone behind him still breathes.
[concept] lore: A dwarf who swore his final oath to a mountain hospice, this shield-singer has sung the same doorway-ward for two hundred years, keeping out the dark that comes for the dying and singing each departing soul past it.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — "Cracking Note" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] implied class kept: "bard" on the GM's own words "shield singer" — the key table found none
[reskin] class kit: bard — "shield singer": Captain's Charm (Pirate Captain/Captain's Charm), Bolstering Cry (2/Day) (rally)
[reskin] inline declared: "Dain" — the call's own answer (person), built from the name
[reskin] inline form: "Dain" — the model's own reading of the name
[reskin] energy rider withheld: Thunder on a Humanoid with no Thunder in the concept's own words
[reskin] energy withheld on a base row: "Cracking Note" Thunder -> Piercing (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dwarf shield-singer" -> has (mechanical) | "holds a doorway for the dying" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Dain sings a rising note that seeks out anyone who has turned away from him, striking the back of the furthest enemy he can see as they flee or reach past him. The sound cracks armor and bone, and the note rings loudest against those who are trying to get around him rather than face him. He cannot use it on someone who is squared up against him, only on those showing their backs to the door." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte)
[reskin] signature re-seated: action — no rider shares the verb; the idea "Dain sings a rising note that seeks out anyone who has turne…" is tried as an action
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Dain sings a rising note that seeks out anyone who has turned away from him, striking the back of the furthest enemy he can see as they flee or reach past him. The sound cracks armor and bone, and the note rings loudest against those who are trying to get around him rather than face him. He cannot use it on someone who is squared up against him, only on those showing their backs to the door." [action/save/damage] — menu: throw-retrieve, seal, shield-bash, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Dain sings a rising note that seeks out anyone who has turned away from him, striking the back of the furthest enemy he can see as they flee or reach past him. The sound cracks armor and bone, and the note rings loudest against those who are trying to get around him rather than face him. He cannot use it on someone who is squared up against him, only on those showing their backs to the door." [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: throw-retrieve, seal, shield-bash, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] fallback skipped by the floor: push-prone (EV 3.4 vs 13)
[reskin] fallback skipped by the floor: herd (EV 9.8 vs 42.3)
[reskin] value check: "Opportunist's Lash" EV 16.3 vs floor 13 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Dain's voice never stops while he still stands, and the song itself mends those who hear it hold the threshold with him. At the start of each of his turns, any ally near him who is wounded but still fighting feels the verse steady them and recovers a little vitality; if Dain is silenced, stunned, or drops, the song breaks and this stops." [trait/start_of_turn/resource] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (dying, the dying)
[reskin] word match declined by the call: bloodied-burst, false-appearance, bloodied-fury, relentless-pursuit, mimicry, warded-mending, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Dain's voice never stops while he still stands, and the song itself mends those who hear it hold the threshold with him. At the start of each of his turns, any ally near him who is wounded but still fighting feels the verse steady them and recovers a little vitality; if Dain is silenced, stunned, or drops, the song breaks and this stops." [trait/start_of_turn/resource] — the model found no template that holds it (offered: bloodied-burst, warded-mending, false-appearance, resonant-body, bloodied-fury, relentless-pursuit, mimicry)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Shield Rim = shield; Cracking Note = none
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] save re-derived after a retype: Actions/Opportunist's Lash — a Strength save for an effect that calls for Wisdom or Charisma; the save follows the condition
[reskin] audit rename: "Opportunist's Lash" -> "Warden's Rebuke"
[reskin] row narrowed: "Cracking Note" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---


### Old Wolf — in the run

**Concept:** an old wolf that cannot run any more and fights where it stands

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Old Wolf | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Bite); nova none; dmg 12

```
Old Wolf

Medium Beast, Unaligned

AC 12
Initiative -1 (9)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
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
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
6
-2
-2

Skills Athletics +5, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages None

CR 2 (XP 450; PB +2)

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Predatory Growl. Wisdom Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Frightened condition until the end of Wolf's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Psychic damage.

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

- Actions/Bite — the chassis
- Actions/Predatory Growl — library seed escalating-dread

**Engine trace**

```
[route] brute type=Beast mechanics=none — brute: ✓ ("an old wolf that cannot run any more and") | brute: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Beast themes=bestial/grave mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a stance it will not leave [behavior] | scarred bone-riding hide [body] | stiff, snapping jaws that hold on [behavior]
[concept] identity: The old wolf cannot close the distance, so it waits where broken ground or a kill-site gives it cover, letting the pack drive prey toward its jaws. Every round it lunges with stiff, snapping bites and shoves with its scarred shoulder, trading wounds to keep a foe within reach of its teeth. Too proud and too ruined to run, it fights to the death and never breaks off.
[concept] lore: Driven from its pack when its legs failed, this gray-muzzled veteran holds a scrap of contested ground and kills anything that comes close enough to remind it of hunting.
[reskin] donor: brute-2 -> CR 2
[reskin] claim gate: CR 2 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] inline by rule: "Wolf" — the call answered "the old wolf" (kind), which the name does not support
[reskin] inline form: "the old wolf" — the model's own reading of the name
[reskin] lacks asked: "cannot run any more"
[reskin] asked field dropped: "cannot run any more" carries no trigger word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] asked field dropped: "cannot run any more" carries no frequency word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "an old wolf" -> has (descriptive), head | "cannot run any more" -> LACKS (mechanical) [asked: movement] | "fights where it stands" -> has (descriptive)
[reskin] signature idea (action): "When a foe tries to slip away from its jaws, the old wolf snaps after them and drags them back into the reach of its teeth, throwing its scarred shoulder into the shove. It only does this when someone actually turns to leave its ground; it never chases, so anything that keeps its distance is safe from it." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: push-prone, hook-rider, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe tries to slip away from its jaws, the old wolf snaps after them and drags them back into the reach of its teeth, throwing its scarred shoulder into the shove. It only does this when someone actually turns to leave its ground; it never chases, so anything that keeps its distance is safe from it." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: hook-rider, push-prone, thrown-burst-seed)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 1) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is a map of old wounds that healed crooked over the bone, so blades slide off the scarred seams and dull themselves against it. Anyone who strikes it feels that ruined toughness in their arms and swings weaker for the rest of the fight." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, blurred-form)
[reskin] signature bound to the concept's verb: trait — blurred-form (where it stands)
[reskin] word match declined by the call: blurred-form — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Its hide is a map of old wounds that healed crooked over the bone, so blades slide off the scarred seams and dull themselves against it. Anyone who strikes it feels that ruined toughness in their arms and swings weaker for the rest of the fight." [trait/on_being_hit/condition] — the model picked "weapon-lodge" (no verb, and it quotes nothing the GM typed) over a concept-verb template (blurred-form)
[reskin] concept-first trait skipped: blurred-form — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] audit rename: "Creeping Dread" -> "Predatory Growl"
```


---


### Vessel of the Swallowed Hoard — in the run

**Concept:** a reliquary thief who swallows what she steals

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vessel of the Swallowed Hoard | 6 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Shortsword: a Restrained rider on every hit with no save
- read: def 4 / off 9 → 6.5; sustained 58 (2 × Shortsword); nova none; dmg 58

```
Vessel of the Swallowed Hoard

Medium Humanoid, Neutral

AC 14
Initiative +2 (12)

HP 117 (26d8)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
12
+1
+1
MOD
SAVE
DEX
15
+2
+2
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

Skills Athletics +7, Perception +5

Senses Passive Perception 15

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The vessel makes two Shortsword attacks. It can replace one attack with a use of Opportunist's Lash.

Shortsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage plus 7 (2d6) Poison damage. While Grappled, the target has the Restrained condition.

Opportunist's Lash. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the vessel. Failure: 17 (5d6) Piercing damage. Success: Half damage.

Bonus Actions

Swallow. The vessel swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the vessel, and takes 7 (2d6) Acid damage at the start of each of the vessel's turns. The vessel can have only one creature swallowed at a time. If the vessel takes 15 damage or more in a single turn from the swallowed creature, the vessel must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the vessel. If the vessel dies, a swallowed creature exits the body Prone by using 5 feet of movement.

Cunning Action. The vessel takes the Dash, Disengage, or Hide action.

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
- Actions/Shortsword — print's row, renamed
- Actions/Opportunist's Lash — library seed exploiter
- Bonus Actions/Swallow — the GM's clause "swallows what she steals"; binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "a reliquary thief"

**Engine trace**

```
[route] brute-grappler type=Humanoid mechanics=grapple, engulf — brute-grappler: ✓ ("swallows what she steals") | brute-grappler: key "swallows" (class verb) | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] hints: engulf→mechanics ✓ ("swallows what she steals")
[concept] resolve: archetype=brute type=Humanoid themes=forged/grasping mind=sapient style=grappler energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing stolen relics whole [behavior] | a gullet glowing with hoarded holy light [body] | iron-hard fists and gut [body]
[concept] identity: A lean, hollow-eyed reliquary thief opens combat by lunging for the nearest gleaming holy object and ramming it down her throat mid-stride, then uses the relic's stolen power to fight with a distended, faintly glowing gullet and iron-hard fists. Every round she hunts for the next sacred prize, preferring to disengage and bolt across rooftops the instant she has something worth keeping. She is a coward with a full stomach: she yields ground readily but fights to the death if cornered with her hoard still trapped inside her.
[concept] lore: Cast out of a temple order for selling relics, she learned a witch's trick of swallowing holy objects whole so they could never be taken back — and now the hoard inside her gnaws to be fed.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon array: STR 18, DEX 15, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, STR fitted to +7
[reskin] donor: brute-5-grappler -> CR 6
[reskin] print canon: "a reliquary thief who swallows what she steals" heads on the Spy — print's rows ride along; the seat stays
[reskin] class kit: evasion — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: rogue — "a reliquary thief": Cunning Action (Assassin/Cunning Action)
[reskin] inline by rule: "the vessel" — the call answered "the swallowed hoard" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "swallows what she steals" carries no trigger word, so the call's "on_hit" has no receipt in the GM's own clause
[reskin] asked field dropped: "swallows what she steals" carries no frequency word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "a reliquary thief" -> has (descriptive), head | "swallows what she steals" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "The relic-stuffed gullet can be made to blaze — she wrenches her jaw wide and lets the stolen holy light flood out, scorching every creature close enough to be caught in it and leaving them reeling and half-blind while she slips away. She does it when she needs to buy distance or punish a pack that has crowded her, but every use burns off some of the hoarded glow she has left, so she can only do i" [action/once_per_fight/damage] — menu: leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, disarm (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — disarm (steal)
[reskin] signature miss: action — "The relic-stuffed gullet can be made to blaze — she wrenches her jaw wide and lets the stolen holy light flood out, scorching every creature close enough to be caught in it and leaving them reeling and half-blind while she slips away. She does it when she needs to buy distance or punish a pack that has crowded her, but every use burns off some of the hoarded glow she has left, so she can only do i" [action/once_per_fight/damage] — the model picked "ground-burst" (no verb, and it quotes nothing the GM typed) over a concept-verb template (disarm)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 10.9)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] fallback skipped by the floor: herd (EV 8.2 vs 35.5)
[reskin] value check: "Opportunist's Lash" EV 13.2 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "She cannot bear to lose what she has swallowed: while a stolen relic still burns inside her, she will not yield or flee, fighting with a desperate ferocity — and when the last of that inner light is gone, her nerve goes with it and she turns to run." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — shielded-mind, sealed-body (reliquary)
[reskin] word match declined by the call: shielded-mind, sealed-body — the key word does not mean the mechanic here
[reskin] trait declined: "Bloodied Fury" — bound only on the idea's own words (desperate:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Fist = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Spy's
[reskin] print canon attack: "Fist" -> "Shortsword" — the Spy's own row
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] row binds its clause: "Swallow" answers "swallows what she steals" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Swallow The regurgitation counterplay is keyed only to damage from the swallowed creature, creating a rules-legal gap where damage from other sources can never free the target.
```


---

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

## Review batch — holds2-2026-10-17T02-23-27

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedmarch Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Sister Elowen Vane | 8 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/6 |
| Ironwake Berserker | 8 | 2024 | brute-5 | SOFT: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |
| Marrow Tollrick | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/4 |
| Sedge Maw | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | ok | soft (2) | 1/1 | 2/5 |

**Dropped 2 of 8 user clauses** (coverage 75%); concept share 58% (18/31 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Sedge Maw — lowest CR

**Concept:** a marsh predator that hunts through the reeds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sedge Maw | 4 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 52 is 31% under the card's 75
- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- headerBody · soft · languages-type: a Beast that speaks (Common)
- headerBody · soft · lint:beast-intelligence: type Beast with INT 11 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 1 / off 4 → 2.5; sustained 28 (2 × Fang); nova none; dmg 28

```
Sedge Maw

Medium Beast, Unaligned

AC 15
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
12
+1
+1
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
14
+2
+2
CHA
12
+1
+1

Skills Perception +3, Stealth +8

Senses darkvision 30 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Assassinate. During the first round of each combat, the sedge maw has Advantage on attack rolls against any creature that hasn't taken a turn. If the sedge maw hits a creature during that round, the target takes an extra 7 (2d6) Poison damage.

Evasion. If the sedge maw is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the sedge maw instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The sedge maw makes two Fang attacks. It can replace one attack with a use of Sedge Hiss.

Fang. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Poison damage.

Sedge Hiss. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the sedge maw's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Poison damage.

Bonus Actions

Nimble Escape. The sedge maw takes the Disengage or Hide action.

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
- Actions/Fang — the chassis
- Actions/Sedge Hiss — library seed escalating-dread
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "hunts through the reeds"
- Traits/Assassinate — template assassinate; library draw (seed unstamped)
- Traits/Evasion — template evasion; rogue kit; the GM's clause "hunts through the reeds"

**Engine trace**

```
[route] lurker type=Beast mechanics=none — lurker: ✓ ("hunts through the reeds") | lurker: no line key in the words — the model's read of its quote
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] resolve: archetype=lurker type=Beast themes=bestial/venomous mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ambush from concealment in the reeds [behavior] | vertical reed-pattern camouflage hide [body] | venom-laced bite that cripples and slows [behavior]
[concept] identity: The reed-stalker glides through marsh grass in total silence, body broken into vertical bands of light and shadow like the reeds themselves, then explodes from concealment in one savage lunging bite aimed at the throat or hamstring before ghosting back into cover to let its venom and the muck finish the job. Every round after the opening it shadows its wounded prey through the marsh at a stalker's patient distance, striking again only when the target falters, bleeds out, or turns its back. It is a cold ambusher that abandons a fight it cannot win, choosing a worse kill over a fair one — it toys with nothing and fears a stand-up fight.
[concept] lore: Bred in the sunken reed-beds where drowned rivers rot, the reed-stalker is a marsh-born beast that treats the living as meat to be stalked, bled, and staked out as a larder.
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] implied class kept: "rogue" on the GM's own words "hunts through the reeds" — the key table found none
[reskin] row evicted for the cap: Bonus Actions/"Umbral Step" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "hunts through the reeds": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "the sedge maw" — the call's own answer (kind), built from the name
[reskin] inline form: "the sedge maw" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh predator" -> has (descriptive), head | "hunts through the reeds" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the maw has been out of sight of its chosen prey, it doesn't rush in — it works the reeds, circling just beyond notice, until it finds a moment its target can't answer. At that opening it lunges from the reed wall with a single savage bite, then ghosts back out of reach before the wound is even felt, leaving the venom to do the rest. It will keep shadowing that same target across the marsh, a" [bonus_action/once_per_fight/movement] — menu: patient-defense, self-invisibility, focus, feint-slip, coating (+ shelf: leap, gaze-single, condition-payoff, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, exploiter (hunt, predator)
[reskin] word match declined by the call: focus, exploiter, coating, gaze-single, delayed-brand, riposte — the key word does not mean the mechanic here
[reskin] signature miss: action — "When the maw has been out of sight of its chosen prey, it doesn't rush in — it works the reeds, circling just beyond notice, until it finds a moment its target can't answer. At that opening it lunges from the reed wall with a single savage bite, then ghosts back out of reach before the wound is even felt, leaving the venom to do the rest. It will keep shadowing that same target across the marsh, a" [bonus_action/once_per_fight/movement] — the model picked "self-invisibility" (no verb, and it quotes nothing the GM typed) over a concept-verb template (focus, exploiter)
[reskin] fallback respects the call: exploiter, focus, gaze-single left the shelf — the call declined them for this sheet
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 2) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is broken into shifting vertical bands that mimic the reeds around it, so while it holds still or keeps to reeds and standing water it is nearly impossible to pick out — even in plain view its outline frays and wandering eyes slide past it. Only when prey comes close and unaware does the pattern betray it, so it always gets the first strike on whatever wanders in." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk, faultless-tracker (marsh, reeds, hunts, hunted)
[reskin] word match declined by the call: terrain-walk, faultless-tracker, assassinate — the key word does not mean the mechanic here
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] inline rider retired: Fang — Assassinate grants the first-round Advantage now
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] trait declined: "Reedmimic Hide" — bound only on the idea's own words (mimic:idea, still:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Fang = none
[reskin] languages defaulted for sapient: Common
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] save re-derived after a retype: Actions/Creeping Dread — a Wisdom save for an effect that calls for Constitution; the save follows the condition
[reskin] audit rename: "Creeping Dread" -> "Sedge Hiss"
```


---


### Ironwake Berserker — highest CR

**Concept:** a berserker who flies into an unstoppable rage once per day when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ironwake Berserker | 8 | brute-5 | SOFT: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · soft · duplicate-mechanic: Traits/Ironwake Fury: every part of this row is already in "Bloodied Frenzy" — two rows, one mechanic
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Ironwake Berserker

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

Ironwake Fury. While Bloodied, the berserker has Advantage on attack rolls.

Bloodied Frenzy. While Bloodied, the berserker has Advantage on attack rolls and saving throws.

Regeneration. The berserker regains 10 Hit Points at the start of each of its turns. If the berserker takes Acid or Fire damage, this trait doesn't function on the berserker's next turn. The berserker dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The berserker makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the berserker moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Traits/Ironwake Fury — template bloodied-fury; library draw (seed unstamped); the GM's clause "flies into an unstoppable rage once per day when wounded"; binds the GM's words: wounded+rage
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a berserker"
- Traits/Regeneration — the chassis
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a berserker"

**Engine trace**

```
[route] brute-regenerator type=Humanoid mechanics=regeneration — brute-regenerator: ✓ ("once per day when wounded") | skirmisher-winged: the call read "flies" as not meaning that mechanic here — no override | brute-regenerator stands: every key that would override it was read as a figure of speech | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: winged→style ✗ ("flies into an unstoppable rage")
[concept] resolve: archetype=brute type=Humanoid themes=armed/bestial mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: once-per-day unstoppable rage on being wounded [behavior] | wounds that reknit as fast as they open [body] | berserker's axe and scarred iron flesh [object]
[concept] identity: A scarred humanoid warrior who wades into melee with a roaring axe, and once per day the first deep wound ignites a berserk fury that closes its flesh as fast as blades open it. While raging it fights to the death, never breaking off, and its regenerating hide means only its bane—a specific harm—can end the slaughter before it ends you.
[concept] lore: These berserkers bind their rage to a wound-rite of living iron, and they seek out any battlefield where they can be struck hard enough to wake it.
[reskin] print canon route: the Berserker's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 9, WIS 11, CHA 9 — the Berserker's, STR fitted to +8
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: barbarian — "a berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the berserker" — the call's own answer (kind), built from the name
[reskin] inline form: "the berserker" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a berserker" -> has (descriptive), head | "flies into an unstoppable rage once per day when wounded" -> has (mechanical) [asked: when_bloodied/per_day/buff_self]
[reskin] signature idea (action): "When the berserker is wounded badly enough to be fighting for its life, it roars the rage awake and charges straight at whatever hurt it, heedless of everything else. Until that enemy is dead it keeps hammering it, and any wound it takes along the way only stokes its fury. It can only call on this once, so it picks the moment of its deepest hurt to unleash it." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] word match declined by the call: charge, trample, terror-pulse, herd, throw-retrieve, drain, affliction — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the berserker is wounded badly enough to be fighting for its life, it roars the rage awake and charges straight at whatever hurt it, heedless of everything else. Until that enemy is dead it keeps hammering it, and any wound it takes along the way only stokes its fury. It can only call on this once, so it picks the moment of its deepest hurt to unleash it." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: affliction, trample, throw-retrieve, terror-pulse, herd, drain, charge)
[reskin] fallback respects the call: terror-pulse, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a berserker who flies into an unstoppable rage once per day when wounded" heads on the Berserker and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 14 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its scarred iron hide knits shut around every fresh cut, so wounds meant to slow it only sharpen its aggression: each time it is struck, its next axe swing comes faster and harder." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (wounded, rage)
[reskin] word match declined by the call: resonant-body, weapon-lodge, warded-mending, bloodied-burst, absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-fury -> Traits/"Ironwake Fury" ("struck while wounded drives it into rage, sharpening its aggression — the bloodi [verb: wounded:concept, rage:concept]")
[reskin] weapons answered: Greataxe = greataxe
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Ironwake Fury" answers "flies into an unstoppable rage once per day when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "flies into an unstoppable rage once per day when wounded" -> "Ironwake Fury" — limit: asked per_day, row reads at_will
```


---


### Reedmarch Stalker — a 2024 sheet

**Concept:** a lizardfolk ninja who strikes from the reeds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedmarch Stalker | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Stone Edge); nova none; dmg 34

```
Reedmarch Stalker

Medium Humanoid, Neutral

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

Skills Perception +4, Stealth +9

Senses Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If the stalker is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the stalker instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Hold Breath. The stalker can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the stalker extra movement, and the stalker can move across mud without needing to make an ability check.

Actions

Multiattack. The stalker makes two attacks, using Stone Edge or Reed-Dart in any combination.

Stone Edge. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Reed-Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Marsh Pursuit (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the stalker moves up to half its Speed, and it makes one Stone Edge attack.

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

- Traits/Evasion — template evasion; rogue kit; the GM's clause "a lizardfolk ninja"
- Traits/Hold Breath — lizardfolk kit; the GM's clause "a lizardfolk ninja"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "strikes from the reeds"
- Actions/Multiattack — the chassis
- Actions/Stone Edge — the chassis
- Actions/Reed-Dart — weapon dart
- Bonus Actions/Marsh Pursuit — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a lizardfolk ninja who strikes from the ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/aquatic mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from the reeds [behavior] | venom-coated reed darts and barbed stone blades [object] | vanishing back into the marsh after every strike [behavior]
[concept] identity: The reed-runner opens from hiding, bursting out of chest-deep water grass to drive a barbed reed-dart and a stone edge into a flank before the prey can turn; every round after is a rhythm of strike-and-vanish, submerging or sliding through reeds to re-hide and strike again with advantage. It is patient and cruel with its ambushes, but bleeding or cornered it abandons the hunt and swims for deeper marsh rather than die in the open.
[concept] lore: Hatched into a marsh-tribe that trains its hunters to breathe through reeds and move without rippling water, this lizardfolk kills not for glory but to keep intruders from mapping the hidden trails that feed its people.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] row evicted for the cap: Traits/"Reed-Slider" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "a lizardfolk ninja": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored, binds "strikes from the reeds"); Swim 30 ft.
[reskin] implied class kept: "rogue" on the GM's own words "a lizardfolk ninja" — the key table found none
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] row evicted for the cap: Bonus Actions/"Cunning Action" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "a lizardfolk ninja": Evasion (evasion)
[reskin] inline declared: "the stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the stalker" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk ninja" -> has (descriptive), head | "strikes from the reeds" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the stalker bursts out of concealment in reeds or muddy water to make its first strike, its barbed reed-dart drags the prey's footing loose, hooking cloth and hide so the target is left tangled and slowed until it tears free or the stalker's next opening. Used only on the strike that breaks its hiding, it turns a concealed opening into a pinned, off-balance victim for the follow-up stone edge" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: hook-rider, snare-bolt, exploiter — the key word does not mean the mechanic here
[reskin] value check: "Reedmarch Snare (Recharge 5-6)" EV 9.9 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Reedmarch Snare (Recharge 5-6)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: exploiter left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its dart tips and stone blade edges are smeared with marsh-reed venom that lingers on any cut it lands, numbing and weakening whatever it wounds so a struck foe gets slower and clumsier while the hunt goes on." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (reeds)
[reskin] word match declined by the call: terrain-walk, adhesive, faultless-tracker — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "assassinate" has no key-table verb, but the call quotes "strikes from the reeds" from the description
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] trait ceiling: "Reed Ambush" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Stone Edge = none; Reed-Dart = none
[reskin] weapon table: "Reed-Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] audit rename: "Rampage (1/Day)" -> "Marsh Pursuit (1/Day)"
```


---


### Sister Elowen Vane — one marked soft

**Concept:** an oathsworn crusader who smites the unclean and mends her own wounds

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sister Elowen Vane | 8 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Longsword: reach 10 on a Medium body with no tether word
- read: def 7 / off 8 → 7.5; sustained 54 (3 × Longsword); nova none; dmg 54

```
Sister Elowen Vane

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

Aura of Authority. While in a 10-foot Emanation originating from Elowen, Elowen and its allies have Advantage on attack rolls and saving throws, provided Elowen doesn't have the Incapacitated condition.

Regeneration. Elowen regains 10 Hit Points at the start of each of its turns. If Elowen takes Acid or Fire damage, this trait doesn't function on Elowen's next turn. Elowen dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. Elowen makes three Longsword attacks.

Longsword. Melee Attack Roll: +8, reach 10 ft. 18 (3d8 + 5) Slashing damage.

Bonus Actions

Lay on Hands (2/Day). Elowen touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Elowen charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Oathbound Mending (2/Day). Elowen regains 18 (4d8) Hit Points.

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
- Actions/Longsword — weapon longsword
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her own wounds"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Oathbound Mending — template second-wind; library draw (seed unstamped)

**Engine trace**

```
[route] brute-regenerator type=Humanoid mechanics=regeneration — caster-warpriest: a caster line needs a magic word in the words — none here | brute-regenerator: ✓ ("mends her own wounds") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an oathsworn crusader who smites the unc…" is the description, not a name
[concept] hints: warpriest→style ✓ ("smites the unclean; mends her own wounds")
[concept] resolve: archetype=brute type=Humanoid themes=armed/celestial mind=sapient style=regenerator energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: smiting the unclean with holy fire [behavior] | self-mending wounds that close as fast as they open [body] | oathbound iron plate and blade [object]
[concept] identity: A plate-clad zealot strides into the fray and calls down a searing smite on the first unclean thing she reaches, then grinds forward round after round — sword and holy fire together — as her torn flesh knits shut beneath the armor. She does not yield when bloodied; she redoubles the oath, hunting the greatest sinner in reach until either she or the wretch is unmade.
[concept] lore: Sworn to an order that brooks no impurity, she took an oath that made her wounds close like wax resealing — and now she wanders the roads, judging what she meets and mending herself on the way to the next reckoning.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: brute-5-regenerator -> CR 8
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Elowen" — the call's own answer (person), built from the name; the rules would have said "the sister"
[reskin] inline on kit rows: "the sister" -> "Elowen"
[reskin] inline form: "Elowen" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Condemning Smite" Radiant -> Bludgeoning (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her own wounds" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "Elowen marks the foulest sinner she can see — the creature whose deeds most offend her oath — and declares it her quarry aloud, ignoring wounds and lesser foes to reach it. Until that wretch falls or flees her sight, her blows against it burn with holy fire and it cannot slip away from her, though nothing stops the rest of the field from striking at her back." [bonus_action/once_per_fight/damage] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus (+ shelf: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — rally, affliction (mend, wound)
[reskin] word match declined by the call: affliction, aggro-curse, focus, rally — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "second-wind" has no key-table verb, but the call quotes "mends her own wounds" from the description
[reskin] value check: "Oathbound Mending (2/Day)" EV 9.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: second-wind -> Bonus Actions/"Oathbound Mending (2/Day)" ("Elowen mends her own wounds mid-fight, regaining Hit Points as a Bonus Action; t [shape fit, no verb match]")
[reskin] signature idea (trait): "Every wound Elowen takes leaves an opening that seals shut with a sear of holy light the moment she lands a smiting blow — the flesh closing as the fire passes through her blade. Her own strikes, not the passing of time, are what knit her back together." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] word match declined by the call: sealed-body — the key word does not mean the mechanic here
[reskin] trait declined: "Oathbound Mending" — bound only on the idea's own words (knits:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Longsword = longsword; Condemning Smite = none
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Oathbound Mending The entry is a healing Bonus Action with no target or range clause contrasting with Lay on Hands, and no statement that Elowen is the target, so a GM cannot tell whether it can be used on others.
```


---


### Marrow Tollrick — in the run

**Concept:** a tollkeeper who charges a fee for every wagon and kills those who refuse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Marrow Tollrick | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "charges a fee for every wagon"
- read: def 4 / off 5 → 4.5; sustained 34 (2 × Axe); nova none; dmg 34

```
Marrow Tollrick

Medium Humanoid, Neutral Evil

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

Senses Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The tollrick makes two attacks, using Axe or Crossbow in any combination.

Axe. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Crossbow. Ranged Attack Roll: +4, range 80/320 ft. 15 (4d6 + 1) Piercing damage.

Bonus Actions

Tolling Mark. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of the tollrick's next turn, the target has Disadvantage on attack rolls against creatures other than the tollrick.

Reactions

Riposte. Trigger: A creature within 5 feet of the tollrick misses it with a melee attack roll. Response: The tollrick makes one Axe attack against that creature.

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
- Actions/Axe — weapon battleaxe
- Actions/Crossbow — weapon crossbow
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "tollkeeper"
- Bonus Actions/Tolling Mark — template aggro-curse; library draw (seed unstamped); binds the GM's words: mark

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("charges a fee for every wagon") | brute-charger: the call read "charges" as not meaning that mechanic here — no override | defender stands: every key that would override it was read as a figure of speech | defender: no line key in the words — the model's read of its quote
[concept] hints: charger→style ✗ ("charges a fee for every wagon")
[concept] resolve: archetype=defender type=Humanoid themes=armed/grasping mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: demanding a toll from every wagon [behavior] | killing those who refuse to pay [behavior] | shield and rusted iron plate [object]
[concept] identity: A tollkeeper in worn iron plate steps into the road, shield up and axe low, and names a price before steel is drawn — the first refusal gets one warning bark, the second gets the blade. Every round it plants itself between the wagons and the far side of the crossing, taking the center and punishing anyone who tries to slip past or brawl through with a hard shield shove and a chopping counter. It is not reckless: bloodied, it falls back to the narrowest ground it can find and fights to the death there, because the toll is the whole of its law and it will not be cheated twice.
[concept] lore: A roadside tollkeeper who took the crossing's fee as holy writ and kept collecting long after the road stopped paying anyone, its iron now rusted to the shape of its grudge and its purse filled with the teeth of those who argued.
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] implied class kept: "fighter" on the GM's own words "tollkeeper" — the key table found none
[reskin] class kit: fighter — "tollkeeper": Riposte (riposte)
[reskin] inline declared: "the tollrick" — the call's own answer (kind), built from the name
[reskin] inline form: "the tollrick" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tollkeeper" -> has (descriptive), head | "charges a fee for every wagon" -> has (mechanical) | "kills those who refuse" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "It names a price aloud and demands the toll be paid in blood or coin on the spot — whoever refuses is marked as a cheat and its next axe blow against that refuser bites deeper. The demand can be made of one creature at a time, and it only works on someone who has not already paid or refused it once; a second refusal means the blade, not the bark." [bonus_action/always/condition] — menu: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, trample, stunning-strike, charge-push, hook-rider, charge)
[reskin] signature bound to the concept's verb: action — trample, charge (charge)
[reskin] word match declined by the call: curse-debt, active-toll, throw-retrieve — the key word does not mean the mechanic here
[reskin] value check: "Blood Toll" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Blood Toll" ("It names a price and marks the refuser as a cheat, making its next axe blow agai [verb: mark:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The rusted plate and shield make it a wall: anyone who tries to shove past it or slip around it to the far side of the crossing gets slammed back by the shield and loses their footing, ending up where they started or worse — it takes the center, and the center is the tollgate." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: aberrant-ground — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The rusted plate and shield make it a wall: anyone who tries to shove past it or slip around it to the far side of the crossing gets slammed back by the shield and loses their footing, ending up where they started or worse — it takes the center, and the center is the tollgate." [trait/always/movement] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] repair: 1 clause(s) with no row — "charges a fee for every wagon"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Axe = battleaxe; Crossbow = crossbow; Toll Demand = none
[reskin] weapon declared: "Axe" is a battleaxe — the call's own answer (the name alone read handaxe)
[reskin] weapon table: "Crossbow" rolls Dexterity — +6 → +4
[reskin] weapon table: "Crossbow" damage off Dexterity — 17 (4d6 + 3) → 15 (4d6 + 1)
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Blood Toll" -> "Tolling Mark"
```


---

## Review batch — bane-2026-10-17T14-21-04

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reknitting Runoff | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Wax Abbot | 7 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Grave-Knit Revenant | 8 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Fen Altar Troll | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/4 |
| Briarwarden of the Stones | 6 | 2024 | caster-6 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 2 of 5 user clauses** (coverage 60%); concept share 82% (18/22 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Reknitting Runoff — lowest CR

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reknitting Runoff | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 6 → 5; sustained 44 (2 × Rend); nova none; dmg 44

```
Reknitting Runoff

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

Regeneration. The runoff regains 15 Hit Points at the start of each of its turns. If the runoff takes damage from a silvered weapon, this trait doesn't function on the runoff's next turn. The runoff dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the runoff ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the runoff's limbs is severed, falls into the runoff's space, and becomes a Troll Limb. The limb acts immediately after the runoff's turn. The runoff has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The runoff makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Bloody Recoil. One creature within 5 feet that hit the runoff with an attack roll since the end of the runoff's last turn takes 7 (2d6) Bludgeoning damage.

Charge. The runoff moves up to half its Speed straight toward an enemy it can see.

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
- Bonus Actions/Bloody Recoil — library seed own-turn-punisher
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[route] brute-regenerator type=Monstrosity mechanics=regeneration — brute-regenerator: ✓ ("a troll that grows back unless the blade") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that reknit unless the blade is silvered [body] | relentless forward advance through punishment [behavior] | snapping maw and hammering fists [body]
[concept] identity: A bloated creeping horror of raw, self-knitting flesh that lumbers into melee and lets its enemies carve it apart — every wound sealing shut as fast as it opens. Each round it drags its bulk forward and hammers the closest foe with fists and a snapping maw, wearing down silverless blades against its endless regrowth. It never breaks; it advances through punishment, methodically testing which of its attackers actually carries the silvered edge that can finally end it.
[concept] lore: Spun from the runoff of an old alchemist's failed regeneration experiments, this troll-thing seeks only to feed and to spread its ever-reknitting flesh until something silvered cuts it down for good.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5 -> CR 6
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the runoff" — the call's own answer (kind), built from the name
[reskin] inline form: "the runoff" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a troll" -> has (mechanical), head [asked: heal] | "grows back unless the blade was silvered" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "The runoff hurls a great glob of its own half-living flesh at a distant foe, and the wet mass clings fast where it lands. From then on that foe can feel the runoff drawing itself toward them, and the creature lurches into a dead sprint straight at whoever carries the splatter, shouldering through the fight to reach them." [action/save/movement] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: thrown-burst, thrown-burst-seed, trample — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The runoff hurls a great glob of its own half-living flesh at a distant foe, and the wet mass clings fast where it lands. From then on that foe can feel the runoff drawing itself toward them, and the creature lurches into a dead sprint straight at whoever carries the splatter, shouldering through the fight to reach them." [action/save/movement] — the model found no template that holds it (offered: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
[reskin] fallback stands down: "a troll that grows back unless the blade was silvered" heads on the Troll and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its flesh never stops trying to become one thing again: whenever a foe strikes it in melee, stray gobbets of reknitting runoff spatter onto the attacker, clinging and knitting to their limbs. While they wear it, the runoff lurches and strikes at them with hungry preference, hammering aside everyone else to get at the one marked by its own living meat." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its flesh never stops trying to become one thing again: whenever a foe strikes it in melee, stray gobbets of reknitting runoff spatter onto the attacker, clinging and knitting to their limbs. While they wear it, the runoff lurches and strikes at them with hungry preference, hammering aside everyone else to get at the one marked by its own living meat." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, faultless-tracker, relentless-pursuit, warded-mending)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none
[reskin] print canon alignment: Unaligned -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Giant — the Troll's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Slam" -> "Rend" — the Troll's own row
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
[reskin] audit rename: "Answering Sting" -> "Bloody Recoil"
```


---


### Grave-Knit Revenant — highest CR

**Concept:** a grave-knit revenant that pulls itself together only under holy light

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grave-Knit Revenant | 8 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 8 → 8; sustained 50 (2 × Claw); nova none; dmg 50

```
Grave-Knit Revenant

Medium Undead, Neutral

AC 14
Initiative +5 (15)

HP 112 (15d8 + 45)

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
+8
WIS
14
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
15
+2
+2

Skills Stealth +8

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Ossuary Reknitting. The grave-knit revenant regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and holy light is within 30 feet of it.

Incorporeal Movement. The grave-knit revenant can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the grave-knit revenant has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The grave-knit revenant makes two Claw attacks. It can replace one attack with a use of Gravecall.

Claw. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 11 (2d10) Necrotic damage.

Gravecall. Wisdom Saving Throw: DC 16, one creature within 60 feet that can see or hear the grave-knit revenant. Failure: The target has the Charmed condition until the start of the grave-knit revenant's next turn, and while Charmed this way, it must move toward the grave-knit revenant by the safest available route on its turn and can't take Reactions.

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

- Traits/Ossuary Reknitting — template warded-mending; library draw (seed unstamped); binds the GM's words: knits
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Gravecall — library seed lure; the GM's clause "pulls itself together only under holy light"; binds the GM's words: light

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — brute-regenerator: ✓ ("pulls itself together") | brute-regenerator -> lurker-phantom: the concept's BODY outranks the noun (key "revenant", class body) | lurker-phantom: key "revenant" (class body) | bane: "Radiant" on the GM's own words "pulls itself together only under holy li"
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=bestial style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pulls itself together under holy light [behavior] | gravemaker-bone and grave-soil body [body] | grasping drain of the living [behavior]
[concept] identity: The grave-knit revenant lies scattered as loose bones and grave-soil until holy light touches it, then snaps itself together into a lurching, lamprey-armed horror that hunts the living to keep its borrowed shape. Each round it lunges to grapple a body and drink its warmth, dragging prey out of the light so the revenant can stay whole; under pressure it clings to a victim and fights to the death, since losing its grip means collapsing back into a heap of discarded bones.
[concept] lore: A mass grave's dead, stitched together by a dying oath, it lurks beneath temple floors and graveyards, craving the holy light that gives it form and the living warmth that keeps it there.
[reskin] donor: lurker-5-phantom -> CR 8
[reskin] inline by rule: "the grave-knit revenant" — the call answered "the revenant" (kind), which the name does not support
[reskin] inline on kit rows: "the revenant" -> "the grave-knit revenant"
[reskin] inline form: "the revenant" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "pulls itself together only under holy light" carries no frequency word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "a grave-knit revenant" -> has (descriptive), head | "pulls itself together only under holy light" -> has (mechanical) [asked: buff_self]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The revenant clamps onto a living creature with its lamprey arms and begins pulling the warmth out of it — not to deal damage, but to knit its own bones back together. As long as it has a living body held against it, any harm that would scatter the revenant instead reassembles it, the stolen heat re-forming shattered bones and packed grave-soil until the victim is dragged out of the holy light and" [rider/on_hit/resource] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: swallow, leap, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, reveal, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — hook-drag (pull, under)
[reskin] word match declined by the call: hook-drag, obstacle-pull, hook-rider, terror-pulse, blighted-ground, affliction, contagion, stunning-strike, charge-push, pounce, isolation — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown hook-drag, which the GM's words keyed
[reskin] key match declined: action — "hook-drag" was ranked first on the call's own menu for pull+under, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The revenant clamps onto a living creature with its lamprey arms and begins pulling the warmth out of it — not to deal damage, but to knit its own bones back together. As long as it has a living body held against it, any harm that would scatter the revenant instead reassembles it, the stolen heat re-forming shattered bones and packed grave-soil until the victim is dragged out of the holy light and" [rider/on_hit/resource] — the model found no template that holds it (offered: hook-drag, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, obstacle-pull, terror-pulse, blighted-ground)
[reskin] fallback respects the call: hook-drag, obstacle-pull, terror-pulse left the shelf — the call declined them for this sheet
[reskin] value check: "Luring Presence" EV 14.9 vs floor 14 (one attack of 2) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Where holy light falls, the grave-knit revenant's body pulls itself back together — scattered bones and soil lift and reseat, closing its wounds, but only while it stands exposed in that light rather than in shadow. Break the light and the knitting stops; leave it basking, and the dead men's oath slowly stitches it whole again." [trait/start_of_turn/resource] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (knits)
[reskin] signature template (trait): warded-mending -> Traits/"Ossuary Reknitting" ("The revenant regains Hit Points at the start of each turn while a holy light sou [verb: knits:concept]")
[reskin] weapons answered: Claw = none
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
[reskin] row binds its clause: "Luring Presence" answers "pulls itself together only under holy light" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Luring Presence" -> "Gravecall"
```


---


### Wax Abbot — a 2024 sheet

**Concept:** a wax abbot that reknits itself unless it is burned

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Wax Abbot | 7 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Candlestick-Staff: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 51 (3 × Candlestick-Staff); nova none; dmg 51

```
Wax Abbot

Medium Construct, Neutral

AC 14
Initiative +1 (11)

HP 135 (18d8 + 54)

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

Skills Athletics +7, Perception +2

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 12

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Waxen Reknitting. While the wax abbot has at least 1 Hit Point and hasn't taken Fire damage since the start of its last turn, the wax abbot reknits itself, regaining Hit Points.

Regeneration. The wax abbot regains 10 Hit Points at the start of each of its turns. If the wax abbot takes Fire damage, this trait doesn't function on the wax abbot's next turn. The wax abbot dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The wax abbot makes three Candlestick-Staff attacks.

Candlestick-Staff. Melee Attack Roll: +7, reach 10 ft. 17 (3d8 + 4) Bludgeoning damage.

Bonus Actions

Molten Retort. One creature within 5 feet that hit the wax abbot with an attack roll since the end of the wax abbot's last turn takes 7 (2d6) Fire damage.

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

- Traits/Waxen Reknitting — authored for this sheet; the GM's clause "reknits itself unless it is burned"
- Traits/Regeneration — the chassis
- Actions/Multiattack — the chassis
- Actions/Candlestick-Staff — weapon staff
- Bonus Actions/Molten Retort — library seed own-turn-punisher

**Engine trace**

```
[route] brute-regenerator type=Construct mechanics=regeneration — brute-regenerator: ✓ ("reknits itself unless it is burned") | brute-regenerator: key "reknits" (class verb) | bane: "Fire" on the GM's own words "unless it is burned"
[concept] hints: regenerator→style ✓ ("a wax abbot that reknits itself")
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=sapient style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: reknitting wax flesh [body] | unrelenting ceremonial advance [behavior] | candle-melt vulnerability to flame [object]
[concept] identity: The Wax Abbot closes the fight with slow, ceremonious blows of its heavy candlestick-staff, trusting its body to absorb anything short of fire while it bends the flow of the melee toward itself. Every round it deliberately takes hits it can shrug off, letting blades and arrows sink in and reknit closed so opponents waste themselves against a foe that heals faster than they can cut until the fight is a slow attrition it always wins. It never flees and never gloats — it simply keeps advancing through its own ruin, patient as candle-melt, until the wounds it takes finally outlast the wax it has to spare — but any flame, holy or common, sends it recoiling and its careful patience shatters.
[concept] lore: Rendered from the tallow of a thousand votive candles in a monastery whose abbot died unmourned, the Wax Abbot walks the halls it once blessed, wanting only to finish a vespers service no living ear is left to hear.
[reskin] regeneration off-switch: Fire (the call read the GM's weakness clause as Fire ("unless it is burned"))
[reskin] donor: brute-5-regenerator -> CR 7
[reskin] implied class kept: "cleric" on the GM's own words "a wax abbot" — the key table found none
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a wax abbot": nothing to add — the sheet already answers it
[reskin] inline by rule: "the wax abbot" — the call answered "the wax abbot" (kind), which the name does not support
[reskin] inline form: "the wax abbot" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no living ear" quotes nothing the user typed
[reskin] lacks refused: "never gloat" quotes nothing the user typed
[reskin] lacks refused: "no longer flees" quotes nothing the user typed
[reskin] asked field dropped: "reknits itself unless it is burned" carries no trigger word, so the call's "on_being_hit" has no receipt in the GM's own clause
[reskin] asked field dropped: "reknits itself unless it is burned" carries no frequency word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "a wax abbot" -> has (descriptive), head | "reknits itself unless it is burned" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "The Wax Abbot dips its candlestick-staff into its own melting body, drawing up a long ribbon of burning tallow, then swings. Any creature the staff strikes is smeared with the burning wax and stays seared and stuck to that spot, so retreating only means dragging the fire along with it." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: hook-rider, coating, stunning-strike, charge-push, pounce — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The Wax Abbot dips its candlestick-staff into its own melting body, drawing up a long ribbon of burning tallow, then swings. Any creature the staff strikes is smeared with the burning wax and stays seared and stuck to that spot, so retreating only means dragging the fire along with it." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, coating)
[reskin] fallback skipped by the floor: push-prone (EV 2.3 vs 8.8)
[reskin] fallback skipped by the floor: herd (EV 6.6 vs 43.1)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whatever weapon or hand strikes the Wax Abbot comes away gummed with molten wax that keeps burning; anyone who hits it in close combat is smeared with clinging flame that must be endured before the next blow can be swung cleanly." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, warded-mending (burn, knits itself)
[reskin] word match declined by the call: heated-body, fire-aura, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered" after being shown heated-body, warded-mending, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for burn, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whatever weapon or hand strikes the Wax Abbot comes away gummed with molten wax that keeps burning; anyone who hits it in close combat is smeared with clinging flame that must be endured before the next blow can be swung cleanly." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, warded-mending, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, fire-aura)
[reskin] concept-first trait skipped: warded-mending — the GM's words key it, but the call was offered it against those words and declined
[reskin] repair: 1 clause(s) with no row — "reknits itself unless it is burned"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Candlestick-Staff = staff
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] defenses by material: a wax body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] vulnerability rejected — "Fire" is dealt, defended, or not a damage type
[reskin] audit rename: "Answering Sting" -> "Molten Retort"
```


---


### Fen Altar Troll — a print donor

**Concept:** a bog troll that crushes the drowned against the stones

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Fen Altar Troll | 6 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Rend: a Restrained rider on every hit with no save
- **dropped clause:** "crushes the drowned against the stones"
- read: def 4 / off 6 → 5; sustained 44 (2 × Rend); nova none; dmg 44

```
Fen Altar Troll

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

Regeneration. The altar troll regains 15 Hit Points at the start of each of its turns. If the altar troll takes Acid or Fire damage, this trait doesn't function on the altar troll's next turn. The altar troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the altar troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the altar troll's limbs is severed, falls into the altar troll's space, and becomes a Troll Limb. The limb acts immediately after the altar troll's turn. The altar troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The altar troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage. While Grappled, the target has the Restrained condition.

Bonus Actions

Charge. The altar troll moves up to half its Speed straight toward an enemy it can see.

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
- Bonus Actions/Charge — print's own row
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row

**Engine trace**

```
[route] brute-grappler type=Giant mechanics=grapple, engulf — brute-grappler: ✓ ("crushes the drowned against the stones") | brute-grappler: key "crushes" (class verb) | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] hints: grappler→style ✓ ("crushes the drowned against the stones") | troll→canon ✓ ("a bog troll")
[concept] resolve: archetype=brute type=Giant themes=aquatic mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: crushing the drowned against standing stones [behavior] | bog-troll hide grown rock-hard with silt [body] | the sunken altar-stones of the fen [object]
[concept] identity: The bog troll wades into the fight belly-deep, seizing the nearest body and dragging it toward the sunken altars of the fen. Every round it hauls a grabbed prey against the standing stones, grinding flesh between troll-hide and drowned rock until the bones give, then hurls the broken husk aside and reaches for the next. It does not tire and it does not flee — bloodied, it plants itself on the highest dry stone and dares the rest of the party to come within arm's reach.
[concept] lore: Born where a drowned congregation's bones silted into troll-flesh under the fen's black water, the bog troll keeps its stones scrubbed clean and piled with fresh dead, waiting for the next faithful to wade in.
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] donor: brute-5-grappler -> CR 6
[reskin] print canon: "a bog troll that crushes the drowned against the stones" heads on the Troll — print's rows ride along; the seat stays
[reskin] engulf engine: Entomb — the body's own verb
[reskin] inline declared: "the altar troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the altar troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a bog troll" -> has (descriptive), head | "crushes the drowned against the stones" -> has (mechanical)
[reskin] signature idea (action): "The troll rips a slab of standing stone out of the fen bed and drives it down onto everything in front of it, splintering the ground where it lands. Everyone caught in that crush is knocked off their feet and pinned under the rock; the slab stays as a broken heap of altar-stone in that spot, and the troll can wade back to it later to smother anyone still trapped beneath. It can only do this so oft" [action/save/movement] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, pull-through (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — condition-payoff, pull-through (crush, drown)
[reskin] word match declined by the call: exploiter, condition-payoff, pull-through, hook-drag — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown condition-payoff, pull-through, which the GM's words keyed
[reskin] key match declined: action — "condition-payoff" was ranked first on the call's own menu for crush, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The troll rips a slab of standing stone out of the fen bed and drives it down onto everything in front of it, splintering the ground where it lands. Everyone caught in that crush is knocked off their feet and pinned under the rock; the slab stays as a broken heap of altar-stone in that spot, and the troll can wade back to it later to smother anyone still trapped beneath. It can only do this so oft" [action/save/movement] — the model found no template that holds it (offered: condition-payoff, pull-through, swallow, leap, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter)
[reskin] fallback respects the call: condition-payoff, pull-through, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a bog troll that crushes the drowned against the stones" heads on the Troll and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Sundering Shove" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every wound the troll takes leaves thick silt and bog-water clinging to the blow, and whatever struck it drags that muck with it — the attacker's footing goes soft and heavy, slowing it to a wade. The fen keeps its own." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk, false-appearance (bog, stone)
[reskin] word match declined by the call: terrain-walk, false-appearance, bloodied-burst, aberrant-ground, bloodied-fury — the key word does not mean the mechanic here
[reskin] trait declined: "Clinging Silt" — bound only on the idea's own words (cling:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "crushes the drowned against the stones"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon attack: "Slam" -> "Rend" — the Troll's own row
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] print canon trait: Loathsome Limbs — "a bog troll that crushes the drowned against the stones" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Entomb" yields to the Troll's Charge
audit span not verbatim, dropped: Loathsome Limbs regains Hit Points. The limb acts immediately after the altar troll's turn.
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---


### Briarwarden of the Stones — one marked soft

**Concept:** a druid of the standing stones who calls the briars

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Briarwarden of the Stones | 6 | caster-6 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 82 is 22% under the card's 105
- bands · soft · band: reads CR 4 (print at 6 reads 3–8.5, n=42)
- read: def 2 / off 6 → 4; sustained 39 (3 × Verdant Wisp); nova none; dmg 39

```
Briarwarden of the Stones

Medium Humanoid, Neutral

AC 15
Initiative +1 (11)

HP 82 (15d8 + 15)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
18
+4
+7
MOD
SAVE
DEX
12
+1
+1
WIS
16
+3
+6
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

Skills Arcana +7, Perception +6

Senses Passive Perception 16

Languages Common, Druidic, Sylvan

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The briarwarden makes three Verdant Wisp attacks. It can replace one attack with a use of Thornbound Allure.

Verdant Wisp. Ranged Attack Roll: +7, range 120 ft. 13 (2d8 + 4) Radiant damage.

Spellcasting. The briarwarden casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Druidcraft, Speak with Animals
- 2/Day Each: Entangle, Thunderwave
- 1/Day Each: Animal Messenger, Longstrider, Moonbeam

Thornbound Allure. Wisdom Saving Throw: DC 14, one creature within 60 feet that can see or hear the briarwarden. Failure: The target has the Charmed condition until the start of the briarwarden's next turn, and while Charmed this way, it must move toward the briarwarden by the safest available route on its turn and can't take Reactions.

Bonus Actions

Divine Aid (3/Day). The briarwarden casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
- Actions/Verdant Wisp — print's own row, renamed; weapon lance
- Actions/Spellcasting — print's own row
- Actions/Thornbound Allure — library seed lure; the GM's clause "calls the briars"; binds the GM's words: call
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "a druid of the standing stones who calls the briars"

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=snare — caster: ✓ ("a druid of the standing stones who calls") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=verdant/arcane mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: snare
[concept] signature elements: calling forth briar thickets to bind and slow foes [behavior] | thorns and poisoned barbs thrown from behind the hedge [object] | the ward-stones of its druidic circle [object]
[concept] identity: The druid opens by seeding the ground with briars, planting a writhing thicket between itself and its foes while it works standing-stone wards into the soil. Each round after, it hurls druidic thorns and stone-ward blasts from behind its hedge, repositioning to keep the briars between itself and anyone who closes. Cornered or bloodied, it does not flee — it roots itself in the stone circle and calls the thorns to erupt beneath every enemy at once, fighting to the death in defense of its grove.
[concept] lore: A keeper of the old standing stones, the druid has bound its long life into the briar-choked ring it guards and answers trespass with a slow, patient overgrowth that leaves only thorns where intruders once stood.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] print canon array: STR 10, DEX 12, CON 13, INT 18, WIS 16, CHA 11 — the Druid's, INT fitted to +7
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a druid of the standing stones who calls the briars" heads on the Druid — print's rows ride along; the seat stays
[reskin] implied class kept: "cleric" on the GM's own words "a druid of the standing stones who calls the briars" — the key table found none
[reskin] class kit: cleric — "a druid of the standing stones who calls the briars": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] inline by rule: "the briarwarden" — the call answered "the stones" (kind), which the name does not support
[reskin] daily spell dropped — Blight (36 avg vs 14 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 15 off Intelligence 18 (the stat makes the attack rolls)
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "calls the briars" carries no trigger word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "a druid of the standing stones" -> has (descriptive), head | "calls the briars" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The briarwarden plants its staff and calls the thicket up through the whole ring of stones, so that clawing briars burst from the ground beneath every enemy it can see at once. Those caught in the eruption are snagged and held fast by the vines, dragging at their legs for as long as the druid keeps the call alive, and the wardens' stored thorns feed the growth. Releasing the call costs it the thic" [action/save/condition] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — lure, herd (call)
[reskin] word match declined by the call: snare-bolt — the key word does not mean the mechanic here
[reskin] signature miss: action — "The briarwarden plants its staff and calls the thicket up through the whole ring of stones, so that clawing briars burst from the ground beneath every enemy it can see at once. Those caught in the eruption are snagged and held fast by the vines, dragging at their legs for as long as the druid keeps the call alive, and the wardens' stored thorns feed the growth. Releasing the call costs it the thic" [action/save/condition] — the model picked "zone" (no verb, and it quotes nothing the GM typed) over a concept-verb template (lure, herd)
[reskin] fallback respects the call: snare-bolt left the shelf — the call declined it for this sheet
[reskin] value check: "Luring Presence" EV 7.7 vs floor 7.3 (one attack of 3) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The standing-stone circle answers its keeper: while the briarwarden stands among its stones, each ward-stone it has worked into the soil flares when it is struck, and the blow meant for the druid is partly drunk by the grove and repaid by the thorns." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The standing-stone circle answers its keeper: while the briarwarden stands among its stones, each ward-stone it has worked into the soil flares when it is struck, and the blow meant for the druid is partly drunk by the grove and repaid by the thorns." [trait/on_being_hit/damage] — the model found no template that holds it (offered: false-appearance, absorption, bloodied-burst, resonant-body)
[reskin] concept-first trait skipped: false-appearance — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Thorn Lance = none
[reskin] languages by mind: "Druidic" -> "Common, Druidic" (sapient)
[reskin] print canon languages: "Common, Druidic" -> "Common, Druidic, Sylvan" — the Druid's
[reskin] print canon attack: "Thorn Lance" -> "Verdant Wisp" — the Druid's own ranged row
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the seat's, not the Druid's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
[reskin] row binds its clause: "Luring Presence" answers "calls the briars" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Luring Presence" -> "Thornbound Allure"
```

