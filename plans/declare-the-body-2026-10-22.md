# Why the AI is offered abilities that aren't true — and the fix

**Trigger:** you are about to add a word to a template's `keys`, write a new
`requires_claim` regex, or "fix" a decoration row that shipped onto a creature
whose body can't do it (a sticky owlbear, a thundering lizardfolk, a vampire
healing off a ward it doesn't have).

**Owner question, 2026-10-22:** *"why is the ai being presented with things that
don't work in the first place?"* — asked after approving the critic's stricter
decoration spec (empty seats allowed, four conditions on any invented row).

---

## The answer, measured

The menu screens a template against the creature's **job**. It almost never
screens against the creature's **body**.

`templatesFor()` (`templates.mjs:430`) filters on: role shelf, CR band, style,
`requires_movement`, `requires_style`, `deny_types`, `requires_row`,
`requires_claim`. Counts across all 107 templates:

| declaration | templates |
|---|---|
| carries a `keys` word list | **107 of 107** (1,536 words total) |
| any body-plan declaration (`requires_row`/`requires_claim`/`deny_types`) | **9 of 107** |
| a body/material requirement | **0 of 107** |
| covered by the one real body question (`NEEDS_ENGINE_KEY` + `holds`) | **5 of 107** |

**The owlbear got `adhesive` because an owlbear is a `brute`, and `brute` is in
adhesive's role list. That is the entire check that ran.** Same for the
thundering lizardfolk: lizardfolk is a `skirmisher`; `resonant-body` accepts
skirmishers at any CR with no type denial.

The one body check that does exist is instructive — `heated-body` carries
`deny_types: ['Humanoid']`. The question it asks is "is this creature a person?",
not "is this creature hot?" A brass dragon and a sea serpent both pass.

### The refusal was the correct signal

The AI is doing its job. It is handed a menu that was never screened for truth,
it refuses because the abilities aren't true of the creature, and the engine
overrides the refusal and ships one anyway. That is why the critic found 7 of 11
invented rows worse than an empty seat.

**The decoration fallback is a net under a hole. This plan is the hole.**

### `keys` already holds the body knowledge — wired backwards

The offenders are not silent about their bodies:

```
adhesive       keys=[stick, sticky, tar, glue, adhere, cling, gum, pitch, resin, slime, sap, …]
resonant-body  keys=[ring, toll, resonate, bell, chime, gong, bronze, brass, iron, crystal, …]
```

But `keys` feeds `askedFor()` (`templates.mjs:453`), which **appends** off-shelf
templates when the GM's words match. It is an *inclusion* signal, never an
*exclusion* gate. So 1,536 words of body knowledge sit in the file and not one
of them can stop `adhesive` reaching an owlbear through the role shelf.

---

## The pattern to generalise (it is already in production)

`templates.mjs:490`:

```js
&& !(NEEDS_ENGINE_KEY.has(t.id) && (holds === null ? !engineKeyOk(concept) : !holds))
```

Read it: a set of templates declares *"this needs a body that holds."* The route
call's `holds` verdict answers it. The regex is the **fallback for when the call
is null** — exactly the house rule's shape ("a fallback only when the call fails
or errors — never as a tiebreaker against it"). The call's prompt already teaches
the judgment, with the discrimination spelled out (`route.mjs:271`):

> `"holds"`: true only when it HOLDS, seizes, swallows, entombs or folds shut
> around prey… Crushing someone against stones is impact, not holding; a creature
> that withdraws into its own shell holds nobody.

And `route.mjs:253` already states the general principle for body cues:

> A key marked (body) decides WHAT THE CREATURE IS MADE OF… Answer false unless
> the body really is that thing… a man with a crab's temperament is not a crab.

**So the engine already knows how to ask a body question, judge it with the call,
receipt it with the GM's own words, and fall back to a word list only on error.
It was built for exactly one question out of ~42.**

---

## The three buckets (all 107 classified)

