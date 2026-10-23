# Richness without unsoundness: parameters before compounds

**Trigger:** you are about to add a template because the gap list asked for it,
or to build compound composition.

**Owner, 2026-10-22:** *"we need to figure out compositions… I want to favor llm
metadata over regex… Can we have more than one key returned… compound: true,
compound parts: [A,B]? Don't just agree with me, vet my idea."*

---

## The vet: compounds are a minority of the demand

| measurement (forty, `sweep-2026-10-22T17-05-33`) | result |
|---|---|
| refusals | **56** |
| of those, naming a CLOSE existing template | essentially all |
| named gap lines asking for escalation / scaling / stacking | **20 of 54 (37%)** |
| most-reached-for near-miss | `bloodied-fury`, 10 times |

A refusal that can point at a near-miss is **"X but different"**, not "A plus B".
Reading the 23 distinct gap descriptions: roughly **6 compound, 14 a variant or a
missing single, 2 already in the catalog.** So `compound_parts` addresses about a
quarter of the problem, and parameters address more.

**The owner's three rulings on the mechanism, agreed:** parts must be **enum keys
(template ids from the offered menu)** — prose parts would force a text→template
mapping, which is the regex layer being retired; composition must pass
**valueCheck**; and it must use the **existing rider weld** rather than asking for
a second row, because two rows collide with the row cap, the one-nova rule and the
free-row budget of 1.

**Flavor-filling already exists** and needed nothing: templates carry `{slots}`
(`{phobia}`, `{terrain}`, `{damage_type}`), the fit call returns `fills`, and
`renderTemplate` pours them in.

## What print says about escalation — it forbids what the call keeps asking for

Measured against `srd52-monsters.json`:

| idiom | print creatures |
|---|---|
| one-time **Bloodied** threshold | **11** (and that IS `bloodied-fury`) |
| cumulative **Hit Point maximum** reduction on the target | **12** |
| stacking SELF-buff | **0–1** (the Unicorn, per-use not stacking) |
| a tracked count | **0** |

The only cumulative thing in the corpus besides HP-max is the Gray Ooze's weapon
corrosion — a penalty on an *item*. **So the stacking self-buff the model asks for
20 times in 54 gap lines is not print-true, and building it would fail the
corpus.** Print's escalation lands on the TARGET.

## Change 1, LANDED: `life-drain` — print's escalation, which the catalog lacked

**12 print creatures reduce a target's Hit Point maximum and NOT ONE template
did.** Specter (CR 1), Mummy (3), Succubus (4), Vampire Spawn (5), Clay Golem (9),
Vampire (13), Mummy Lord (15). Print's grammar is consistent:

> *…damage, and the target's Hit Point maximum decreases by an amount equal to the
> damage taken.*

It is a **rider** in print's own shaping — on the Slam, the Bite, the Rotting Fist
— so it uses the weld that already exists. `needs_body` declared; `on_hit` /
`condition`; `host: 'melee'`.

### Two focused tens

