# The case for the critic — 2026-10-15

Twelve landings since the branch-confirm read of 2026-10-14. They are one thesis
with a measurement behind it, plus two arithmetic bugs the measurement exposed.
**The three questions we most want your read on are at the bottom**; they are
design calls, not defects, and an outside view is worth more than ours on each.

## The thesis

**A cue regex that has absorbed repeated patches is a question sitting in the
wrong layer.** Where an LLM call can judge meaning, it should answer as a field
on a call we already make; the deterministic layer proposes a fallback and
validates the answer against something closed.

The owner's test, verbatim: *"if we can ask llms specific questions to populate
metadata, that's the route we usually want to go unless the options to choose
from are too numerous and it dilutes the prompt"* — refined mid-sprint to:
*"on precise regex matches we may keep because they're cheap, but if we're piling
on fix after fix to accommodate an ever expanding number of edge cases, we need
some sort of metadata key to be returned."*

So the metric is **churn, not size**: `git log -L <line>,<line>:<file>` over all
164 cue constants in `reskin/` + `format-2024/`.

| patches | cue | what it was really asking | became |
|---|---|---|---|
| 10 + 9 | `JOB_TAIL` + `ROLE_HEAD` | is this two-word print name a family or one creature holding a post? | **a per-name label** on 119 names |
| 6 | `SPECTRAL_COMPOUNDS` | does "-fire" in a coined name mean Fire? | `name_element` on the call that declares the damage |
| 4 | `CASTER_WEAPON` | which weapon would a caster carry? | the weapon table's own columns |
| 4 | `ANAT_STAMP` | is this noun a body part? | the anatomy table |
| 1 | `NEG_CUE` | is the GM taking something away? | `polarity` on the clause object |

## What landed

**One weapon table.** The same fact — a shortsword is a finesse Piercing melee
weapon — was written in **twelve** places across six files, and the copies had
drifted: a Shortsword dealt Slashing because one copy only knew the word "sword",
and a "Hurlaxe" printed a longbow's 60/240 because none saw the axe inside the
coined word. Now one table, plus a `weapons` question on the call that already
names the rows. Eleven copies retired; `ANATOMY`'s weapon half is *derived*.