| bucket | count | how the requirement is answered |
|---|---|---|
| **A — DECLARED** | **28** | from the sheet itself: creature type, movement modes, existing rows, size. No call, no words. |
| **B — CALL** | **42** | a body/material truth found nowhere on the sheet. Needs a verdict. (5 already covered by `holds`.) |
| **C — any body** | **37** | no requirement. `bloodied-fury` is true of anything with HP; `death-burst` of anything that dies. |

**Bucket A examples** — `snap-shot`/`bolt-*` need a ranged row; `riposte` and
`weapon-lodge` a melee one; `tunneler`/`earth-glide`/`burrow-ambush` a Burrow
speed; `undead-fortitude` type Undead; `aberrant-ground` type Aberration;
`trample`/`ground-burst` Size Large+. Checking declared data first is the
standing preference, and these need no model at all.

**Bucket B examples** — `adhesive` (a sticky or secreting surface),
`resonant-body` (metal, crystal, or hollow), `marking-light` (sheds light),
`warded-mending`/`ward-retaliation` (has a ward, shrine or charge),
`false-appearance` (resembles an object), `gaze-*`/`random-ray` (eyes),
`wail`/`mimicry`/`herd` (a voice), `spew`/`noxious-aura` (gas or bile).

---

## The fix, in order

**Step 1 — templates declare what must be true, in plain words.**
One field, in `templates.mjs`, where the fact belongs:

```js
adhesive:      { needs_body: 'a surface that is sticky, secreting, or coated in something adhesive' }
resonant-body: { needs_body: 'a body of metal, crystal, glass or something hollow that rings' }
```

Plain words, not a word list — the string is a *question for the call*, never a
pattern to match. 42 templates get one line.

**Step 2 — bucket A gets a declared predicate, not a call.**
28 templates get a `needs_sheet` check against type / movement / rows / size.
Generalises the existing `requires_row` and `requires_movement` rather than
adding a parallel mechanism.

**Step 3 — the call answers the live bucket-B requirements.**
Only the requirements belonging to templates that *survived* the role/CR/style
filter are asked, so the prompt grows by the handful in play, not by 42. Answer
shape is the one `cue_verdicts` already uses:

```json
{ "body_verdicts": [ { "id": "adhesive", "means": false,
                       "because": "<the GM's own words that settle it>" } ] }
```

**Step 4 — the engine validates and nothing more.**
Boolean is a boolean; `because` is a span of the concept. On a null or failed
call, fall back to that template's `keys` — which is what `keys` becomes: a
fallback, not a gate.

**Step 5 — retire the two concept regexes.**
`shell-withdraw`'s `/\b(?:shell\w*|carapace|scutes?|tortle|…)/` and `blink`'s
`/\b(?:teleport\w*|blink\w*|phase[sd]?|…)/` become `needs_body` strings. These
are the ones that fail silently today: a tortoise-person described as *"an
ancient thing carrying a stone house on its back"* gets no shell.

---

## Two measurements that decide whether it worked

Both must be stated **before** the run (see `measure-before-not-after`).

1. **Offer truth.** On a forty, for every template the AI was offered, is it true
   of the creature's body? Today this is unmeasured. Target: the AI's refusal
   rate for *untrue* offers goes to ~0 because they are never offered.
2. **Refusal rate.** Package seven refused into the decoration fallback 11 times
   in 40. If step 1–4 work, that number falls without the fallback firing —
   because the menu stops containing lies. If the refusal rate holds steady,
   the body requirement is wrong somewhere and the lines need re-reading.

A caution: this will *reduce* menu size for some creatures, which can push a seat
toward empty. That is the correct outcome and the reason the critic's empty-seat
fallback lands first.

---

## Why not just add 98 more regexes

Because the two that exist are the two that fail silently, and the failure is
invisible — the owner's standing preference (`prefer-llm-metadata-over-regex`):
*"I would rather a stochastic error of 1 in 10 over a consistent hidden error
over a case we haven't tested."* A word list that misses is indistinguishable
from a body that genuinely lacks the trait. A call that misses leaves a `because`
quote that reads wrong on inspection.