| | first run | after one tweak |
|---|---|---|
| landed on a legitimate ask | 1 | **2** (+ print's own Vampire, correctly not doubled) |
| correctly REFUSED (bronze warden, silk duelist, owlbear, hydra, glacier) | **5 of 5** | **5 of 5** |
| wrong body refusal | **1** — the clay guardian, print's own case | **0** |
| FAIL of 10 | 0 | **3** |

**The tweak:** the first `needs_body` read *"a touch that drains, withers, or
drinks the life out of what it strikes"* and was refused for *"a clay guardian
whose every blow leaves a wound that will not close"* — print's canonical Clay
Golem. It framed the mechanic as life-draining when print's range runs from the
Specter's drain to the Golem's acid wound. Reworded to name the WOUND as well.
**This is the second time a requirement's wording, not the prompt, was the defect**
(the first was `noxious-aura`): a requirement that names one fiction will be
refused for every other fiction of the same mechanic.

### The FAIL rise is long-tail, and I cannot prove that at n=10

All three classes are old — `name-mechanic` 62 prior evidence files, `attack-stat`
57, `attack-in-multiattack` 21 — and none is the rider's mechanics:

- Grave-Specter / `name-mechanic`: "Years-Draining Grasp" promises Grappled. A
  NAMING defect, and that sheet took no drain row.
- Mire Hag / `attack-stat`: a staff deriving +7 from CHA where an attack rolls STR.
- `attack-in-multiattack`: the known composition class (P1 in the BACKLOG).

The forty ran 2 of 39. At n=10 both 0 and 3 are plausible draws, so **this is
unresolved and only a forty settles it.**

## Status

- [x] Change 1 — `life-drain`, print's HP-max rider (12 print creatures, 0 templates)
- [x] Change 2 — the blank gap lines. **LANDED.**
- [x] Change 3 — **PROBED, and do not build it.** See below.

## Do not build

A stacking self-buff. Print has 0–1 instances; the demand is real and the form is
not. If a concept wants escalation, print's answers are the one-time Bloodied
threshold (`bloodied-fury`) and this HP-maximum reduction on the target.


---

## Change 2, LANDED: the gap list stopped throwing a third of itself away

**The plumbing was never the problem.** `missing` is in the JSON skeleton, the
prose demands it ("A REFUSAL NAMES ITS GAP… a vague answer is a wasted one"), and
`readFit` parses it correctly at `templates.mjs:1205`. The call simply **omits it
on about a third of refusals while still naming `closest`** — and the engine threw
those away as a bare `[gap] UNNAMED` trace, so 12 of 33 lines on the forty carried
nothing.

Nothing is inferred about MEANING. The record now keeps what the call actually
said (`closest`, and the idea in the GM-facing words) plus two facts the engine
owns, which are exactly the critic's distinction:

| the call gave | the record now reads |
|---|---|
| a nearest, no mechanic | **A VARIANT OF `<id>`** — and whether this seat was offered it and declined anyway |
| neither | the catalog **HAS** `<ids>` for this idea's own cell `(trigger/effect)` and this seat was shown none → **a ROUTING miss, not a catalog gap** |
| neither, and the cell is empty | the catalog holds **NOTHING** for that cell → **a real catalog gap** |

Also fixed, before it could corrupt a number: these records would have inflated
"N of M accepted signature pick(s) never reached the sheet", because they were
never acceptances. The tally now counts accepted picks only (`gap_vetoed`), with
the unstated share tracked separately (`gap_missing_unstated`).

### Two focused tens

| metric | first | after one tweak |
|---|---|---|
| `[gap] UNNAMED` lines | **0** | **0** |
| gap lines carrying a build target | 9 of 11 | — |
| vetoed denominator counts accepted picks only | ✓ (`1 of 2`) | ✓ |
| FAIL of 10 | **0** | **0** |

**The tweak is unverified live and that is recorded honestly.** The first ten
produced 2 unstated records, both reading "no nearest named either" — which is
what prompted the routing-vs-catalog tweak. The second ten produced **zero**
unstated records (the call named `missing` on every refusal that time), so the new
branch never executed. Rather than claim a run proved it, the three line shapes
are pinned by tests in `pipelines.spec.js` that force each refusal shape.

**Lesson worth keeping: a stochastic branch cannot be validated by one ten.** If a
ten does not exercise the branch, the honest close is a test, not a louder reading
of the run.


---

## Change 3 PROBED: do not build `compose`. It is parameters again.

`scripts/probe-compose.mjs` — 8 real refusals from the forty's gap list (the ones I
classified as genuinely compound), real menus, scored on the ENGINE's terms: both
ids on the offered menu, the rider really a rider, both render, pair prices.

### A structural obstacle, found before any model call

**Production builds the fit menu per SEAT** (`section: idea.section`), so an action
seat is shown actions and **no riders at all**. `compose: { base, rider }` cannot
be answered from what the call sees today — it needs TWO menus, which is a prompt
change the design did not account for. The probe was rebuilt to show 10 bases + 6
riders, keeping production's 14-entry budget rather than quietly asking for a
bigger prompt.

### The result

**10 of 10 declined** with production-style ranking (and 16 of 16 in the earlier
configuration). Across every run: **0 ids named off the menu, 0 non-riders named as
the rider, 0 pairs that would not render.** The model never bluffed — it declined
and named the half it was missing, every time.

