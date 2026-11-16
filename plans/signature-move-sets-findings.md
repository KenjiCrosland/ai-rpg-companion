# Signature move sets — investigation findings (phases 1–4)

Oct 16, 2026. Answers the brief of the same date. **No engine behavior changed.**
Added: `scripts/signature-baseline.mjs`, `scripts/pattern-label.mjs`,
`src/data/print-patterns.json` (the frozen print labels).

Corpus: **624 saved runs, 4,959 blocks (4,161 non-print), 2026-09-16 → 10-16**,
read from the engine's own traces. Everything below re-runs from the archive.

---

## The headline, and it inverts the brief's framing

The brief's leading hypothesis — *the variant seats carried the move sets and
this sprint's routing strips them* — **is refuted as the cause.** On 2026-10-16,
blocks whose variant seat **survived** held a fitted signature **17%** of the
time; blocks whose seat **stood down** held **19%**. The stand-down is real and
rose twenty-fourfold, but it is not what made sheets flat.

What actually happened is this:

| date | held+rider | force-bound | re-poured | key match declined |
|---|---|---|---|---|
| 2026-09-29 (peak) | **83%** | 32% | 11% | 0% |
| 2026-10-16 (now) | **17%** | 1% | 12%¹ | **31%** |

¹ all 10-16 re-pours come from runs at 00:54–05:14, before the retirement landed; the code has none.

**Roughly 43% of blocks at the 83% peak reached "held" through force-binding or
the re-pour** — the two mechanisms the critic traced every word-collision defect
to, and that we deliberately retired. Subtract them and the peak was about 40%
legitimately held. The real regression is **~40% → 17%**, not 83% → 17%. Still a
halving, and still worth fixing, but less than half the apparent collapse, and
the missing half should not be recovered.

The mechanism that replaced them is now the load-bearing fact:

> On **31% of blocks**, the GM's own words key a template, the call is shown it,
> and the call answers **no fit**. Of those, **71% fall to a generic seed and 22%
> ship nothing.** A decline has no successor.

That is the gap. Not verbs-versus-patterns — the call declining everything, and
the engine having no legitimate second answer now that the illegitimate one is
gone.

---

## Phase 1 — the signature path as it runs today

`generate.mjs`, in execution order:

1. **the concept call** returns `signature_elements`, then an **idea** per seat —
   `{idea, section, trigger, effect}` (`~2890`). The tags exist on every idea.
2. **the menu** — `templatesFor({section, trigger, text})` (`templates.mjs:388`)
   filters by role shelf, CR band, legality, what the sheet already owns, and
   a distinctive-key override that lets the GM's own word reach off-shelf.
3. **`rankByVerb`** scores the menu against the concept and the idea separately
   (`concept` keys vs `idea` keys).
4. **the gate that matters** (`generate.mjs:2958`): if **no** template on the
   shelf shares a verb with the concept or the idea, the fit call is **never
   made** — `signature miss`, no call spent. 9% of blocks, all-time.
5. **concept-bound narrowing** (`~2972`): when the GM's words key templates, the
   fit call sees **only those**. Strongest match only, if more than one.
6. **the fit call** answers `{template, because, asked, name, fills, wrong}`.
7. **post-call vetoes**: the `asked`/verb gates on print bodies, novas and riders
   (holds 1/5, just reworked), and the key-table preference gate.
8. **`valueCheck`** (`templates.mjs:~818`) prices the row against a floor derived
   from the Multiattack; under-floor rows climb a ladder, then drop.
9. **the fallback** — `fallbackMenu` then a hash draw over `kind:'seed'`, now
   excluding `wrongT`, `declinedT` and what is on the sheet.
10. **the row cap** (`species.mjs:rowCap`) — kit and species rows yield to it.

Metadata the catalog already carries: `section`, `trigger` (save / always /
on_hit / on_being_hit / start_of_turn / once_per_fight), `effect` (condition /
damage / movement / defense / resource), `roles`, `styles`, `keys`, `nova`,
`gate`, `cr_range`. **There is no pattern field.** 107 templates: 80 shapes
(mechanics in `frames`, one per CR band) + 27 seeds (flat `text`).

The creature-intelligence layer holds **328** entries with `tactical_identity`,
`signature`, `abilities` and `retreat` — prose, not labels, but a ready corpus.

**The fallback does ignore the idea's own tag.** Confirmed in code: the seed draw
ranks by verb and hash, never by `idea.effect`. The brief's five examples are
real.

---

## Phase 2 — the baseline

Action seat, all-time, non-print (n=4,161): **held 46%, rider 6%, seed 32%,
nothing 16%.** Trait seat: held 45%.