---

## Step 2 LANDED, 2026-10-22 — and it corrected the plan's own classification

**The bucket-A count in the table above was wrong twice, both times by me.**

1. First count said 20 of 28 undeclared. It omitted two columns — `host` and
   `NEEDS_ENGINE_KEY`. **Corrected: 15 already declared, 13 undeclared.**
   `snap-shot` and the three `bolt-*` riders were never ungated; they carry
   `host: 'ranged'`, and `charge`/`charge-push`/`pounce` carry `host: 'melee'`.
2. Then I nearly gated on **print correlation instead of requirement.** The right
   test is *would a GM read a contradiction on this sheet*, not *does every print
   instance happen to satisfy X*. Three of my six candidates failed it:

| candidate | correlation | why it is NOT a requirement |
|---|---|---|
| `web-walker` needs Climb | print 5/5 | the trait is about **webs**. A floor-webbing trapdoor spider needs no Climb; print's web-users merely happen to be climbers. → bucket B |
| `undead-fortitude` needs Undead | print 2/2 | renamed onto a clay golem — "keeps getting up unless struck by holy light" — reads fine. No contradiction. → bucket C |
| `aberrant-ground` needs Aberration | print 1/1 | "the ground warps near it" is true of anything unnatural, not only Aberrations. Gating on our resolved type would block a mind-warped cultist. → bucket B |

### What landed (3 gates + 1 bug fix)

| change | basis |
|---|---|
| `trample` → `requires_size: 'Large'` | print 4/4 Large+ **and** a Tiny body cannot trample a Medium one |
| `leap` → `requires_size: 'Large'` | print 1/1 (Bulette); thin on count, same body-mass contradiction |
| `riposte` → `host: 'melee'` | a reaction that strikes back needs something to strike with; `snap-shot`'s precedent, and `'melee'` is already the weld default so this only turns the requirement ON |
| **`spider-climb` → gate REMOVED** | the gate was **circular** — it required the climbing the trait grants — and print contradicts it: the Vampire Spawn is Medium, `"30 ft."`, with Spider Climb outright. A vampire-shaped concept could never be OFFERED it. |

`requires_size` reads the DECLARED size and **fails open** when size is unknown,
like `type` and `movement` already do, so the call sites that pass no size are
unaffected. `SIZES` now has **one** definition (exported from `templates.mjs`;
`checker.mjs` imported its own copy away).

### Not gated, with reasons

`thrown-burst` / `thrown-burst-seed` — **print forbids it.** Requiring a ranged
row fails on the Kraken (`Fling`) and the Giant Ape (`Boulder Toss`), where the
toss IS the creature's only ranged thing. The same backwards gate as spider-climb.
`ground-burst` (no print instance, so no evidence either way), `shield-bash` (gear
is not threaded into the menu), `disarm` (a reach requirement is not expressible),
`terrain-walk` (no coherent requirement), `weapon-lodge` (an arrow lodges too, so
`'melee'` would be wrong and there is no "any attack row" value).

### Two measurement failures worth keeping

- **A loose detector, not a loose gate.** My first thrown-weapon probe reported
  Ankheg and Purple Worm as violations. They burrow *through rock*, and my
  detector was `/Boulder Toss|Hurl|Rock\b/` over the whole sheet text. Measure the
  ability by its NAME, not by words anywhere on the block.
- **A test on the cap boundary.** `reroll-catalog.spec.js`'s evasion test broke
  because the trait menu is `rankByVerb(...).slice(0, 14)` and spider-climb's
  return pushed evasion from 14th to 15th. The test now EARNS evasion's place with
  a concept that asks for it. **Any template added to a menu silently evicts
  another** — that cap is worth remembering before step 1 adds nothing but
  subtracts plenty.

A side observation from that probe, and the clearest picture of the problem yet:
a triton reef-warden's trait menu offered `heated-body`, `resonant-body` and
`adhesive` — a creature of coral and kelp handed a hot body, a ringing metal body,
and glue. Three of the critic's four offenders, in one menu, for one creature.