**And the reasons are parameter-shaped, not composition-shaped:**

> *"No base BOTH deals thunder damage in an area around the drake AND shoves…"*
> *"No offered rider supplies an outward shove for EACH creature…"*

`push-prone` exists — it shoves **one creature within 5 feet**. The ask is **each
creature in an area**. The half is present at the wrong **target shape**, and no
amount of composing fixes that. Same for the ash hound: `blighted-ground` exists
and leaves a damaging area, but not as a rider welded to a hit.

So this is the **third independent line of evidence** for the same conclusion:

1. gap-list classification: ~14 of 23 descriptions are a variant, ~6 compound
2. escalation: 20 of 54 named gaps, and print's form is a parameter not a template
3. this probe: the halves exist; their **target shape, duration and trigger** do not match

**Recommendation: build target shape first** (single → each-in-area), which both
the storm drake and the ash hound asked for and which `valueCheck` already prices
by shape. Composition stays unbuilt until a gap list made of *parameterised*
templates still shows compounds.

### Three instrument errors in one session — the probe lied twice before it worked

Each nearly became a reported conclusion:

| defect | what it would have "proved" |
|---|---|
| `catch { bad += 1 }` swallowed the error | "16 of 16 call failures" — read as the idea failing; it was `templateMenuLines` returning a string, not an array |
| menu ranked with an EMPTY idea | "the parts do not exist" — false; `push-prone`, `bolt-mark`, `exploiter`, `blighted-ground` are all inside the top 14 once the idea ranks them |
| same defect, second reading | "routing is broken" — also false; production's ranking surfaces them |

**Never let a probe's catch block discard the error, and always rank a probe's menu
the way production ranks it.** A probe that does not mirror the engine answers a
question nobody asked. See [[a-parser-reporting-zero]].


---

## Change 4, LANDED: area shape is a parameter — print's top two shapes

Owner chose **conservative**: no ungated widening.

### Why that ruling was the right one, measured

Print prices area **two** ways, and 72% of its area rows are gated:

| CR band | single-target | area, UNGATED | area, GATED |
|---|---|---|---|
| 1-4 | 11 | 9 | 18 |
| 5-10 | 17 | 5 | 38 |
| 11-20 | 26 | 17 | 52 |

Ungated area deals **less** than a single-target row; gated area about **2×**. And
**nothing in this engine prices an ungated area row** — `valueCheck` has
`budget0 = gated ? (area ? …) : perHit`, with no area term on the ungated branch,
and `calculateCR` has no target count at all. The existing `control-aoe-ungated`
gate is explicitly "no damage", so area DAMAGE is unpriced. Widening an ungated
row would have inflated CR invisibly. A gated row routes into pricing print
already backs.

### What was built

**The catalog could not produce a LINE at all** — print's second-commonest area
shape, 22 of 109 area clauses. Every gated area template was locked to one shape
(`spew` Cone, `ground-burst` Emanation, `thrown-burst-seed` Sphere…).

- `AREA_LADDER` holds print's **median size per CR band**, for Cone and Line only.
  Sphere and Emanation bands run n = 0-2, too thin to derive, so templates using
  them keep their fixed text.
- **The model picks the shape, the engine owns the size.** `area_shape` is a
  closed VOCAB enum (`Cone`/`Line`); the frame carries `{target}`, an engine slot.
  Two names on purpose, so a distance is never the model's.
- The menu had to be taught to advertise it: it lists vocabulary slots found IN
  the frame, and the frame says `{target}` while the choice is `area_shape`, so
  the choice was unreachable until `templateMenuLines` named it.
- **Conservative rule in the render path:** an area shape is honoured only when
  `t.gate` is set. An off-enum or absent choice falls to the template's first
  declared shape, never to a miss.

### The focused ten (`shape10-2026-10-22T23-15-03`)

| metric | result |
|---|---|
| a LINE ships | **yes** — `Filth Spray (Recharge 5-6): each creature in a 60-foot-long, 5-foot-wide Line`, CR 10 |
| clauses match print's ladder | **yes** — CR 10 → 60-foot Line (band 10-12 = 60), CR 5 → 15-foot Cone (band 3-5 = 15) |
| the widened row is gated | **yes** (Recharge 5-6) |
| no ungated row gained an area clause | **yes** |
| FAIL | **0 of 10** |