### Hypothesis 1 — flatness is recent. CONFIRMED, and the arc is longer than sprint 9

```
date        n   held+rid  seed  none | floorDrop  noCall  standdown  vetoes/blk  capYield  conceptKeyed
2026-09-22  465     63%    33%    4% |      6%     24%         0%       0.00        0%           83%
2026-09-29  275     83%    16%    1% |      7%      3%         1%       0.05        0%           95%
2026-10-01  570     67%    21%   13% |      9%      4%        14%       0.13        0%           85%
2026-10-04  501     41%    36%   23% |     20%     10%        10%       0.20        0%           62%
2026-10-12  295     53%    31%   16% |     18%      9%        10%       0.27        0%           70%
2026-10-13  225     43%    44%   12% |     25%      9%        12%       0.39       10%           62%
2026-10-15  148     34%    42%   24% |     18%      7%        20%       0.20       19%           72%
2026-10-16  263     17%    54%   29% |     27%     10%        24%       0.34       22%           70%
```

The decline begins **2026-09-30**, not in sprint 9. Every contributor the brief
named is real and they compound:

| contributor | 09-29 | 10-16 | change |
|---|---|---|---|
| value-floor drops | 7% | **27%** | ×4 |
| variant-seat stand-downs | 1% | **24%** | ×24 |
| call-pick vetoes per block | 0.05 | **0.34** | ×7 |
| row-cap yields | 0% | **22%** | new, from 10-13 |
| no-call misses | 3% | 10% | ×3 |
| prompts whose words keyed a template | 95% | 70% | −25pts |

### Hypothesis 2 — verbs are the wrong routing key. CONFIRMED

| | n | held+rider | seed | nothing |
|---|---|---|---|---|
| the GM's words keyed a template | 718 | **45%+3%** | 38% | 14% |
| they did not | 331 | **17%+0%** | 50% | **33%** |

A prompt with no keyable verb gets a generic seed or nothing **83%** of the time.

**And the decline is not a prompt-mix artifact.** Split by keying, per day:
keyed=true went **84% (09-29) → 20% (10-16)**. The same canary prompt, verbatim,
went 100% (10-14) → 100% (10-15) → **31% (10-16)** — "a court wizard who is never
where you struck". Its trace shows why: the call declined `phase-slip`, the
fallback honored the decline, and the concept-first trait path honored it too.

### Hypothesis 6 — the variant seats. REFUTED as the cause; real on its own merits

- stand-down rate **1% → 24%**, and the worst causes are narrow: "style has no
  line at this archetype" leaves 19% held / 35% nothing; the bow-user hurler
  stand-down leaves **14% held / 71% seed**.