Jest 118 suites / 3772 passing; build clean.

## Steps 1 and 5 LANDED, and the prompt is chosen by measurement, 2026-10-22

`NEEDS_BODY` in `templates.mjs` carries **41 requirements in plain words**, keyed
by template id — the idiom `VERB_KEYS`/`SHAPE_KEYS`/`SHAPE_TAGS` already use. The
filter consults the call's verdict, and falls back to that template's own `keys`
**only when the call did not answer**, mirroring `holds`/`engineKeyOk` exactly.
So `keys` keeps one job here: a fallback for a failed call, never a gate.

**Step 5 done: both concept regexes retired**, and both of a word list's failure
directions are now demonstrated fixed in `body-requirements.spec.js`:

| case | the retired regex | the call |
|---|---|---|
| "an ancient thing carrying a stone house on its back" | no shell (no matching word) | **shell** |
| the critic's orc that "withdraws into his shell" | **shell** (the word, no shell) | no shell |

### The prompt was chosen by probe, not by taste

Two variants, live calls through the dev proxy, majority-FALSE case mix because
**the risk is an agreeable judge** — one that says yes to everything is the same
as no gate at all. So the headline number is the FALSE-POSITIVE rate.

| variant | tuning set | held out |
|---|---|---|
| A — "a false answer costs the creature one ability it never needed" | 23/26, 0 FP, **3 FN** | — |
| **B — both costs named, implication made explicit** | **26/26, 0 FP, 0 FN** | **29/31, 0 FP** |