The CR 15 30-foot Cone on another sheet is from a template that was NOT
parameterised and keeps its own fixed size — correct, and worth noting so a future
reader does not read it as a ladder violation.

## Status

- [x] Change 1 — `life-drain`, print's HP-max rider
- [x] Change 2 — the gap list keeps its unnamed refusals as build signals
- [x] Change 3 — compose PROBED and declined; it is parameters, not composition
- [x] Change 4 — area shape parameterised (Cone/Line) on `spew`, conservatively
- [x] Change 5 — `ground-burst` widened, with per-template default sizes
- [x] Change 6 — the catalog's area clauses moved to print's Emanation idiom
- [x] Change 7 — DURATION parameterised (13 condition-effect templates)
- [x] PARAMETERISATION COMPLETE — every dimension built or assessed, see below

## Do not build

- A stacking self-buff (print: 0-1 instances).
- `compose: {base, rider}` until a parameterised catalog still shows compounds.
- An ungated area widening, or a retro-price of existing ungated area rows: the
  real exposure is ~4 modest rows in 40, and the apparent offenders are mostly
  legitimate (a death burst, a 2-action legendary cost, a bloodied one-shot, and a
  breath whose `(Recharge 5-6)` sits on its PARENT row).


---

## Changes 5 and 6: per-template sizes, and print's Emanation idiom

### 5. A parameterised template keeps its OWN default sizes

The plan said `ground-burst` and `active-toll` were "the obvious next two". Half
of that was wrong, and checking first caught it: the shared ladder holds Cone and
Line, and both of those templates are **Emanation** — their defaults would not
have rendered.