**`polarity: has | lacks`** on the `clauses` object the call already returns — no
new pass. `NEG_CUE` reads the *grammar* of negation and misread **13 of 17**
realistic phrasings ("it is blind", "eyeless", "born mute", "wingless", "lost its
wings" all read as HAS). Measured live: the call got **6 of 9** right on the first
run and every one of the six was a case the regex fails — but it smeared one
sentence's polarity across every clause in it and **deleted an ability the GM
asked for**. Fixed in the prompt (per clause; most clauses are "has") and in the
engine (a claimed lack must name the absence in its own words). 9/9 after.

**`name_element: literal | imagery`**, beside `damage_types`. Measuring first
reframed it: a *closed* compound never claimed anything (the word boundary blocks
it), so all six patches were adding **hyphen** spellings, and three of the eight
entries could never fire. print's real rule is about form — a fused element word
makes no claim, a standalone one does — so the engine checks the form and the
call judges the meaning. `imagery` is believed only on a fused word, so a bare
"Flame Lash" cannot dodge the gate.

**The 119 two-word print names, labelled.** This looked like an LLM question and
was not: it is a fact about a corpus that does not change between releases. No
word rule can be right anyway — the same tail is a post in one name and a kind in
another ("Bugbear Stalker" is a bugbear; an "Invisible Stalker" IS a stalker), and
a creature head does not imply a post ("Ogre Zombie" IS a zombie). Frozen from
the old rules' verdict, corrected in three places, and the freeze is **pinned by
re-deriving the old rules** — which caught our own table silently dropping two
names.

**One table for what a name promises.** `CONDITION_CLAIMS` (engine → repair call,
7 conditions) and `NAME_MECHANIC` (checker → fails the sheet, 10 claims) were one
question in two places, so the gate refused things the call was never asked to
fix. The late audit rename had the *element* vet since 2026-09-01 and never this
one — which is how "Lance Charge" and "Poisoned Blade" reached live sheets.

## Two arithmetic bugs the measurement exposed

Recorded because they are the opposite of the thesis — deterministic arithmetic no
call should ever be asked about.

**The legendary budget.** The solver's convergence loop counted a cost-1 legendary
strike **once** where its own seed, its own comment, and the checker count
**three**; and its filter ignored print's "can't take this action again" brake that
the checker honours. A CR 15 dragon shipped a 32-point bite where print's adult
dragons at CR 13–16 deal 17–21. High-CR `hot-offense` went **5 of 12 → 1**.

**The rider fold.** The print-canon melee pass deleted the chassis's rider clause
instead of folding it into the base, leaving the row at 60% of budget — "a dire
wolf" at CR 3 dealt 14 a round against a card of 25. Two wrong diagnoses first,
and the first fix was dead code because print's Dire Wolf rider is a *condition*,
not damage.

## The canaries were replaced

The old ten were **8/10 print-canon** — the most stable path in the engine — and
never touched species, class, any of the three bodies, casters, the legendary
tier (they stopped at CR 10), lacks clauses, thrown weapons, or rich authoring.
That is why this sprint's landings were all measured by ad-hoc batches, and why
the rider fold moved **zero** canary reads.

The new fourteen carry one axis each, print down to 3 of 14. On its first run it
found **2 FAILs on axes the old set could not reach**. A floor that reads
all-green on first use is not measuring anything.

## Our own misses, for your calibration

Three times print overruled **us**:

1. We reported an ooze as missing Poison immunity. Print's oozes are Poison-immune
   **0 of 4** — the *gate* was wrong, and `generate.mjs` already had it right.
2. We raised HP on seven donors to clear "print's floor" at CR 17. Print has
   **four** blocks at CR 17, all Celestial/Dragon, and **no lurker-shaped peer** —
   we were bounding a lurker by a dragon and overriding a measured sweep on a
   four-block sample. Five of the seven reverted.
3. The `inline-correctness` gate accepted only a contiguous **tail** of the name,
   and so **failed 7 of 7 printed swarms**: print names one "Swarm of Bats" and
   its own text says "the swarm", where swarm is the HEAD.

And twice our own fix was wrong until something caught it: the rider fold was
**dead code** for three runs (guarded on `pr.rider`, which the Dire Wolf's Prone
condition satisfies), and the inline fix normalized hyphens on the name side only,
so "Iron Line-Crasher" / "the line-crasher" still failed until a live run caught
what the pins had missed.

## The three questions we want your read on

**1. The lurker HP/mitigation trade.** Print's thin creatures are thin *because*
they are hard to hurt: print's thinnest CR 5 block is the Wraith at 67 HP, and it
resists Acid/Bludgeoning/Cold/Fire/Piercing/Slashing and is immune to Necrotic and
Poison. The thinnest CR 5 block with **no** mitigation is the Giant Crocodile at
**85**. Our lurker donors are thin with no mitigation at all. The measured lurker
sweep (2026-09-04) says `hp_scale <= 0.8` — 72 HP at CR 5. Two measured
constraints that cannot both hold. Do the thin lurkers get print's resistances, or
does the sweep's ceiling retire?

**2. The dpr card against print at the top.** The card asks **190** dpr at CR 17.
print's CR 17 blocks read **13–18.5 CR** from their actual damage, and after the
legendary fix our high tier runs 21–37% under the card while sitting *inside*
print's range. Which number is wrong — the card, or our reading of print? This is
parked for its own sprint; a view now would de-risk it.

**3. What should "tied to the concept" mean?** The checker reports a concept share
per block — rows tied to the GM's ask over all rows. Fresh runs read **0/4** on a
polarity canary, **2/6** on a species block, **1/8** on a 2014 legendary block.
The sheets are legal and clean and their rows have little to do with what was
typed. The old print-heavy canaries hid this, because a print creature's rows are
print's by definition and score high for free. We have not touched it because we
do not yet know what the metric *should* count — the clause record, the fit call's
bound keys, or the seat elements. We would rather have your read than guess.

**4. May the engine overrule a name the call chose?** The batch below has a live
case we deliberately did not fix. A CR 17 death knight shipped:

> *Damned Charge:* One creature within 5 feet must succeed on a DC 19 Strength
> saving throw or be pushed up to 15 feet away from Brannor and be knocked prone.

The new vet **fired** — `repair round 1: name "Damned Charge" promises movement
but the row never delivers it` — the repair call was asked, and it declined to
change anything. The sheet shipped and the checker failed it.

Print settles whether the gate is right: **4 of 4** print rows whose name says
charge/rush/stampede move the CREATURE (Troll, Xorn, Centaur Trooper, Sahuagin
Warrior). A push of the target is not a charge. So the gate is correct and the
name is wrong.

The engine could resolve this deterministically — revert that row to the chassis
name, which never over-claims, the way `audit rename blocked` already keeps a
standing name. We did not, because overriding a name the call chose is a taste
decision, not a correctness one. Should a name-claim defect that survives the
repair round be overruled, or should it ship and fail the gate?

## Gate

`npx jest` 2728 passed / 70 suites. `npm run build` clean.

Fresh runs in this batch: **canaries 2 FAIL of 14** (the lurker HP from question 1,
and the Damned Charge from question 4), **classes-eight 1 FAIL of 16**
(`multiattack-integrity` — a Multiattack naming "Tower Shield", which is the
dangling-reference family, third sighting this sprint).

---

# 2024 blocks

## Review batch — canaries-2026-10-15T22-14-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Hillmoot Crusher | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Echojack | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Unmoved | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Absent Regent | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Rolling Thunderwall | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/8 |
| Gilded Reliquary | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 5/5 |
| Swarm of Tollring Chorus | 13 | 2024 | swarm-9 | ok | ok | SOFT: swarm-multiattack | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/4 |
| Coinbound Sellsword | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Ash-Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/3 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Ashvowed Brannor | 17 (2014) | 2014 | defender-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/2 | 2/7 |
| Well-Drowned Thing | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |

**Dropped 3 of 18 user clauses** (coverage 83%); concept share 60% (38/63 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 1
- defender-17 / reader: 1



---


### Kobold — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kobold | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Kobold

Small Dragon, Neutral

AC 14
Initiative +2 (12)

HP 7 (3d6 - 3)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
WIS
7
-2
-2
MOD
SAVE
CON
9
-1
-1
CHA
8
-1
-1

Skills Perception +0, Stealth +4

Senses darkvision 30 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 6 (1d8 + 2) Piercing damage.

Bonus Actions

Vanish (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("Can turn invisible once per day") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: once-daily invisibility [behavior] | cowardly skirmishing [behavior] | scaled hide and stolen blades [body]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Once per day, the kobold slips out of sight and becomes unseen as if it had quietly vanished, its outline blurring into the background even while it moves and attacks. The effect lasts only a short while and ends early if the kobold strikes a foe or is hit; it can skitter, aim, and reposition invisibly, then use its next attack from hiding to catch an enemy off guard. This is its one stolen scrap " [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Stolen Scrap (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Stolen Scrap (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the kobold is bloodied, its nerve breaks and it instinctively turns invisible and runs. This fleeing invisibility is an instinctive panic response, not a controlled concealment, and it lasts just long enough to slip away toward its bolt-hole." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "When the kobold is bloodied, its nerve breaks and it instinctively turns invisible and runs. This fleeing invisibility is an instinctive panic response, not a controlled concealment, and it lasts just long enough to slip away toward its bolt-hole." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---


### Owlbear — a 2024 sheet

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

**Engine trace**

```
[route] brute type=Monstrosity mechanics=grapple — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: bone-crushing hug [behavior] | hooked beak and crushing forelimbs [body] | fused owl-bear hybrid [body]
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---


### Hillmoot Crusher — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hillmoot Crusher | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Hillmoot Crusher

Large Giant, Chaotic Evil

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+7
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+6
CHA
7
-2
-2

Skills Athletics +7, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Giant

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The crusher makes two attacks, using Club or Slam in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the crusher's next turn.

Slam. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the crusher's next turn.

Bonus Actions

Crushing Focus. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of the crusher's next turn, the target has Disadvantage on attack rolls against creatures other than the crusher.

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

**Engine trace**

```
[route] brute type=Giant mechanics=none — brute: ✓ ("big ogre with a club") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: massive club [object] | brutal melee brawling [behavior] | ogre toughness [body]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Crusher winds up and slams its club down with enough force to send smaller foes tumbling backward. Anyone caught in the impact is thrown away from the Crusher and lands prone." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature miss: action — "The Crusher winds up and slams its club down with enough force to send smaller foes tumbling backward. Anyone caught in the impact is thrown away from the Crusher and lands prone." [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, push-prone, wind-up)
[reskin] value check: "Binding Mark" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Crusher's club is so massive that every swing carries a shockwave, shaking the ground and rattling anyone nearby. Foes who try to stand their ground find it hard to keep balance." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The Crusher's club is so massive that every swing carries a shockwave, shaking the ground and rattling anyone nearby. Foes who try to stand their ground find it hard to keep balance." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---


### Rolling Thunderwall — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rolling Thunderwall | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- read: def 9 / off 21 → 15; sustained 150 (3 × Thunderclap Claw + legendary Echoing Claw); nova Thunderclap Breath 71; dmg 150

```
Rolling Thunderwall

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

Stormlash Scales. A creature that touches the thunderwall or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage.

Legendary Resistance (3/Day). If the thunderwall fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The thunderwall makes three Thunderclap Claw attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Thunderclap Claw. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Thunderclap Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The thunderwall casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Fear, Counterspell

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the thunderwall can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Echoing Claw. The thunderwall makes one Thunderclap Claw attack.

Wing Buffet. The thunderwall moves up to half its Speed without provoking Opportunity Attacks.

Clap Dive. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon") | dragon: key "dragon" (class body)
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-scaled hide crackling with lightning [body] | arrogant tempest-born temperament [aura]
[reskin] signature idea (action): "The thunderwall sweeps a claw through the air and hurls a crackling lance of lightning at a creature it can see, though the bolt must first pass through any thunder-wall the dragon has left on the field; a target standing inside a wall takes the bolt full in the chest, while one using the wall as cover is merely grazed. The lightning forks and leaps to another nearby creature standing in the same " [action/always/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "Thunder and lightning cling to the thunderwall's scales; whenever a creature lands a telling blow against the dragon in melee, the charge lashes back in a crackling arc, shocking the attacker and leaving them momentarily unable to hear anything but the dragon's roaring storm. A creature already deafened by the storm is not shocked a second time." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature template (trait): heated-body -> Traits/"Stormlash Scales" ("A creature that lands a melee hit on the thunderwall is shocked by the charge cl [verb: storm:concept, lightning:idea, shock:idea]")
[reskin] chassis nova: "Rolling Thunder-Wall Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Gilded Reliquary — one marked soft

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gilded Reliquary | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- **dropped clause:** "digests reliquaries and drips gilded acid"
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Gilded Reliquary

Medium Ooze, Unaligned

AC 11
Initiative -2 (8)

HP 165 (22d8 + 66)

Speed 10 ft., Climb 10 ft.

MOD
SAVE
STR
18
+4
+4
INT
1
-5
-5
MOD
SAVE
DEX
6
-2
-2
WIS
6
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
2
-4
-4

Resistances Acid, Cold, Fire

Immunities Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 60 ft. (blind beyond this radius), tremorsense 60 ft.; Passive Perception 8

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Aberrant Ground. The ground in a 10-foot Emanation originating from the reliquary is Difficult Terrain.

Amorphous. The reliquary can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the reliquary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The reliquary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The reliquary makes two Pseudopod attacks.

Pseudopod. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.

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

**Engine trace**

```
[route] ooze type=Ooze mechanics=none — ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] signature elements: digests reliquaries [behavior] | gilded acid drip [body] | cathedral-vault ambusher [behavior]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The reliquary drags a corpse, a fallen foe, or a heap of cathedral treasure partway into its own translucent body, then squeezes and churns until the swallowed relic or remains burst, spraying everyone nearby with a fan of gilded acid. The payload can be a sacred object it has already absorbed, meaning the ooze always carries one last gulp of dissolved reliquary to weaponize." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] signature miss: action — "The reliquary drags a corpse, a fallen foe, or a heap of cathedral treasure partway into its own translucent body, then squeezes and churns until the swallowed relic or remains burst, spraying everyone nearby with a fan of gilded acid. The payload can be a sacred object it has already absorbed, meaning the ooze always carries one last gulp of dissolved reliquary to weaponize." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, charge, thrown-burst, ground-burst)
[reskin] signature idea (trait): "Anything the reliquary has dissolved leaves its mark: wounds it opens, and the armor or hide it scrapes with each pseudopod, start gleaming with a thin gold crust that thickens the longer the fight runs. That gold stays on the victim and clings to whatever it touches, so the ooze's gilded acid follows its prey and keeps rediscovering it." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature bound by force: trait — "aberrant-ground" matches ooze in the user's words; the model's none is overruled
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("exact concept match [verb: ooze:concept]")
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon alignment: Neutral -> Unaligned — the Gray Ooze's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon attack: "Gilded Pseudopod" -> "Pseudopod" — the Gray Ooze's own row
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---


### Ash-Stalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ash-Stalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 38 (2 × Hooked Claw); nova none; dmg 38

```
Ash-Stalker

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Poison damage.

Actions

Multiattack. The stalker makes two Hooked Claw attacks.

Hooked Claw. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Poison damage. If no creature other than the stalker is within 5 feet of the target, the target takes an extra 9 (2d8) Poison damage.

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

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("tracks prey by scent alone") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: hunts by scent, not sight [behavior] | opening pounce from invisibility [behavior] | chitin and venom [body]
[reskin] signature idea (action): "When the stalker strikes a wounded creature, it uses its hooked claws to pin the creature against the ground, locking it in place. The pinned prey cannot escape while the stalker holds it, but the stalker cannot attack anything else until the hold is broken." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus, isolation
[reskin] signature rider: isolation -> Hooked Claw (appended; the hunter's mechanic is the lone target — prey that stands apart from its pack  [verb: alone:concept])
[reskin] signature idea (trait): "The stalker's scent-glands constantly leak a numbing musk that deadens the senses of nearby creatures. Any living creature that starts its turn close to the stalker finds its reactions slowed and its movements clumsy." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature miss: trait — "The stalker's scent-glands constantly leak a numbing musk that deadens the senses of nearby creatures. Any living creature that starts its turn close to the stalker finds its reactions slowed and its movements clumsy." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---


### Echojack — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Echojack | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Echojack

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

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

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Speaks only in stolen voices

CR 3 (XP 700; PB +2)

Traits

Mimicry. Echojack can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Unseen Step. Echojack ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Echojack makes two attacks, using Dagger or Throwing Dagger in any combination. It can replace one attack with a use of Luring Presence.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Throwing Dagger. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Luring Presence. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear Echojack. Failure: The target has the Charmed condition until the start of Echojack's next turn, and while Charmed this way, it must move toward Echojack by the safest available route on its turn.

Bonus Actions

Cunning Action. Echojack takes the Dash, Disengage, or Hide action.

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

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a kenku thief who speaks only in stolen ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: stolen voices recycled as lures [behavior] | thief's blade and thrown knives [object] | kenku body of blood and feather [body]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Echojack throws its voice into a perfect imitation of a dying companion, a panicked warning, or a command from a trusted leader, choosing one enemy who can hear it. That enemy is compelled to spin toward the sound and lunge a few steps after it, dropping its guard and giving Echojack or its allies a free opening. The trick only works once per foe, and the same voice can never be used on the same t" [action/save/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "Echojack throws its voice into a perfect imitation of a dying companion, a panicked warning, or a command from a trusted leader, choosing one enemy who can hear it. That enemy is compelled to spin toward the sound and lunge a few steps after it, dropping its guard and giving Echojack or its allies a free opening. The trick only works once per foe, and the same voice can never be used on the same t" [action/save/condition] — the model found no template that holds it (offered: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, feint-slip, riposte)
[reskin] value check: "Luring Presence" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The first time Echojack is badly wounded, its stolen voices spill out in a chorus of borrowed screams and death rattles. Every enemy nearby that can hear it hesitates, mistaking the cry for one of their own, and Echojack slips away into the nearest crowd before anyone can react." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The first time Echojack is badly wounded, its stolen voices spill out in a chorus of borrowed screams and death rattles. Every enemy nearby that can hear it hesitates, mistaking the cry for one of their own, and Echojack slips away into the nearest crowd before anyone can react." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury, uncanny-sense, death-burst)
[reskin] species kit: Auran — the kenku's own
```


---


### Unmoved — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmoved | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Unmoved

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

Multiattack. Unmoved makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Unmoved's next turn.

Spellcasting. Unmoved casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). Unmoved casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace and no magi") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: iron-shod mace and tower shield [object] | holds the line, punishes anyone who moves past [behavior] | faith shattered, swings anyway [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Instead of attacking, the Templar plants his feet, sets his tower shield across his body, and dares the field to move past him. Until he breaks his stance, he watches a stretch of ground before him like a gate he has sworn to hold: anyone who tries to cross that line without first beating his guard gets a mace head slammed into them as they come, and anyone already inside it finds every step punis" [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Instead of attacking, the Templar plants his feet, sets his tower shield across his body, and dares the field to move past him. Until he breaks his stance, he watches a stretch of ground before him like a gate he has sworn to hold: anyone who tries to cross that line without first beating his guard gets a mace head slammed into them as they come, and anyone already inside it finds every step punis" [action/always/movement] — the model found no template that holds it (offered: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse, own-turn-punisher, rally)
[reskin] value check: "Disarming Twist" EV 0 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The Templar's iron-shod mace and tower shield are one weapon and one wall, so a strike that dents a shield leaves the arm behind it numb and heavy. Whenever he lands a telling blow, the weight of that blow lingers in the target's guard, making the next thing they try to do with that arm come slower and weaker." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The Templar's iron-shod mace and tower shield are one weapon and one wall, so a strike that dents a shield leaves the arm behind it numb and heavy. Whenever he lands a telling blow, the weight of that blow lingers in the target's guard, making the next thing they try to do with that arm come slower and weaker." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---


### Absent Regent — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Absent Regent | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Scepter Strike); nova none; dmg 36

```
Absent Regent

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

Evasion. If the regent is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the regent instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The regent makes three Scepter Strike attacks.

Scepter Strike. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. The regent casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The regent casts Misty Step, using the same spellcasting ability as Spellcasting.

Evasive Step (2/Day). The regent teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The regent is hit by an attack roll. Response: The regent casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: never where the blow lands [behavior] | steps away through folded space [behavior] | courtly bearing and wizardly mind [body]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The regent marks one enemy it can see, and for a short while that enemy becomes the only thing it cares about—whenever the marked foe tries to move away or attack anyone else, the regent blinks through folded space to appear right beside it and punishes the lapse with a strike that leaves the target doubting its own position. This mark ends when the regent marks someone new or when the marked crea" [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into phase-slip
[reskin] value check: "Evasive Step (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Evasive Step (2/Day)" ("the regent is never where you struck and steps away — teleporting on a bonus act [verb: step:concept, blink:idea]")
[reskin] signature idea (trait): "The regent's courtly mind turns every miss into a lesson in geometry: each time an attacker fails to hit it, the regent learns the arc of that failure and the next strike it makes against that same attacker cannot be avoided by anything short of a perfect dodge, because it has already been where the attack will be." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "The regent's courtly mind turns every miss into a lesson in geometry: each time an attacker fails to hit it, the regent learns the arc of that failure and the next strike it makes against that same attacker cannot be avoided by anything short of a perfect dodge, because it has already been where the attack will be." [trait/always/condition] — the model found no template that holds it (offered: evasion)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Swarm of Tollring Chorus — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Tollring Chorus | 13 | swarm-9 | ok | ok | SOFT: swarm-multiattack | ok | ok | ok | ok | ok | ok |

- structure · soft · swarm-multiattack: a swarm with a Multiattack (print swarms make one attack)
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (2 × Clapper); nova Tollring Knell 45; dmg 90

```
Swarm of Tollring Chorus

Medium Swarm of Tiny Constructs, Neutral

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

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

Senses darkvision 60 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Resonant Body. A creature that hits the swarm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Clapper attacks.

Clapper. Melee Attack Roll: +10, reach 5 ft. 45 (9d8 + 5) Bludgeoning damage, or 14 (4d6) Bludgeoning damage if the swarm is Bloodied.

Tollring Knell (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

**Engine trace**

```
[route] swarm type=Construct mechanics=aura — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] signature elements: ringing over the dying [behavior] | swarm of animated funeral bells [body] | deafening death knell [aura]
[reskin] signature idea (action): "The swarm rings a single, shattering knell meant for the dying. Every living creature near it—friend or foe alike—is overwhelmed by the deafening toll, left reeling and unable to hear anything but the bell for a time. It can share the burden: the ringing is loudest for those already wounded, so the closer a creature is to death, the more it hurts and the longer the silence lasts." [action/save/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] value check: "Tollring Knell (Recharge 5-6)" EV 119.3 vs floor 76.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Tollring Knell (Recharge 5-6)" ("The swarm rings a shattering knell at the dying; the ability's verb is ring/toll [verb: ring:concept, bell:concept, toll:idea, deafen:idea, knell:idea]")
[reskin] signature idea (trait): "Whenever a creature dies within earshot of the swarm, the bells seize the moment of passage and answer with a hungry echo, their ringing growing stronger and more relentless for a short while. Each death it witnesses empowers the swarm, so a battlefield of the fallen makes it deadlier still." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (bell, dying, the dying)
[reskin] signature miss: trait — "Whenever a creature dies within earshot of the swarm, the bells seize the moment of passage and answer with a hungry echo, their ringing growing stronger and more relentless for a short while. Each death it witnesses empowers the swarm, so a battlefield of the fallen makes it deadlier still." [trait/always/damage] — the model found no template that holds it (offered: bloodied-burst)
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: bell:concept]")
```


---


### Coinbound Sellsword — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coinbound Sellsword | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Hurlaxe Burst 28; dmg 47

```
Coinbound Sellsword

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

Multiattack. Sellsword makes two attacks, using Shortsword or Hurlaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and Sellsword has Advantage on its next attack roll against the target before the end of its next turn.

Hurlaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Hurlaxe Burst (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling a handaxe [behavior] | closing with a shortsword [behavior] | handaxe [object]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "When the sellsword hurls a handaxe at a foe, the throw can also pin the target's gear or clothing to a nearby surface, immediately anchoring them in place until they wrench free. If no such surface is within a stride, the axe's flight instead skips low across the ground and rebounds back to the sellsword's hand, ready for the next exchange." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into thrown-burst-seed
[reskin] value check: "Hurlaxe Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] signature template: thrown-burst-seed -> Actions/"Hurlaxe Burst (Recharge 5-6)" ("the sellsword hurls a handaxe; that thrown attack bursts into slashing damage in [verb: hurl:concept, throw:idea]")
[reskin] signature idea (trait): "A thrower's rhythm guides the sellsword's arm: after landing a thrown handaxe, the next shortsword strike against that same foe comes faster and harder, as if the axe's arc carried the blade behind it. This edge fades if the sellsword turns its attention elsewhere." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "A thrower's rhythm guides the sellsword's arm: after landing a thrown handaxe, the next shortsword strike against that same foe comes faster and harder, as if the axe's arc carried the blade behind it. This edge fades if the sellsword turns its attention elsewhere." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Hurlaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Loose Stride" is the seat's, not the Warrior Veteran's
```


---


### Well-Drowned Thing — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well-Drowned Thing | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Maw); nova none; dmg 38

```
Well-Drowned Thing

Medium Aberration, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Swim 10 ft.

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

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Caustic Sheen. A creature that touches the drowned thing or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Acid damage.

Actions

Multiattack. The drowned thing makes two Maw attacks. It can replace one attack with a use of Brackish Drain.

Maw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the drowned thing), reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Brackish Drain. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 18 (4d8) Acid damage, and the drowned thing regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The drowned thing shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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

**Engine trace**

```
[route] lurker-trap type=Aberration mechanics=grapple — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: lurking at the bottom of a well [body] | explosive vertical lunge from the water [behavior] | dragging prey down into the flooded dark [behavior]
[reskin] signature idea (action): "The well-drowned thing vomits a choking gout of black, briny brine mixed with its own bile up and outward at everything clustered near the rim or gathered around it. The slick fluid clings and burns flesh and corrodes metal, leaving the ground beneath its well treacherous, and the creature fights best when prey is caught in that spreading, acidic mire." [action/always/damage] — menu: swallow, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: leap, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The creature's body sweats a sheen of the same caustic well-water, so that anything that bites it, grapples it, or presses close against its hide is scalded by the residue and left slick and weakened in the same moment. The wet dark at the bottom of its shaft is its element, and the fluid always clings to attackers as readily as it clings to the thing itself." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Caustic Sheen" ("Anything that bites it, grapples it, or presses close against its hide is scalde [verb: scald:idea]")
```


---

## Review batch — classes-eight-2026-10-15T22-19-18

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Palm Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Rookery Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/7 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sarn Feldmark | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Kargath Stonewroth | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Brother Aldous | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Veyr Sable | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Oathmender Marisel | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/6 |
| Kurohaba | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/7 |
| Frostmaw Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Lockpick Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Maze Warden | 6 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/8 |
| Shield Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 1/1 | 3/4 |
| Wary Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 61% (51/83 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / reader: 1



---


### Frostmaw Pack — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Frostmaw Pack | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Frostmaw Pack

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

Pack Tactics. The pack has Advantage on an attack roll against a creature if at least one of the pack's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The pack makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Predatory Focus (2/Day). The pack has Advantage on the next attack roll it makes before the end of its turn.

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

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: coordinated pack tactics: one wolf darts in and out while others flank and delay [behavior] | frozen northern hide and chilling breath [body] | the encircling howl that signals the hunt [aura]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "When the pack strikes, it does not strike as one but as a rotating wheel: each wolf lunges in at the target's flank, slashes, then peels back so the next can take its place before the prey can turn to face the new threat. Until the pack's next turn, the wounded quarry staggers off-balance, its footing unsure and its attention dragged in two directions at once." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Predatory Focus (2/Day)" ("the pack's own verb is 'hunt' — it focuses its hunt into Advantage on its next a [verb: hunt:concept]")
[reskin] signature idea (trait): "The pack's breath carries the killing cold of the northern reaches, and any creature that stays within the pack's encirclement feels the frost sinking into its limbs — slowing its reactions, stiffening its muscles, and making every moment in the ring feel like standing in a blizzard." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "The pack's breath carries the killing cold of the northern reaches, and any creature that stays within the pack's encirclement feels the frost sinking into its limbs — slowing its reactions, stiffening its muscles, and making every moment in the ring feel like standing in a blizzard." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
```


---


### Oathmender Marisel — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathmender Marisel | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "smites the unclean"
- read: def 6 / off 8 → 7; sustained 54 (3 × Consecrated Blade); nova none; dmg 54

```
Oathmender Marisel

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

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Marisel, Marisel and its allies have Advantage on attack rolls and saving throws, provided Marisel doesn't have the Incapacitated condition.

Actions

Multiattack. Marisel makes three attacks, using Consecrated Blade or Heavy Oathblow in any combination.

Consecrated Blade. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Heavy Oathblow. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Marisel touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Marisel charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Slashing damage.

Mending Oathpulse (2/Day). Each ally within 30 feet of Marisel gains 9 (2d8) Temporary Hit Points.

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

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: smites the unclean [behavior] | mends her soldiers [behavior] | oathsworn iron zeal [aura]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "Marisel drives her consecrated blade into the ground at her feet, and the iron of her oath rings out through the earth to every soldier sworn to her banner. Each ally who can see or hear her feels the mending surge through their wounds, closing cuts and steadying their stance, while the unclean caught in the same pulse flinch back as if the ground itself rejects them. The wound-knitting is the tru" [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] value check: "Mending Oathpulse (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Mending Oathpulse (2/Day)" ("The wound-knitting is the true effect: an oath-ring pulse that mends each ally s [verb: mend:concept]")
[reskin] signature idea (trait): "Once Marisel has marked an unclean creature with her smite, she will not let it slip the field alive — her next blow against that same foe carries the weight of her broken altar and every oath she has sworn since. The mark fades only when the creature falls or she does." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Once Marisel has marked an unclean creature with her smite, she will not let it slip the field alive — her next blow against that same foe carries the weight of her broken altar and every oath she has sworn since. The mark fades only when the creature falls or she does." [trait/always/damage] — the model found no template that holds it (offered: warded-mending)
```


---


### Drowned Palm Adept — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Palm Adept | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Drowned Palm Adept

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

Hold Breath. The adept can hold its breath for 15 minutes.

Swamp Skulker. The adept ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The adept makes two attacks, using Open Palm or Finger Dart in any combination. It can replace one attack with a use of Opportunist's Lash.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the adept's next turn.

Finger Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Opportunist's Lash. Strength Saving Throw: DC 13, one creature within 30 feet that is Stunned. Failure: 14 (4d6) Piercing damage. Success: Half damage.

Bonus Actions

Fleet Agility. The adept takes the Dash or Disengage action.

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

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pressure-point strikes that paralyze and weaken [behavior] | open-hand martial arts with bone-hardened palms [body] | lizardfolk swamp monk training [behavior]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "The adept reaches out and presses its open palm against a creature, momentarily sealing its flow of breath and motion. Until the end of the adept's next turn, that creature cannot willingly move from its current spot and has trouble drawing on its own strength or speed." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into riposte
[reskin] signature miss: action — "The adept reaches out and presses its open palm against a creature, momentarily sealing its flow of breath and motion. Until the end of the adept's next turn, that creature cannot willingly move from its current spot and has trouble drawing on its own strength or speed." [rider/on_hit/condition] — the model found no template that holds it (offered: riposte)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The adept has learned to read the small tells of a body in pain. Whenever it lands a strike against a creature already reeling from its pressure-point work, the adept's next attack against that same creature slips past its guard more easily." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The adept has learned to read the small tells of a body in pain. Whenever it lands a strike against a creature already reeling from its pressure-point work, the adept's next attack against that same creature slips past its guard more easily." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---


### Rookery Stalker — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rookery Stalker | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Rookery Stalker

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

Faultless Tracker. The stalker knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasive Stride. The stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The stalker makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The stalker takes the Dash, Disengage, or Hide action.

Predatory Focus (2/Day). The stalker has Advantage on the next attack roll it makes before the end of its turn.

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

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: stalking the rooftops of the old quarter [behavior] | infernal blood granting unnatural stealth and teleportation [body] | a brace of poisoned throwing knives [object]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The stalker marks the most wounded enemy it can see as its prey and vanishes into the shadows of the rooftops, then reappears somewhere along the skyline to hurl a blade at that marked target. Until the hunt ends, the stalker knows exactly where its prey is and can slip through the cracks of the old quarter to close in on it, no matter how far it runs." [action/always/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] signature miss: action — "The stalker marks the most wounded enemy it can see as its prey and vanishes into the shadows of the rooftops, then reappears somewhere along the skyline to hurl a blade at that marked target. Until the hunt ends, the stalker knows exactly where its prey is and can slip through the cracks of the old quarter to close in on it, no matter how far it runs." [action/always/condition] — the model found no template that holds it (offered: focus)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Infernal blood lets the stalker taste a foe's fear on the wind; whenever a creature within the old quarter is wounded and tries to run or hide from it, the stalker senses the spilling blood and instinctively knows the direction and distance to that prey, even through walls and rooftops." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("The stalker senses spilling blood and instinctively knows the direction and dist [verb: stalks:concept, stalk:concept]")
[reskin] print canon alignment: Lawful Evil -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Poisoned Dagger" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Thrown Knife" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Sentinel" [catalog: uncanny-sense]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Sentinel: The stalker can pinpoint the location of moving creatures within 60 feet of itself.
provenance: catalog template "uncanny-sense"
```


---


### Maze Warden — a homebrew with a nova

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Maze Warden | 6 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 33 (3 × Gore); nova Hurl Spear 33; dmg 44

```
Maze Warden

Large Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 102 (12d10 + 36)

Speed 50 ft.

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
18
+4
+7
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

Skills Perception +5, Stealth +7

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the warden has Advantage on attack rolls and saving throws.

Labyrinth Stride. The warden ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The warden makes three attacks, using Gore or Spear in any combination. It can replace one attack with a use of Impaling Strike.

Gore. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage.

Spear. Ranged Attack Roll: +7, range 20/60 ft. 8 (1d8 + 4) Piercing damage. Hit or Miss: Immediately after the attack, a spear returns to the warden's grasp.

Hurl Spear (Recharge 5-6). The warden hurls a spear at a point it can see within 90 feet. Dexterity Saving Throw: DC 14, each creature in a 5-foot-radius Sphere centered on that point. Failure: 33 (6d10) Piercing damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Impaling Strike. Strength Saving Throw: DC 14, one creature within 30 feet that is Prone. Failure: 9 (2d8) Piercing damage. Success: Half damage.

Bonus Actions

Fleet Agility. The warden takes the Dash or Disengage action.

Charge. The warden moves up to half its Speed straight toward an enemy it can see.

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

**Engine trace**

```
[route] skirmisher-hurler type=Monstrosity mechanics=thrown-weapon, snare — skirmisher-hurler: ✓ ("herds prey into the maze") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: herds prey into maze dead ends [behavior] | thrown nets and hunting spears [object] | bone-horned minotaur reaver [body]
[reskin] nova capped: "Hurled Burst" 36 → 33 (the chassis nova obeys the cap: 33 at CR 6)
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] signature idea (action): "The warden picks its moment and rakes a broad arc of broken ground with its horns, turning a straight corridor into a churned funnel. Anyone caught in the sweep is hooked, shoved, and dragged a short way along the path the warden chooses, which is always deeper into the maze or away from the group. The move keys off the fear already seeded by its spears: a herd that scatters at the mouth of a pass" [action/save/movement] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Opportunist's Lash" EV 7 vs floor 5.7 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The labyrinth has no map the warden needs: once it has drawn blood from a creature, it always knows the shortest twisting route to that creature while both are in the maze, reading turns and dead ends as if they were painted on the inside of its skull. It cannot be shaken by fleeing, doubling back, or hiding in a side passage it has already claimed." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] chassis nova: "Hurl Spear (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Shieldwall Bulwark (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

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

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] signature elements: holds the line with shield and longsword [behavior] | punishes anyone who tries to move past [behavior] | iron shield and blade [object]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "When Dame Oriel plants her shield, she becomes an unbreakable anchor on the battlefield. Enemies within her reach find their movement suddenly arrested as if they struck an invisible wall, forced to stop and face her. This effect lasts until she lowers her shield or is forced to move, turning her into a living barricade that enemies must either break or go around." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Shieldwall Bulwark (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Shieldwall Bulwark (2/Day)" ("protecting allies with the shield grants them temporary hit points [verb: shield:concept]")
[reskin] signature idea (trait): "Dame Oriel's … is not just defense; it is a weapon of control. Whenever she blocks an attack with her …, the force of the blow is redirected into a punishing counter that leaves her attacker exposed and off-balance. Even in defeat, her stance remains a threat." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Dame Oriel's … is not just defense; it is a weapon of control. Whenever she blocks an attack with her …, the force of the blow is redirected into a punishing counter that leaves her attacker exposed and off-balance. Even in defeat, her stance remains a threat." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
```


---


### Kargath Stonewroth — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kargath Stonewroth | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Maul); nova none; dmg 54

```
Kargath Stonewroth

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Kargath starts its turn Bloodied, roll 1d6. On a 6, Kargath goes berserk. On each of its turns while berserk, Kargath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Kargath attacks an object. Once Kargath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Kargath has Advantage on attack rolls and saving throws.

Glacier Stride. Difficult Terrain composed of ice or snow doesn't cost Kargath extra movement, and Kargath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Kargath makes two attacks, using Maul or Boulder in any combination.

Maul. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Boulder. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Avalanche Charge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Kargath moves up to half its Speed without provoking Opportunity Attacks, and it makes one Maul attack.

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

**Engine trace**

```
[route] brute type=Giant mechanics=none — brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: lash out when wounded [behavior] | stone-hardened body [body] | massive stone maul [object]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "When an enemy's blow lands on Kargath, its mountain heritage answers in kind: it swings its maul in a wide, punishing arc at that attacker, heedless of defence. This lash comes without thought and can reward only the first coward bold enough to wound it in that moment." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage (wound)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rampage
[reskin] signature miss: action — "When an enemy's blow lands on Kargath, its mountain heritage answers in kind: it swings its maul in a wide, punishing arc at that attacker, heedless of defence. This lash comes without thought and can reward only the first coward bold enough to wound it in that moment." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rampage)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The instant Kargath's rage takes hold, the stone in its blood hardens its hide. While that frenzy lasts, weapons that strike it turn aside as if against granite, and even magic struggles to find purchase." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "The instant Kargath's rage takes hold, the stone in its blood hardens its hide. While that frenzy lasts, weapons that strike it turn aside as if against granite, and even magic struggles to find purchase." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst)
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Maul" reach 10 -> 5 ft. — reach follows the goliath's size
```


---


### Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 104 (19d8 + 19)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
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
12
+1
+1
CHA
13
+1
+1

Skills Perception +6, Stealth +7

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language, Celestial

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Dawn Blessing (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] signature elements: blessing her soldiers with radiant dawn-prayers [behavior] | iron-shod shield and mace [object] | the Dawn Antiphon chant that mends and ignites [aura]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth sweeps her shield low and speaks a prayer over the wounded. One bloodied soldier of her choice is wreathed in morning light: their open wounds knit shut, and the next time that soldier lands a blow, a crack of dawnfire leaps from the wound, burning the enemy for radiant damage. The blessing lingers until the soldier strikes or until the sun next rises." [action/always/resource] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Dawn Blessing (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Dawn Blessing (2/Day)" ("A templar priest who blesses her soldiers, granting them protection in battle; t [verb: blessing:concept, bless:concept, shield:idea, prayer:idea]")
[reskin] signature idea (trait): "Whoever dares to strike Vareth in melee and draws her attention is repaid by the iron edge of her shield, and the blow they land staggers them just enough that her own next swing against them comes faster and truer. The rebuke only reaches those who close within arm's reach, never those who fight her at range." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whoever dares to strike Vareth in melee and draws her attention is repaid by the iron edge of her shield, and the blow they land staggers them just enough that her own next swing against them comes faster and truer. The rebuke only reaches those who close within arm's reach, never those who fight her at range." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Shield Cast" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Shielded Advance" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage. If the target is within 30 feet of an ally of Vareth, the attack deals an extra 5 (2d4) Radiant damage.
provenance: none — the call wrote the text itself
```


---


### Brother Aldous — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Aldous | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Brother Aldous

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

Multiattack. Aldous makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Aldous's next turn.

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

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: shield-first line holding [behavior] | mace and battered iron plate [object] | vow of silence and poverty [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Aldous plants his feet and drives his shield forward in a straight, brutal line. Anyone directly in front of him is thrown back and left stumbling, and the shove of the shield carries Aldous right behind it, so he ends up exactly where the line needs him—blocking the gap, body between the enemy and whatever he is sworn to hold." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] value check: "Disarming Twist" EV 0 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When Aldous is hurt, his battered plate and dented helm bind tighter instead of breaking. Each wound makes him more deliberate and harder to move off his ground, so the longer the fight drags, the more the doorway belongs to him." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "When Aldous is hurt, his battered plate and dented helm bind tighter instead of breaking. Each wound makes him more deliberate and harder to move off his ground, so the longer the fight drags, the more the doorway belongs to him." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Rock" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---


### Veyr Sable — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Veyr Sable | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Shade Dagger); nova none; dmg 36

```
Veyr Sable

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

Multiattack. Veyr makes three Shade Dagger attacks.

Shade Dagger. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 12 (2d8 + 3) Piercing damage.

Spellcasting. Veyr casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Veyr casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). Veyr teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Veyr is hit by an attack roll. Response: Veyr casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("never where you struck") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: stepping away from any strike [behavior] | shadow-stuff body that lingers after teleport [body] | dagger of hardened shade [object]
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "When Veyr steps away by shadow, he can leave behind a copy of himself woven from the darkness he passes through. This double stands where he last was, draws the next blow meant for him, and then dissolves into shreds of shade that lash out at anyone foolish enough to strike it. It lasts only long enough to fool one attacker into overcommitting before it scatters and Veyr is already gone." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into phase-slip
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" ("the concept's own verb (step) is exactly the template's verb: a wizard who is ne [verb: step:concept, shadow:idea]")
[reskin] signature idea (trait): "Every time Veyr slips through a shadow to escape a hit, the seam of darkness he passes through clings to him for a breath, making him harder to pin down until the start of his next turn. Those who swing at where he was feel their weapon drag through that clinging shade, throwing off their next strike." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Every time Veyr slips through a shadow to escape a hit, the seam of darkness he passes through clings to him for a breath, making him harder to pin down until the start of his next turn. Those who swing at where he was feel their weapon drag through that clinging shade, throwing off their next strike." [trait/on_being_hit/defense] — the model found no template that holds it (offered: evasion)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Kurohaba — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kurohaba | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

```
Kurohaba

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 50 ft.

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

Evasion. If Kurohaba is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kurohaba instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Kurohaba has Advantage on attack rolls against any creature that hasn't taken a turn. If Kurohaba hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadow Step. Kurohaba ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kurohaba makes two attacks, using Tanto or Shuriken in any combination.

Tanto. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kurohaba takes the Dash, Disengage, or Hide action.

Shadow Blink (Recharge 4-6). Kurohaba teleports up to 40 feet to an unoccupied space it can see.

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

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("a ninja who moves through the shadows an") | skirmisher-skulker: key "unseen" (class verb)
[concept] signature elements: shadow-teleport behind enemies [behavior] | poisoned blade [object] | shadow-flesh body [body]
[reskin] signature idea (action): "Kurohaba slashes with a tanto coated in shadow-venom that clings to the wound. A creature struck by this attack is marked by lingering poison; while marked, it cannot benefit from being hidden from Kurohaba, and Kurohaba always knows its exact location. The mark lasts until the creature receives magical healing or finishes a short rest." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — blink, self-invisibility (shadow, unseen)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into blink, self-invisibility
[reskin] value check: "Shadow Blink (Recharge 4-6)" EV 3.5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: blink -> Bonus Actions/"Shadow Blink (Recharge 4-6)" ("The idea is a ninja who moves through the shadows, striking unseen — the shadow  [verb: shadow:concept]")
[reskin] signature idea (trait): "Kurohaba can blend into any …, even those cast by creatures. While in dim light or darkness, it can take the Hide action even when observed, and its first attack from hiding each round deals extra poison damage. This poison also silences the victim, preventing them from calling out for help until the end of their next turn." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "Kurohaba can blend into any …, even those cast by creatures. While in dim light or darkness, it can take the Hide action even when observed, and its first attack from hiding each round deals extra poison damage. This poison also silences the victim, preventing them from calling out for help until the end of their next turn." [trait/always/damage] — the model found no template that holds it (offered: assassinate)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---


### Lockpick Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lockpick Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 6 → 4; sustained 40 (2 × Sting); nova none; dmg 40

```
Lockpick Imp

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 76 (17d6 + 17)

Speed 20 ft., Fly 40 ft.

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

Magic Resistance. The imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The imp takes the Disengage or Hide action.

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

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: shadowy stiletto strikes from hiding [behavior] | master lockpick and trap-disarmer [object] | fearful bargainer when cornered [behavior]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The imp marks a single creature as its prey, slipping its stiletto into the target's shadow instead of its body. The prey feels a cold point press against its own shadow at all times, and when it starts its turn with the imp unseen by it, the waiting blade springs—poison bleeding through the link as if struck from behind. The imp can keep this mark on only one creature, and it drops if the imp is " [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The imp marks a single creature as its prey, slipping its stiletto into the target's shadow instead of its body. The prey feels a cold point press against its own shadow at all times, and when it starts its turn with the imp unseen by it, the waiting blade springs—poison bleeding through the link as if struck from behind. The imp can keep this mark on only one creature, and it drops if the imp is " [trait/start_of_turn/damage] — the model found no template that holds it (offered: fire-aura, warded-mending, delayed-brand, leap, patient-defense, aggro-curse, self-invisibility, feint-slip, coating)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.3 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanish (1/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "No lock, latch, or trap can hold the imp's fingers. Anything locked or trapped it touches clicks open or goes inert, and if it has seen a lock or trap before it can key the same opening into its stiletto, so its next strike against whatever that lock or trap protected rings with a poisoned echo and springs whatever was meant to stay shut." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "No lock, latch, or trap can hold the imp's fingers. Anything locked or trapped it touches clicks open or goes inert, and if it has seen a lock or trap before it can key the same opening into its stiletto, so its next strike against whatever that lock or trap protected rings with a poisoned echo and springs whatever was meant to stay shut." [trait/always/condition] — the model found no template that holds it (offered: sealed-body)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Keyhole Step" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---


### Shield Errant — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shield Errant | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity |

- reader · fail · multiattack-integrity: Multiattack's attack slot names "Tower Shield", which is not an attack row on this sheet
- read: def 6 / off 8 → 7; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Shield Errant

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

Aura of Authority. While in a 10-foot Emanation originating from the shield errant, the shield errant and its allies have Advantage on attack rolls and saving throws, provided the shield errant doesn't have the Incapacitated condition.

Actions

Multiattack. The shield errant makes two attacks, using Tower Shield or Greatsword in any combination.

Tower Shield. Strength Saving Throw: DC 15, one creature within 5 feet that the shield errant can see. Failure: 13 (3d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the shield errant gains 13 (3d8) Temporary Hit Points.

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

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] signature elements: tower shield bodyguard [behavior] | iron-plated knight [body] | punishes movement past it [behavior]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "When the errant strikes the creature it has just knocked down with its tower shield, the blow lands with the weight of a failed oath—savagely harder than a normal hit. Only that one shamed, prone foe suffers it; the errant's fury is reserved for those it has already put flat." [rider/on_hit/damage] — menu: EMPTY (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, condition-payoff, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature bound by force: action — "rally" matches shield+orders in the user's words; the model's none is overruled
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("exact concept match [verb: shield:concept, orders:concept]")
[reskin] signature idea (trait): "Standing its ground, the errant is plated in more than steel: whenever a foe it can see tries to slip past its guard and fail to get by, the opening is too good to resist and the errant answers with a free, punishing cut. It never happens more than once in the same instant, and only to the one who failed to get through." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Standing its ground, the errant is plated in more than steel: whenever a foe it can see tries to slip past its guard and fail to get by, the opening is too good to resist and the errant answers with a free, punishing cut. It never happens more than once in the same instant, and only to the one who failed to get through." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, guarded-stance)
```


---


### Wary Whisker — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Wary Whisker | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Wary Whisker

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 50 ft.

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

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 3 (XP 700; PB +2)

Traits

Crowdstep. The whisker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The whisker makes two attacks, using Dagger or Sling in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. The whisker takes the Dash, Disengage, or Hide action.

Slippery Sidestep. The whisker takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: strikes from hiding [behavior] | feline agility [behavior] | hidden blade [object]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The whisker makes a hidden blade attack that turns a hit into a bleeding cut. The wound keeps bleeding until the target shakes it off, but each time it does, the whisker can use the distraction to slip away into the crowd." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Slippery Sidestep" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Slippery Sidestep" ("slips through the market crowd — Disengage action plus a follow-up defensive edg [verb: slip:concept]")
[reskin] signature idea (trait): "Whenever the whisker attacks while hidden, the strike lands especially true. A foe that has not yet seen it in this fight is easier to cut down, and even if the blow misses, the whisker remains hidden long enough to … away untouched." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Whenever the whisker attacks while hidden, the strike lands especially true. A foe that has not yet seen it in this fight is easier to cut down, and even if the blow misses, the whisker remains hidden long enough to … away untouched." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```