A's single asymmetric cost sentence told the model that false was the cheap
answer, and it withheld `adhesive` from a tar pit and from a **mimic** — and
print's own Mimic HAS Adhesive, so that alone disqualified A. B names both costs
("a wrong TRUE puts a rule on the page a GM can see is nonsense — a bear that
glues people to itself. A wrong FALSE takes away an ability the creature
obviously should have — a mimic that isn't sticky") and states that the concept
need not use the requirement's words.

**The held-out set matters more than the tuning set.** B scored 26/26 on cases I
wrote with labels I chose; on twelve concepts lifted from the real smoke runs it
scored 26/31 before a fix and 29/31 after. Self-graded numbers flatter.

### The requirement TEXT is as load-bearing as the prompt

Three of the five held-out misses were one requirement. `noxious-aura` read *"a
body that reeks, rots, or gives off fumes"* — it asked about a BODY while the
concepts described an ACT, and "fumes" read as any emission:

- missed "a rust-plated siege engine that **belches smoke** as it rolls"
- missed a swarm of carrion beetles
- **false-positived** on "a glacier's heart … trailing a wake of killing cold"

Reworded to name the act and the smell and to exclude the cold, which fixed the
false positive and the siege engine and removed all run-to-run instability:
26/31 → **29/31**. The two remaining misses are both arguably MY labels — the
archlich is enthroned *on* a sun of bone, so the sun is the throne and not the
body; and an ooze that swallows is not necessarily adhesive.

**Lesson for the other 40 declarations: a requirement that names a body property
will be read against concepts that describe acts.** Name both.

### Where the question is asked, and why it costs no extra call

The verdicts ride on the **idea call** (`buildIdeaPrompt`, `generate.mjs:3867`),
which already runs **once per sheet, before any menu is built** (`templatesFor`
first fires at 3983). So the body question adds no round trip — which matters,
because a new call per generation would be a cost increase.

Only the requirements a template could actually reach are asked —
`liveBodyRequirements(ctx)` runs the ordinary filter with every body requirement
treated as satisfied and returns what survives on role, CR, style, type, movement
and size alone. **Mean 24 of 41 per sheet** (18 for a CR 3 artillery Humanoid, 28
for a CR 7 Undead lurker).

**That raised a real risk: I probed 2-4 questions at a time, not 24.** So I probed
the worst case, all 41 at once, on the held-out set:

| asked at once | score | false positives | verdicts returned |
|---|---|---|---|
| 2-4 | 29/31 | **0** | — |
| **41** | **28/31** | **0** | **41 of 41 on 12 of 12 calls** |

Statistically the same, nothing dropped, and the decisive number against an
agreeable judge: **23 TRUE verdicts out of 492 possible (4.7%)** — a yes-man
returns ~492. The model stays strict at scale.

### The fallback had to be fixed twice, and both were real defects

1. **A failed call stripped 41 templates.** The first fallback gated on `keys`
   alone, so a sheet with no matching key word lost every body-shaped template —
   27 test failures said so. The file's own convention, stated in a test, is that
   the unknown does not exclude ("no type known: no exclusion"), and
   `engineKeyOk` already implements it (`sig.length <= 3`). That word-stripper is
   now **one** exported definition, `significantWords`, read by both.
2. **A row on the sheet is a claim too.** The retired `requires_claim` checked the
   concept AND the rows — "Bony Carapace: its shell is thick" buys a shell for a
   concept that never mentions one. The first fallback checked only the concept
   and silently lost that path. Restored, and pinned.

Five test stubs now answer the body question, because a stub that omits it falls
back to `keys` and removes the template BEFORE the mechanism the test is about can
decline it. They grant every requirement with an explicit `because` saying body
truth is not that test's subject — a real call answers per sheet.

### The e2e run, 2026-10-22 — `smoke-out/body6-2026-10-22T15-02-36`

Six blocks, live, with trace. **`check-run.mjs`: 0 FAIL of 6, 45 concepts frozen,
no clause drift.** The mechanism fires end to end and **every requirement was
answered on every sheet** — 20/20, 22/22, 23/23, 23/23, 24/24, 28/28. The `keys`
fallback never ran.

| canary | result |
|---|---|
| Owlbear — `adhesive` must be FALSE | PASS, **but on the wrong path — see the correction below.** |
| tar-pit horror — `adhesive` must be TRUE | **PASS.** The gate is not a wall. |
| brass gate-bell — `resonant-body` TRUE | **PASS.** Shipped `Ringing Rebuke`, `Thunder Absorption`, `Discordant Knell`. |
| Vampire — `warded-mending` must be FALSE | **PASS.** Judged false. It took `Bloodward Pull` instead — print's own "bound to its resting place" grammar, not healing off a ward that is nowhere on the sheet. |
| venomous lizardfolk — `resonant-body` must be FALSE | **PASS.** No thunder from its scales. It still took `Marsh Stride`, which IS true of a marsh raider. |
| "an ancient thing carrying a stone house on its back" — `shell-withdraw` TRUE | **FAIL.** The call judged it FALSE. |

The clearest single result is the third against the fifth: **`resonant-body` landed
on the brass bell and was refused to the lizardfolk.** Same mechanic, sorted by
body — which is the whole point.

### CORRECTION: the stone-house example does not prove what I claimed

I used "an ancient thing carrying a stone house on its back" in the plan, in the
`NEEDS_BODY` comment, in `shapes.mjs` and in a test, as the case showing why the
`shell-withdraw` regex had to go. The regex did refuse it. **But in a live run the
call refuses it too**, so that example illustrates the regex's failure mode without
demonstrating that the call fixes it.

What IS demonstrated, and what is not:

- **Demonstrated, live:** the direction where the words are present and the body is
  not — the owlbear, the vampire's ward, the lizardfolk's thunder. Three for three.
- **Demonstrated only with a forced verdict** (a unit test, which tests the gate and
  not the model): the direction where the body is present and the words are not.
- **Not demonstrated:** that the call reads "carrying a stone house on its back" as
  a shell. It does not. The engine also routed that concept to a construct chassis
  (`Immutable Form`, `Magic Resistance`), so "stone" may be reading as material
  rather than as a shell.

A reword might fix it — that is how `noxious-aura` was fixed — but **every reword
needs its own probe**, and tuning on a single case is how the correlation mistake
in step 2 happened. Left as a known false negative with the evidence attached.

### A second non-reproducing suite failure — watch this

One full run reported 1 failed with no test name resolvable in the output; the
next two full runs were green at 3786, and **the only edits between them were
code comments**, so it cannot be those. This is the SECOND such ghost — the first
was `generate-2024.spec.js › correctable violations` on 2026-10-23 (see
`critic-response-2026-10-23.md`), also non-reproducing.

Two in two days is a pattern, not luck. If a third appears, stop and chase it
rather than re-running: the shared suspicion is a fixture mutated by an earlier
suite under `--maxWorkers=2`, which would make it order-dependent. The cheap test
is `--maxWorkers=1` versus `=2` on the full suite, and `--runInBand` to pin order.

## Status

- [x] Step 1 — 41 `needs_body` lines (42, now +3 reassigned from bucket A = ~45)
- [x] Step 2 — declared predicates: 3 gates landed, 1 circular gate removed, 6 deferred with reasons
- [x] Step 3 — `body_verdicts` on the IDEA call (not route: the idea call runs once per sheet BEFORE the first menu, so no extra round trip)
- [x] Step 4 — validated by shape only; `keys` demoted to a failed-call fallback
- [x] Step 5 — the 2 concept regexes retired (shell-withdraw, blink)

Related: `plans/retire-the-string-matching-2026-10-22.md` (this is its root-cause
sibling — that plan retires readers of the engine's *own output*, this one
retires readers of the GM's *input*), `plans/critic-response-2026-10-23.md`
(item 2, the empty-seat fallback this sits under).


---

## CORRECTION: the bare Owlbear was never the case (owner's question, 2026-10-22)

> "don't we have a separate path for print exact? why all this stuff about the owlbear"

Right, and it invalidates the canary I used. **`printExact` already closes the row
set** — `freeAllowance = 0` at all three grant sites (`generate.mjs:771`, `:4299`,
`:4865`). A bare `Owlbear` takes `[path] exact` and cannot take an invented row at
all. My body6 and branch10 canaries used a bare Owlbear, so they passed on the one
pipeline that never had the bug, and the claim "this is where package seven
shipped `Adhesive`" was **false for that sheet**.

**Package seven's Owlbear was a TWIST**: `name: Owlbear | that has learned to
climb` → `[path] twist`, `freeAllowance = 1`. The trace reads:

```
closest accepted: trait — the call refused every template but named "adhesive" as nearest
free signature row: "Adhesive" — ... ships as DECORATION: no receipt, no element claim
seat takes its clause: "Adhesive" answers "has learned to climb"
```

The GM asked for climbing and got glue.

### Where the decoration problem actually lives

All 14 decoration rows in package seven, by path:

| path | sheets with a decoration row |
|---|---|
| twist | 7 |
| homebrew | 4 |
| class_npc | 3 |
| **exact** | **0** |

So this is a **three-of-five-pipelines** problem and the exact path needed none of
it. Worth knowing before any further decoration work: a canary on an exact body
proves nothing about it.

### The real case, re-run and fixed (`owlbear2-2026-10-22T16-52-57`)

`Owlbear | that has learned to climb`, on the twist path: **`adhesive` judged NOT
TRUE, never offered, no Adhesive on the sheet.** The seat went to `Grapnel Climb`
— "can climb difficult surfaces, including along ceilings" — which answers the
GM's own clause. The body gate is doing its job where the bug was.

Not claimed: the `spider-climb` gate removal did **not** enable that row. An
Owlbear already has `Climb 40 ft.`, so it would have passed the old gate too.

### The lesson, and it is the SECOND time today

Both over-claims this session are the same mistake: **asserting a motivating
example without checking the case matched.**

1. "an ancient thing carrying a stone house on its back" — the regex refused it
   and so does the call, so it never demonstrated the fix.
2. the bare Owlbear — the exact path already closed the row set, so the canary
   tested a pipeline that was never at risk.

Before using a defect as a canary: **re-run the exact input that produced it, and
confirm the path.** A paraphrase of the input is a different test.