There is no sound shared Emanation ladder. Print's medians are non-monotone at
n = 3-6 (5/10/20/5/30/20), and this catalog's own two Emanation templates already
disagree (`ground-burst` 10/15/15/20/30, `active-toll` 10/15/20/30/30/60). So
`target_sizes` lets a template carry its own ladder for its **default** shape —
today's output unchanged byte for byte — while an **added** shape draws on
`AREA_LADDER`, where Cone and Line are well evidenced. `ground-burst` now offers
Emanation (its own, 15-foot at CR 8) or Cone (print's, 30-foot at CR 8).

**CORRECTION to change 4's claim.** I wrote "the catalog could not produce a LINE
at all". Too strong: no TEMPLATE could, but **donor chassis rows always could** —
`donors.mjs` carries 2 Line rows, 10 Cone, 12 Emanation, 3 Sphere, and this run's
30-foot Line came from `brute-5-charger`'s own nova, not from the new parameter.
The real gap is narrower: the templates the CALL picks from could not offer a Line.

### 6. "each creature within N feet" was a form print uses ONCE

| form | print instances |
|---|---|
| `N-foot Emanation originating from X` | **25 clauses / 34 sizes** |
| bare `each creature within N feet` (area) | **1** — Lich/Deathly Teleport |

Print's 2024 idiom for an area around the creature is an Emanation, and dragons'
Frightful Presence is now a *Fear* spell rather than a radius save. Nine clauses
across `wail`, `lure`, `herd`, `terror-pulse` and `wind-up` used the outlier form.

Both qualifier positions are print-attested, so the rewrite invents no grammar:

- choice **before** — Azer Sentinel: *"each creature of the azer's choice in a
  5-foot Emanation originating from the azer"*
- sense **after** — Doppelganger: *"...originating from the doppelganger that can
  see the doppelganger"*

**Sizes are unchanged in every case**, so this is grammar only and the pricing does
not move. The single-target `one creature within N feet` is untouched — print uses
it constantly (14 instances remain in `shapes.mjs`).

### The ten (`eman10-2026-10-23T03-20-02`)

| metric | result |
|---|---|
| bare area-radius clauses shipped | **0** |
| Emanations keep their template's own size | ✓ 60, 60, 15, 30, 30, 15 |
| single-target form untouched | ✓ |
| FAIL | **0 of 10** |

The inline substitution reads well: *"originating from the drowned congregation"*,
*"from the reedlight crone"*, *"from the crier"*, *"from the colossus"*.

### One thing to watch: clause length

`lure` now ships the longest targeting clause in the catalog at **165 characters**:

> *"each creature of the reedlight crone's choice in a 60-foot Emanation
> originating from the reedlight crone that can see or hear the lantern they
> cannot look away from"*

Print's longest is **127**. That is the cost of combining both qualifier positions
with a long `{lure_source}` fill — grammatical and print-shaped, but at the edge
of readable, and it is 160 characters of targeting before the GM reaches the
effect. Not a correctness problem. Worth a decision: cap the `{lure_source}` fill,
or drop the choice qualifier on `lure`, or accept it.


---

## Change 7, and parameterisation CLOSED

### Duration — the biggest dimension, and it was unbuilt

11 of 39 named gaps asked for persistence. Print's forms, measured:

| form | n |
|---|---|
| until the start of its next turn | 46 |
| until the end of its next turn | 31 |
| until the start of the creature's next turn | 24 |
| until the end of the creature's next turn | 15 |
| until the effect ends | 12 |
| for 1 minute | 6 |

**By effect kind, which decides what may be offered:** a condition has all four
short forms attested (n = 71); a self-buff has ONLY the short forms (n = 5, print
never lengthens one); recurring damage is 15 rows and **every one is anchored** —
to a grapple (Barbed Devil), a wound (Bearded Devil), a condition; a persistent
area is 7 rows, **every one anchored** — to concentration (Darkmantle), to an
environment (Aboleth). **Print never prints free-floating persistence**, and
nothing here prices duration, so the parameter is offered on condition-effect
templates only: **13 of them**.

`duration_default` may be a string OR band-keyed, like `target_sizes`.

### Zero default drift, proved by rendered output

78 rendered duration clauses compared before and after: **0 changed.** That took
four attempts, and the first three were source-parsing:

1. a segment boundary that bled into the neighbouring template, so `gaze-single`
   got the neighbour's default;
2. a brace-walk that found the wrong object entirely;
3. the realisation that JS escapes the apostrophe — `the creature\'s` — so two of
   the four forms never matched and only half the swaps happened.

**Diffing rendered output is the only honest check here.** It found the one real
case too: `gaze-single`'s 21+ frame always read a different form from its lower
bands, which a single default would have silently rewritten.

And a mistake made TWICE in one session: a trailing `//` comment on a template's
`id:` line swallows the rest of that line, taking `name:` and `cite:` with it. 154
tests failed the second time. **Put the comment on its own line.**

### Every dimension, built or assessed

| dimension | state |
|---|---|
| duration | **built** — 13 condition-effect templates |
| target shape | **built** where more than one shape is coherent (`spew` spit/breath → Cone or Line; `ground-burst` stomp → Emanation or Cone) |
| energy / damage type | **already existed** — 37 templates carry `{damage_type}` |
| condition | **already correctly scoped** to the 4 where it is interchangeable — see below |
| save stat | **engine-derived by design** — the A2 work established that the save follows the row's SHAPE (area + prone → DEX), so it is not a free choice |

**Why area shape stops at two templates.** The other 11 gated area templates are
radial by nature: a cone-shaped `wail`, a cone-shaped `active-toll` (a bell), a
cone-shaped `blink` (a teleport burst) or a cone-shaped `thrown-burst` (a sphere
where it lands) are all incoherent. Shape is only a parameter where more than one
shape reads correctly.

**Why condition is NOT widened.** 16 condition-effect templates hard-code one, and
in nearly all of them the condition IS the template: `snatch` is Grappled because
the row carries the target; `snare` and `bolt-restrain` are Restrained because
restraint is the mechanic; `swallow`, `pounce` and `shield-bash` are Prone because
a shove knocks prone; `lure` is Charmed, `stunning-strike` is Stunned,
`contagion` is Poisoned. Print varies the condition ACROSS templates — a
Petrifying gaze is a different template from a Frightening one — not within one.
`{condition_minor}` is already exposed on exactly the four where it is genuinely
interchangeable (`gaze-single`, `condition-payoff`, `bloodied-burst`,
`noxious-aura`). Widening it would ship a snatch that Poisons.