- **role-preserving substitution happens in 1 of 3 exits.** 518 chassis rows
  dropped as "the seat's, not print's"; **247** yielded to a print row that does
  the same job (the Goblin Boss's Nimble Escape pattern). The brief's step 2 is
  worth doing — it just will not recover the held-rate.
- a variant seat in the donor is still worth something: **57%** held+rider vs
  **43%** for the plain line.

### Seed concentration

28 distinct seeds ever drawn; the top four are **56%** of all draws:
`exploiter` 16%, `rally` 11%, `own-turn-punisher` 8%, `rampage` 8%.

### Held-rate by archetype (all-time)

lurker 68%, brute 60%, caster 55%, skirmisher 44%, defender 41%, dragon 36%,
swarm 31%, **ooze 4%**.

---

## Phase 3 — print, labelled and frozen

329 SRD 5.2 blocks, labelled from each row's **printed mechanics** rather than by
an LLM: a Grappled condition plus a payoff is grab-and-hold whatever the fiction
calls it. Reproducible, free to re-run, diffable, and frozen to
`src/data/print-patterns.json`. Rows no predicate claims are reported as
unlabelled rather than guessed — that list is where a call's judgment is actually
needed.

**Hand spot-check against the brief's own examples: 21/21 agree** after two
widening passes. Both passes were driven by reading print's text, and both
corrections are recorded in the script.

| pattern | print |
|---|---|
| meat | 30% |
| rider control | **26%** |
| save control | **23%** ← not in the brief's vocabulary |
| nova | 21% |
| force multiplier | 16% |
| menu | 15% |
| durability with a key | 13% |
| grab and hold | 12% |
| zone | 8% |
| hit-and-run | 6% |
| approach | 6% |
| setup → payoff | **4%** |
| clock | 4% |
| reaction tax | 1% |
| ambush | 1% |

### Hypothesis 3 — setup-and-payoff is not print's commonest. CONFIRMED

It is **4%**. The top true loops: `nova + save control` 30, **`grab and hold +
rider control` 29**, `durability + menu` 25, `rider control + save control` 24.
The critic's guess that grab-and-hold is the commonest true loop is right.

### Hypothesis 4 — patterns climb with CR. CONFIRMED, monotonically

| CR | n | mean patterns | meat-only |
|---|---|---|---|
| 0–1 | 133 | 0.8 | **48%** |
| 2–4 | 83 | 1.4 | 31% |
| 5–8 | 52 | 1.8 | 12% |
| 9–12 | 23 | 2.2 | 13% |
| 13–16 | 18 | 2.9 | **0%** |
| 17+ | 20 | 4.1 | **0%** |

This is the print-relative flat metric (step 10), ready to use: a CR 1 with no
pattern is print-normal (48% of its band), a CR 10 with none is unusual (13%),
and **a CR 13+ with none does not exist in print.**

### The brief's example table is partly 2014, not SRD 5.2

Found while spot-checking. These named examples are **absent from SRD 5.2**:

- **Knight** has no Leadership — two attack rows only. "meat" is correct.
- **Lion** has no Pounce — Pack Tactics + a Frightened Roar.
- **Assassin** has no Assassinate — Evasion + Cunning Action + a Poisoned rider.
- **Minotaur** is not in the corpus at all.
- **Bugbear**'s Surprise Attack is not there either (ambush is 3 of 329).

The archetype-expectations table should be rebuilt from the frozen labels before
anything is designed against it.

### Two vocabulary findings

1. **`save control` is missing and it is print's #2 non-meat pattern (23%).**
   Print's commonest control row is a **save**, not an attack rider — the Giant
   Spider's Web, the Lion's Roar. The brief defines rider control as "one-turn
   condition on a hit", which excludes them.
2. **40% of the catalog (43 of 107) fits no pattern.** They are passive defensive
   and mobility traits: `spider-climb`, `web-walker`, `terrain-walk`,
   `uncanny-sense`, `evasion`, `guarded-stance`, `patient-defense`,
   `absorption`, `bound`, `blurred-form`. Print absorbs these into `meat`; the
   catalog cannot, because they are a large and deliberate part of the shelf. The
   vocabulary needs a slot for them, or they need to be out of scope explicitly.
   The Hill Giant marks the same boundary from the other side: a Prone rider on a
   big dumb hitter is mechanically rider control and plays as meat.

---

## Phase 4 — the catalog, tagged by the same predicates

```
pattern                 print%   templates   verdict
  rider control            26%      12       proportionate
  save control             23%      24       proportionate
  nova                     21%      10       proportionate
  force multiplier         16%       4       ** THIN for how common print is **
  menu                     15%       0       handled by the caster chassis, not templates
  durability with a key    13%       3       ** THIN for how common print is **
  grab and hold            12%       4       ** THIN for how common print is **
  zone                      8%      14       proportionate
  hit-and-run               6%       4       proportionate
  approach                  6%       4       proportionate
  setup → payoff            4%       1       proportionate
  clock                     4%       0       *** EMPTY SHELF ***
  reaction tax              1%       4       over-stocked vs print
  ambush                    1%       2       over-stocked vs print
```

### Hypothesis 5 — part catalog, part routing. CONFIRMED, with specifics

- **`clock` is empty.** Print has 12 (petrification ladders, Strength drain).
  Nothing in the catalog can produce one.
- **Thin against print's own frequency:** force multiplier (4 for 16%),
  durability with a key (3 for 13%), grab and hold (**4 for 12%, and it is
  print's commonest true loop**).
- **Stocked but rarely picked:** `zone` has 14 templates and drew **1** zone-seed
  in 1,350 library draws. `save control` has 24.
- One caveat recorded in the script: a rider template's frame is a *clause*, so
  it carries no "Attack Roll" and the print predicate cannot see it. The section
  is the evidence there. Without that correction the catalog read "0 templates"
  against print's commonest pattern — an artifact, not a gap.

---

## What I did not measure

- **Hypothesis 7 (coverage counts presence, not composition).** Needs the
  composition check of step 4; coverage and pattern count are not yet comparable
  per sheet. The data is now in place to do it.
- The labels are mechanical. They are reproducible and 21/21 against the brief's
  examples, but they encode no taste: `meat` vs `rider control` on the Hill Giant
  is a judgment the predicates cannot make, and that is the honest place for a
  call with a receipt.

## Recommendation, in one paragraph, for phase 5

Do not design against "verbs are the wrong key" first, even though it is true.
The largest single lever is that **a decline has no successor**: 31% of blocks
have the call refusing a template the GM's words keyed, and nothing legitimate
follows. Steps 8 and 9 of the candidate design (route by pattern; setups pull
their payoff) are the right shape for that, because a pattern shelf gives the
engine somewhere to go that is not the same four seeds. Step 1–3 (keep the seat's
move set, role-preserving substitution, merge by role) should be done on their
own merits — 2 of 3 chassis-row exits lose their role — but the measurement says
they will not move the held-rate much. Before any of it, two cheap corrections:
add `save control` to the vocabulary (23% of print, currently unnamed), and
rebuild the archetype-expectations table from the frozen labels, because five of
its named examples are 2014 creatures that SRD 5.2 does not contain.

---

# Stage 2 findings (owner's fix order, 2026-10-16)

Measurements only; no behavior changed by anything in this section.
Re-runs: `scripts/pattern-count-generated.mjs`.

## Item 3 — pattern count on generated sheets. THE PREMISE INVERTS.

`scripts/pattern-count-generated.mjs` over **3,403 generated 2024 sheets**
(non-print), frozen print predicates both sides:

| CR band | ours | print | gap | meat-only (ours) | meat-only (print) |
|---|---|---|---|---|---|
| 0–1 | **2.19** | 0.81 | **+1.38** | 3% | **48%** |
| 2–4 | **2.56** | 1.41 | **+1.15** | 5% | 31% |
| 5–8 | **2.64** | 1.83 | +0.81 | 7% | 12% |
| 9–12 | **3.28** | 2.22 | +1.06 | 4% | 13% |
| 13–16 | 3.00 | 2.89 | +0.11 | 6% | 0% |
| 17+ | **4.80** | 4.10 | +0.70 | 0% | 0% |

**Our sheets carry MORE patterns than print at every band.** By the brief's own
print-relative flat metric they are not flat — they are over-patterned, worst at
low CR where print is half meat and we are 3% meat.

So the flatness the owner sees at the table is real but it is **not a pattern
count deficit**, and step 10's metric as specified would report our sheets as
healthy. That is hypothesis 7 — coverage counts presence, not composition — now
with numbers on the pattern axis too.

### Where the extra patterns come from: chassis filler

892 sheets, 2026-10-10..16, each pattern attributed to the row that carries it:

| pattern | instances | chassis filler | signature/library | kit | GM | print |
|---|---|---|---|---|---|---|
| **hit-and-run** | 469 | **84%** | 5% | 5% | 0% | 5% |
| save control | 441 | 36% | 46% | 0% | 8% | 11% |
| rider control | 215 | 57% | 0% | 0% | 29% | 14% |
| nova | 146 | 59% | 36% | 0% | 3% | 3% |
| durability with a key | 155 | 57% | 15% | 0% | 0% | 28% |
| menu | 119 | 64% | 0% | 0% | 0% | 36% |
| grab and hold | 198 | 52% | 34% | 0% | 3% | 11% |
| setup → payoff | 126 | 41% | 54% | 0% | 0% | 5% |
| **clock** | 21 | 0% | 0% | 0% | 0% | **100%** |

Our commonest pattern is `hit-and-run` at **31% of sheets against print's 6%**,
and it is **84% chassis filler** — "Fleet Agility", "Cunning Action", the
terrain-walk traits. `clock` we never generate at all; every instance is a print
row riding along.

### What this means for the order

The three facts compose into one story:

1. pattern count is above print everywhere, so there is no count deficit;
2. the inflation is **filler**, which is generic by construction and reads as
   nothing at the table;
3. the signature — the one row meant to make a creature play differently — lands
   **17%** of the time.

"Flat" is therefore not "few patterns". It is **many patterns, all generic, and
the distinctive row usually missing**. Two consequences for the plan:

- **Stage 4's priority eviction is a move-set fix, not only a cap fix.** Chassis
  filler is what consumes the row budget and simultaneously hides the deficit
  from the metric. Evicting it first should make both the signature slot and the
  metric honest, and it is already scheduled before stage 5.
- **Step 10's flat metric needs a denominator change** before it can gate or
  guide anything: count patterns carried by print, kit, GM and signature rows,
  and exclude chassis filler. Otherwise it reports a filler-rich sheet as rich.

### Pattern frequency, ours against print

Over-produced: `hit-and-run` 31% vs 6%, `save control` 56% vs 23%, `setup →
payoff` 20% vs 4%, `ambush` 14% vs 1%, `reaction tax` 8% vs 1%, `grab and hold`
25% vs 12%, `durability with a key` 21% vs 13%.
Under-produced: **`meat` 5% vs 30%** (3% vs 48% at CR 0–1), `clock` 1% vs 4%,
`force multiplier` 13% vs 16%.

The brief says meat is a legitimate answer, "especially at low CR and in groups".
We effectively never ship one, and print ships one in three.

## Item 3b — hypothesis 6, re-tested on pattern count. NOW CONFIRMED.

The findings above refuted hypothesis 6 against **signature held-rate**. The
owner's brief said to re-test it against **pattern count**, the outcome it was
actually about. It flips:

| | n | mean patterns | meat-only |
|---|---|---|---|
| seat survived | 3,138 | **2.97** | 5% |
| a variant seat stood down | 265 | **2.28** | 10% |

Within CR 5–8 alone, to rule out a CR mix: **2.71 vs 1.97**, a 0.74-pattern gap.
And a variant seat in the donor carries 3.08 against the plain line's 2.61, with
meat-only 1% against 13%.

**So the variant seats do carry move sets** — they just do not carry the
*signature*. Stage 5 item 5 (keep the seat's move set) is supported by this
measurement; the earlier refutation stands only for the signature metric. Both
readings are now on the record with the metric each was measured on.

## The flattest archetypes, which are also the worst-served

| archetype | n | mean patterns | meat-only |
|---|---|---|---|
| ooze | 24 | **0.67** | **54%** |
| swarm | 80 | **1.57** | 30% |
| defender | 388 | **2.03** | 14% |
| caster | 429 | 2.62 | 0% |
| skirmisher | 674 | 2.74 | 2% |
| lurker | 526 | 2.88 | 4% |
| brute | 1,091 | 3.35 | 4% |
| dragon | 167 | 4.59 | 5% |

Ooze, swarm and defender are the only archetypes genuinely below print's band,
and they are the same three with the worst signature held-rate (ooze 4%, swarm
31%, defender 41%). If stage 5 needs a place to start, it is these three and not
the average sheet.

## Item 4 — floor drops by pattern. THE DECISION IS YES.

`scripts/signature-demand.mjs`. Every template the value floor skipped, labelled
by the pattern it would have carried. Scoped to current code (427 blocks since
2026-10-15):

| pattern | share of floor drops |
|---|---|
| **save control** | **50%** |
| (passive — no pattern) | 50% |
| zone | 1% |

Of the floor drops that carry a pattern at all, **64 of 65 are `save control`** —
print's second-commonest pattern at 23%. The named rows dropped outright are all
control: Horrid Display 18, Driving Bellow 14, Dazzling Burst 13, Disarming
Twist 11, Sundering Shove 10.

So **the value floor is pricing out print's second-commonest pattern**, and
stage 5 item 2 ("the value floor prices conditions") is confirmed by measurement
rather than impression. The other half of the drops are passive templates, which
have no EV by construction and are correctly skipped — that half is not a defect.

## Item 5 — every "by print" rule audited. FOUR OF FIVE ARE UNFOUNDED.

`scripts/by-print-audit.mjs`, against the frozen labels. A seat that OWES a trait
seats it **before the idea**, so the claim has to be print's.

| seat owes | pattern share in print | does print carry a row by that name? |
|---|---|---|
| skulker owes `assassinate` | ambush, 1% | **no print row is named "Assassinate"** |
| lurker owes `assassinate` | ambush, 1% | **no print row is named "Assassinate"** |
| trap owes `false-appearance` | zone 8% / ambush 1% | **no print row is named "False Appearance"** |
| warden owes `interpose` | reaction tax, 1% | **no print row is named "Interpose"** |
| skulker owes `evasion` | passive | thin: 1 block (the Assassin) |

`MECHANIC_OWED_TRAIT.gaze → gaze-aura` is the one that holds: print has 4 Gaze
rows (Basilisk, Lich, Medusa, Solar).

### And they fire, and they displace the GM

1,066 blocks since 2026-10-10: a seat default seated a trait before the idea on
**71 (7%)** — `assassinate` 55, `evasion` 26, `interpose` 6.

The displacement is consistent. **Four separate "a ninja who moves through the
shadows and strikes unseen" sheets** seated `assassinate` + `evasion` by default,
and the GM's own trait idea then missed:

- "The shinobi's semi-incorporeal body is one with darkness…"
- "As long as the shade is in dim light or darkness, it can slip through the shadows…"
- "Kanagi's body is woven from the dark between worlds…"
- "The assassin's body is partially composed of living shadow…"

The GM asked for shadow-stepping four times and got Assassinate, a row SRD 5.2
does not contain. Same shape on "a watcher that has not one but three eyes and
misses nothing" and "an eyeless hunter that tracks prey by scent alone".

### Ten of forty-seven template cites are broken

Checked creature-by-creature against SRD 5.2. One is a **rename**, three are
**absent creatures**, six are **rows 5.2 removed**:

| template | cite | what SRD 5.2 has |
|---|---|---|
| `heated-body` | Remorhaz/Heated Body | renamed **Heat Aura** |
| `false-appearance` | Mimic/False Appearance | removed — Adhesive + Shape-Shift |
| `false-appearance` | Gargoyle/False Appearance | removed — Flyby, Multiattack, Claw |
| `pounce` | Tiger/Pounce | removed — Rend + Nimble Escape |
| `assassinate` | Assassin/Assassinate | removed — Evasion + Cunning Action |
| `interpose` | Shield Guardian/Shield | removed — Bound, Regeneration, Spell Storing, Fist |
| `ward-retaliation` | Shield Guardian/Shield | same |
| `shell-withdraw` | Tortle | not in SRD 5.2 |
| `phobia` | Scarecrow | not in SRD 5.2 |
| `bloodied-fury` | Sahuagin | not in SRD 5.2 |

This is the same error class as the brief's own stale example table, and it is the
mechanism: the catalog was built against 2014 and five of its print claims no
longer hold. **The Tiger losing Pounce also explains the Lion** — 5.2 removed
Pounce broadly, so `approach` is thinner in print than the 2014 reading suggests.

## Item 6 — demand from the miss log.

2,696 signature misses across 4,177 non-print blocks, by the idea's own effect tag:

| effect | share |
|---|---|
| damage | 30% |
| condition | 29% |
| movement | 21% |
| defense | 16% |
| resource | 5% |

Demand is spread across all five, so a successor keyed on `effect` (stage 5 item
1) needs a stocked shelf for each, not one.

**The miss log is dominated by the TRAIT seat**, which the brief's design does not
address:

| seat / trigger | share of misses |
|---|---|
| **trait/always** | **44%** |
| **trait/on_being_hit** | **18%** |
| action/always | 13% |
| rider/on_hit | 8% |
| action/save | 5% |

62% of all signature misses are trait seats. Stage 5's successor work should be
scoped to traits first on this evidence, not to the action seat.

## Item 7 — "fallback stands down" counted separately. IT IS THE BIGGEST CAUSE.

Scoped to current code (427 blocks since 2026-10-15), with "nothing" defined
properly as *no signature row of any kind* — action, rider, seed, trait or
wildcard. (A first pass put 64% in "other" because it counted a missing ACTION
signature as nothing; 11% of those had landed a trait and 12% a wildcard.)

| cause | share |
|---|---|
| **print body: "nothing invented"** | **56%** |
| the TRAIT seat landed, the action seat did not | 17% |
| the call was asked and found no fit | 15% |
| no idea was produced for either seat | 6% |
| no shelf template shared a verb (no call made) | 3% |
| the value floor dropped it | 2% |
| a post-call veto dropped the pick | 1% |

**More than half of all empty signatures are the 2026-10-01 print-body ruling.**
The owner's reading — that "nothing" jumped 1% → 13% the day it landed — is
confirmed and it is now the dominant cause by a wide margin. Stage 5 item 4 ("a
lack frees its roles for refilling") addresses one corner of this; the general
case is bigger.

One correction to my own earlier reading: the "no idea produced" cause looked
like 33% across the whole archive, but it is **0% on 2026-10-16** and concentrated
in the September runs before the seat existed. It is an archive artifact, not a
current defect.

## Items 8 and 9 — these need routing, not me

- **Item 8**, a blind spot-check of 30 labels "by someone who hasn't seen the
  predicates": I wrote the predicates, so I cannot be that person. The 21-of-21
  check in phase 3 was fitted to the brief's own examples and should be read as
  such.
- **Item 9**, a second reviewer for the rewritten pins in a fresh session with
  only the diffs: same reason.

Both are ready to hand off; neither can be self-served.

## Item 1 — decline reasons. MOSTLY no_fit, AND THE DECLINES ARE MOSTLY RIGHT.

Run: `classes-eight-2026-10-16T15-53-29` (the first run in which the field
actually parsed — see the correction below).

| reason the call gave | count | share |
|---|---|---|
| **no_fit** | 19 | **95%** |
| already_answered | 1 | 5% |
| collision | 0 | 0% |

Ten of the twenty were declines of a template **the GM's own words had keyed** —
the cases that matter. Hand-labelled:

| # | reason | keyed template | the GM typed | right? |
|---|---|---|---|---|
| 1 | no_fit | `riposte` | a lizardfolk monk who strikes pressure points | **right** — riposte is a counter on a miss |
| 2 | already_answered | `faultless-tracker` | a tiefling rogue who stalks the rooftops | borderline |
| 3 | no_fit | `rally` | a knight who **holds the line** with a shield | **right** — a lone knight is not rallying allies |
| 4 | no_fit | `evasion` | a court wizard **never where you struck** | **right** — evasion is area damage, not displacement |
| 5 | no_fit | `bloodied-fury` | a skald who sings his **warband into a fury** | **right** — bloodied-fury is self-only |
| 6 | no_fit | `warded-mending` | a crusader who **mends her soldiers** | **right** — warded-mending *prevents* healing |
| 7 | no_fit | `assassinate` | a ninja who **strikes unseen** | **right** — assassinate is first-round only |
| 8 | no_fit | `sealed-body` | an imp rogue who **picks locks** | **right** — a word collision |
| 9 | no_fit | `herd` | a minotaur reaver who **herds prey into the maze** | **WRONG** — that is exactly herd |
| 10 | no_fit | `feint-slip` | a tabaxi cutpurse who **slips** through the crowd | borderline |

**7 right, 1 wrong, 2 borderline.** So the brief's three branches resolve as:

- not *mostly misreads* — the call is right to decline 7–9 times in 10, so
  **stage 5 item 3 (fit-call prompt work) is not the priority**;
- not *mostly already_answered* — 1 of 20, so the held-rate metric is not the
  thing to fix here;
- **mostly no_fit, and genuinely so → build the successor** (stage 5 item 1).

### The declines name a catalog gap, not a call gap

Read the "right" declines together and they are the same complaint four times:
the GM asked for something the catalog has no template for, and the key table
offered the nearest wrong thing.

- #5 — the GM asked to fury his **warband**; `bloodied-fury` is self-only, and
  `force multiplier` is one of the THIN shelves (4 templates for 16% of print).
- #6 — the GM asked to **mend her soldiers**; the keyed template *prevents*
  healing. `lay-on-hands` exists and was not keyed.
- #7 — the GM asked for shadow movement every round; `assassinate` is
  first-round only, and it is also a seat default with **no SRD 5.2 basis**.
- #9 — the one wrong decline, on a template that *does* fit and that landed on
  the same concept in an earlier run, so the call is inconsistent here rather
  than wrong in principle.

That makes **stage 5 item 7 (grow the catalog by print frequency and GM demand)
a peer of item 1, not a follow-on** — the successor needs somewhere to go.

### A correction to my own first pass on this item

The first collection run reported **27 of 27 declines unanswered**, which would
have read as "the call ignores the field". It was my bug: the prompt half of the
field landed and the `parseFit` half silently did not, so the answer was being
discarded before anything could count it. It parses now, normalises variant
phrasings, and keeps the raw value so the trace separates "the call left the
field empty" from "unrecognised: …". No conclusion should be drawn from that
first run.

## Item 2 — the asked receipt. THE CHECK WAS RIGHT; THE CALL QUOTES ITSELF.

Hand-judged all 20 refusals in the post-retirement runs: **6 false refusals
(30%)** — the four the owner named plus Vareth's blessing and the court wizard's
afterimage.

The cause took two measurements to find, and the first reading was wrong. Once
the trace distinguished the two failures, **all five refusals in the collection
runs were "the call quoted …, which is not in the GM's own words"** and none was
"the call offered no quote". So the call answers the field; it quotes **its own
invented idea text** rather than the GM's description:

```
call quoted: "vomit a roaring fan of scalding steam in a broad cone ahead of it"
GM typed:    "...that vents scalding steam over whatever climbs in"
```

The receipt is inside the answer, wrapped in prose the GM never wrote. Requiring
every significant word to be the GM's was therefore correct *and* refused real
asks. The engine now **extracts the longest verbatim span of the GM's own words**
out of whatever comes back; a span must be two significant words, or one
distinctive word of six letters or more, so a lone shared "iron" or "flies" is
not a receipt. Pinned against all five live cases plus the forged quote the
hold-1 pin turns on.

## Darkvision: the fallback was never the cause (2026-10-16)

The owner's call was to stop granting darkvision where print does not. Print's
rate by type, from the 329-row frozen corpus:

| default right | | default wrong |
|---|---|---|
| Dragon 100%, Elemental 88%, Undead 84%, Fey 80% | | Humanoid 4% (1 of 26) |
| Aberration 78%, Monstrosity 73%, Construct 70% | | Plant 0%, Ooze 0% (0 of 4) |
| Fiend 69%, Giant 60% | | Beast 43% — plurality only, left alone |

**My first fix did nothing, and the verification run is what caught it.** I changed
the senses *fallback* to be type-aware and shipped it on a green suite. The
stage4 smoke then returned all four Humanoids still carrying `darkvision 60 ft.`

The fallback was never reached. The prompt's own schema line read:

```
"senses": "<a senses line, e.g. 'darkvision 60 ft.'>",
```

The call echoed the example on every sheet — the HINT_ECHO shape we have already
fixed twice elsewhere. `kept` was non-empty, so the fallback branch never ran.

The landed fix is both halves, because they protect different things:
1. **The example is neutral now** — it no longer teaches one answer. That changes a rate.
2. **The engine validates the answer whatever supplied it** — a Humanoid/Plant/Ooze
   darkvision needs one of three warrants that already exist: a species kit that
   grants it (10 do), a word for it in the GM's own text, or a print body that has
   it. That is a rule, and a rule is what survives the next prompt edit.

**The law, which cost me two wrong reports today:** before fixing a default,
prove the code path you are about to change is the one executing. A green suite
after a dead edit looks exactly like a green suite after a live one — only the
live run tells them apart. The same error shape produced the Claim C 56× miss
(a summary line read as a cause) and the stage-3 item-2 misattribution.

## The `asked` receipt: the call was told to quote text it was never shown (2026-10-16)

The critic's hold 5 read the receipt refusals as the call *declining* to quote,
and proposed re-asking it. The evidence says otherwise, and the real cause was
free to fix.

`buildFitPrompt`'s labeled blocks were MONSTER, THE SHEET SO FAR, THE IDEA and
TEMPLATES. **The GM's typed words were not among them** — `concept` was passed in,
but only to rank the template menu's verb matches. The instruction read "quoted
verbatim from the description", and the only description in front of the call was
THE IDEA: the engine's own generated prose. So the call quoted the idea, and
`vetAsked` correctly found none of it in the GM's text.

The rejected quotes read exactly like that: *"vomit a roaring fan of scalding
steam in a broad cone ahead of it"*, *"the shockwave rolls outward like a
thunderclap"*. No GM typed those.

This is the same law as `clauses` (generate.mjs:415), which had already solved the
identical ambiguity in the identical prompt family — *"quote from THE USER TYPED
line here … never from the description above it"*. The `asked` field never got
the treatment. **One definition, every reader.**

### Measured

| | blocks | non-verbatim | no quote | **quote kept** |
|---|---|---|---|---|
| pre-fix (3 runs) | 48 | 5 | 3 | 0 |
| post-fix (2 runs) | 32 | **0** | 5 | **2** |

Runs: pre `classes-eight-2026-10-16T{15-39-15,15-53-29,18-43-46}`; post
`classes-eight-2026-10-16T{19-28-28,19-45-25}`. Counted over `[0-9]*.md` only —
`all.md` duplicates every block's trace and inflated my first table 2×.

Both accepted receipts hand-check as verbatim: "stalks the rooftops" ⊂ *"a
tiefling rogue who stalks the rooftops of the old quarter"*; "never where you
struck and steps away" ⊂ *"a court wizard who is never where you struck and steps
away"*. The non-verbatim elimination is the solid half (0 in 32 against 5 in 48,
the mechanism's own prediction). The "more receipts accepted" half is 2 against 0
and is too thin to carry a rate.

## A cited row must exist — the hole the receipt fix opened (2026-10-16)

Accepting more receipts lands more library rows, and one shipped broken: the
Court Step-Wizard's `Missed Step Riposte` (template `snap-shot`) cited a
**Longbow** on a sheet whose attacks are Slam and Spellcasting. The checker
failed it as `dangling-ref`; generation had built it without complaint.

The predicate lived in the checker alone, so the two readers could disagree. It
is now `danglingRefIn(text, names)` + `rowNamesOf(m)`, exported from checker.mjs
and called by both — generation refuses a render the checker would fail.

**Writing the pin found a latent bug in that predicate.** The capture
`([A-Z][\w' -]+?)` leaned on a lookahead list of following words and over-ran
anything the list missed: `uses Slam against the attacker` captured the whole
tail, so a legitimate row read as dangling. Harmless while only the checker read
it (it reported after the fact); a silent false refusal once generation reads it
too. Bounded to a title-case run, which is what a row name is.

Old regex vs new, same session, 12 runs / ~117 blocks: **identical verdicts** —
no FP and no FN introduced.

**What is NOT yet proven:** the generation-side refusal has no live or pinned
exercise. `classes-eight-2026-10-16T19-45-25` came back 0 FAIL of 16 with zero
dangling refs, but the guard's trace never fired — the condition did not recur,
so the clean run is not evidence the guard stopped it. The predicate has 4 pins;
the wiring has none.
