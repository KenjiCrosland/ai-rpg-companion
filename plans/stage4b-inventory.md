# Stage 4b, step 1: the meaning-table inventory

Owner's ruling, 2026-10-16: *meaning is a call field, never a word list.* Code may
validate a call's answer, keep closed facts, and act as a fallback when the call
fails — never as a tiebreaker against it.

**No behavior changed for this inventory.** It is a list, and it stops here for
the owner before step 2 (the schema).

## Method

142 named regex / array / Set constants live in `reskin/*.mjs`. The ruling's test
is narrower than "is it a word list": a list of damage types used to validate an
answer is a closed fact, and a regex read over an engine-generated row is a
validator. What the ruling forbids is **reading the GM's own words to decide what
they meant**.

So the sweep kept only constants tested against a GM-text variable (`concept`,
`userConcept`, `srcText`, `rawConceptText`, `verbText`, a clause's `text`):
**28 constants**, plus 9 rules the brief names by phrase rather than by
identifier. Script: `scratchpad/inv.mjs` (re-runnable).

## A. Meaning decisions — these are what stage 4b moves

| rule | where | what it decides | the call field that covers it |
|---|---|---|---|
| route keys + "the VERB outranks the noun" | `route.mjs:329,352` | archetype / seat / line | resolve call's `archetype`, `seat variant` |
| `MECHANIC_STYLE` "needs a key in the words" | `route.mjs:392` | may a charger keep its style | `mechanics`, with a receipt |
| `MAGIC_WORD` | `route.mjs:192→281` | may a caster line be chosen | `class` (mage) / `mechanics` |
| `ARCHER_NOUN` | `route.mjs:193→280` | may skirmisher-archer be chosen | `seat variant` |
| `SWARM_WORDS` | `route.mjs:183→271` | is this a swarm | `species` / `kind` |
| `TRAP_WORD`, `GRAPPLE_WORD`, `CHARGE_WORD` | `route.mjs` | gate three mechanics | `mechanics` |
| `OF_PHRASE` | `route.mjs:103→130,146` | "priest **of a drowned god**" — suppress an attribute inside a phrase | the call reads the phrase itself |
| `classFor` key table | `classes.mjs:119` | which of the eight classes | `implied_class` (landed, stage 4 item 2) |
| **`soloLen: 5`** | `generate.mjs` | may one five-letter word be a class receipt | the receipt predicate itself |
| "a MEAT body earns its trait by a verb" | `generate.mjs:3617–3622` | may a meat body keep its trait | `mechanics` receipt |
| "the key table finds no verb either" | `generate.mjs:3367–3368` | fit / rider / nova vetoes | the fit call's `asked` receipt |
| `removalClauses` | `lexicon.mjs:211` | what the GM takes away — **banned "grows"** (Silver Toll Troll) | `lacks`, with a receipt |
| `LACK_PHRASE` | `templates.mjs:314` | is a template's mechanic denied | `lacks` |
| `NEEDS_ENGINE_KEY` + `ENGINE_KEY_WORD` | `templates.mjs:335–336` | may swallow/hook-drag/snatch/reel land | `mechanics` receipt |
| `NEG_CUE` | `generate.mjs:948`, `checker.mjs:501` | polarity (has / lacks) | `polarity` — **already a call field**; this is the tiebreaker the ruling forbids |
| `MECH` (in `kindOf`) | `generate.mjs:~1032` | is a clause mechanical or descriptive | the clauses field's `kind` — **already a call field** |
| `NAME_CLAIMS`, `ENERGY_WARRANTS` | `generate.mjs:520–521` | energy from name words | `energy` (this is stage 3 item 1) |
| `DRAGON_COLOR` | `species.mjs:15` | a dragon's energy from its colour | `energy` |
| `SPECIES` keys | `species.mjs:21` | which species kit | `species` |
| `SPEECH_CUE`, `SPEECH_STOP` | `generate.mjs:953`, `checker.mjs:508` | did the GM speak about speech | `lacks` / a speech field |
| `VULN_CUE` | `generate.mjs:950→4233` | did the GM ask for a vulnerability | `mechanics` / `lacks` |
| `SIZE_HEADER` | `generate.mjs:949→5348` | did the GM set a size | the clauses field's `kind: header` |
| `PART_NOUN`, `PART_STOP`, `PART_THROWN` | `generate.mjs:1126–1133` | which body part / weapon the GM named | `mechanics` / a parts field |
| `DIGS`, `NEGATED_FLIGHT`, `TETHER` | `generate.mjs` | movement and its negation from idiom | `mechanics`, `lacks` |
| `STYLE_CUE` | `features.mjs` | is this a trained fighter | `class` / `archetype` |
| `FLAMMABLE` + `materialVulnerability` | `header.mjs:183→195` | does the material burn | `mechanics` receipt (material is a closed fact; the *inference* is not) |
| "proper noun … no article in the words" | `generate.mjs:2531` | is the Name a person or a kind | `person or kind` |
| **`SAYS_WHEN`, `SAYS_OFTEN`** | `generate.mjs` | does the clause name a trigger / a limit | the asked fields' own receipt |
| **`gmSaid` (darkvision)** | `generate.mjs` | did the GM ask to see in the dark | a senses receipt |
| `LACKS_STOP` | `generate.mjs` | which words are insignificant in a receipt | borderline: a stopword list serving a predicate |

**31 rules.** Three of them in bold are mine, from today — see below.

## B. Closed facts and validators — these stay

`TYPES`, `SIZES`, `CONDITIONS`, `DAMAGE_TYPES`, `STATS`, `SPELL_MENU`,
`EXTRA_MECHANICS`, `SHELF_NAMES`, `TEMPLATES`, `GATES` (enumerations, used to
build a prompt's closed list or to validate an answer); `WEAPONS` / `weaponFor`
and `PRINT_DUAL_RANGES` (print's own weapon facts); `TEXT_GATE`, `rowWhen`,
`rowOften`, `danglingRefIn` (read engine-generated row text, not the GM's words);
CR and damage math.

## C. Three rules I added today, which this ruling forbids

I wrote these before the brief arrived, and each is a word list deciding what the
GM meant. Listing them rather than leaving them:

1. **`SAYS_WHEN` / `SAYS_OFTEN`** — gate an asked trigger/limit on a trigger or
   frequency word being present in the clause. Built because the call
   over-answered (`"mends her own wounds"` → `on_hit` + `at_will`). The ruling's
   answer is a receipt on the field — the call quotes the words that name the
   trigger — not a vocabulary of trigger words.
2. **`gmSaid`, the darkvision warrant** — a word list for "did the GM ask to see
   in the dark". I had already narrowed it once after it read "moves through the
   shadows" as a request. That narrowing is exactly the endless-tuning the ruling
   is aimed at.
3. **`soloLen: 5`** — a length rule standing in for "is this word a class noun".
   The brief names it directly.

**Recommendation:** fold all three into step 2's schema rather than revert now.
Reverting restores the defects they fixed (invented darkvision, counted
over-answers) with nothing in their place, and the schema lands before stage 5
anyway. If you would rather they come out immediately, say so and I will revert
them and accept the regressions in the interim.

## D. Where a count can be guarded (step 5)

The guard test should count rules in section A from this file. 31 is the baseline;
the test fails if it rises. The sweep script makes the count reproducible rather
than hand-maintained, though it needs the A/B classification to stay a hand
judgement — a new constant lands in A or B by review, not by regex.

## E. The receipt for the precedence flip

Run `smoke-out/stage34-2026-10-16T20-49-59`, block 07, Oathwound Vangard —
*"a berserker who flies into an unstoppable rage once per day when wounded"*,
shipped Humanoid with **Fly 70 ft.** and **DEX 20** on a `skirmisher-8-winged`
donor. Its own trace, lines 91–93:

```
[route]   skirmisher-winged type=Humanoid mechanics=none — brute: ✓ ("a berserker who flies into an unstoppabl")
          | brute -> skirmisher-winged: the concept's VERB outranks the noun (key "flies", class verb)
[concept] hints: winged→style ✗ ("flies into an unstoppable rage")
[concept] resolve: archetype=skirmisher type=Humanoid themes=aerial/bestial ... style=winged
```

**Both calls were right and the table overruled both.** The route call chose
`brute: ✓`. The hint call marked `winged ✗` against the very phrase. The keyword
rule "the concept's VERB outranks the noun" then promoted `flies` over
`berserker` and the sheet grew wings. No amount of prompt work could have
prevented this: the prompts already answered correctly.

This is the strongest single argument in the inventory for step 3, and it is a
ship blocker in its own right — a CR 8 berserker with Fly 70 ft. and DEX 20
instead of STR is not a sheet a GM can use.

### A correction to my own report on this block

I reported this run's `attack-stat` FAIL — *"Greataxe: +8 derives from DEX, but an
attack row rolls STR"* — as a pre-existing family (12 of 188 saved runs, 7 of them
the same "Mace derives from DEX" shape) and not from the new fields. The
frequency claim is true and the fields are not the cause, but the conclusion was
wrong: on THIS block the DEX attack is a **symptom of the winged misroute**. The
chassis is a DEX skirmisher because the table sent it there, so the kit's
Greataxe derived from DEX.

I classified a failure by its rule name and its history and never asked why this
particular block had it. The hand check I insisted on for the asked metric, I
did not apply to a FAIL I had a comfortable explanation for.

## F. The flying berserker, measured — and what it actually proves

Worked 2026-10-16 with a new prompt-level probe, `scripts/probe-identity.mjs`
(N samples of one prompt through the dev proxy, so a classification is a RATE).

### The prompt gap was real, and it is closed

The identity prompt said *"The identity IS that chassis embodied"* and was handed
a chassis named `skirmisher-winged`. The call obeyed. Measured, 5 samples each:

| prompt | `aerial` |
|---|---|
| no `line` passed | **0/5** |
| `line: 'skirmisher-winged'` | **5/5** |
| + the `readPhrases` concept (the real flow exactly) | **5/5** |

One parameter moved the classification from never to always. The call was not
misreading an idiom; it was following an instruction.

**The fix** separates the chassis's two jobs: it owns HOW IT FIGHTS, and the GM's
words own WHAT IT IS (`themes`, `creature_type`, `mind`), with the user's words
winning any disagreement and the cue marked rejected in `hint_verdicts`.

Verified with the line still forced on, 5 samples each:

| case | result |
|---|---|
| berserker, `skirmisher-winged` forced | `aerial 0/5`, `bestial/armed` x5, `hints: flies✗ winged✗` |
| storm roc on the SAME winged line (control) | `aerial 5/5` |
| iron golem (control) | `forged 5/5` |

And on the clean 6-concept probe: **0/30 misreads**, both controls intact
(`scratchpad/pA.log`). End to end, `smoke-out/idiom-2026-10-16T22-03-01`: the
berserker reads `bestial/terror`, the iron-willed inquisitor `armed/mind` (it was
`forged/armed`), the troll keeps `regenerator`, the roc keeps `aerial` + Fly 120.

### What the prompt cannot fix

**The berserker still ships `Fly 70 ft.`** The donor is `skirmisher-8-winged`,
chosen by the route table, and themes do not pick donors. The call's own
`winged→style ✗` is produced and then discarded: `rejectedCanon` is consumed at
exactly one site, `generate.mjs:4468`, the name-canon skip. **The route never
reads it.**

The trace order is the reason, and it is the architectural fact stage 4b needs:

```
line 91: [route]   brute: ✓ ... | brute -> skirmisher-winged: the VERB outranks the noun (key "flies")
line 92: [concept] hints: winged→style ✗ ("flies into a rage")
```

**The table decides before the call is asked.** A precedence flip that only
changes who wins a tie will not help here: at the moment of routing there is no
answer to prefer, because the question has not been put yet. Step 3 therefore
needs one of:

- **re-route on a rejected cue** — after the concept call returns, if the route
  used a cue the call explicitly rejected for that field, route again without it
- **ask before routing** — put the cue question to the call first, and let the
  route consume verdicts rather than keys

The second is the ruling's shape. The first is smaller and testable now.

### Corrections to my earlier reports on this block

1. I wrote that "both calls were right and the table overruled both." Half right:
   the hint call did reject winged, but the identity call answered `themes=aerial`
   — because the prompt told it to. The owner's reading was correct.
2. I called the classifier nondeterministic on the strength of `✗` in one run and
   `✓` in the next. It is stable at 5/5 when asked cleanly; I was comparing two
   runs whose prompts differed.
3. I guessed the archetype was priming it. Measured: `archetype: 'skirmisher'`
   gives `aerial 0/5`, identical to `brute`. The channel was `line`, not
   archetype.
4. The run's `attack-stat` FAIL (`Greataxe: +8 derives from DEX`) is **downstream
   of this misroute** — the winged skirmisher chassis is DEX-based. I had filed it
   as an unrelated pre-existing family. It should clear when the routing does.

## G. The critic's gate-4 read, worked (2026-10-16)

Run under audit: `smoke-out/classes-eight-2026-10-16T22-10-02`.
Every claim I checked was correct. Two had the right conclusion and the wrong
mechanism, and one is worse than reported.

### Fixed: hold 2 was THREE cap paths, not one

Confirmed: `Patient Defense yielded to print's row cap 4`, `Rampage` and
`Bolstering Cry` to cap 5, while all five successful evictions were Traits.

1. **`evictForCap`'s `tier()` had `e.rules` in the never-evict list.** `Fleet
   Agility` — the brief's own example of chassis filler — was protected, and was
   the only candidate on the monk's sheet. `rules` is not provenance: `scale.mjs`
   stamps it on the donor's own agility and cunning rows, while print rows carry
   `print` beside it. Dropped from the never list; `print` still guards print.
2. **Fixing that exposed a third path.** With Evasion now landing, the **trait
   ceiling** evicted the rogue's *owed* `Assassinate` for a concept-bound
   signature — inverting the order, because a kit row carries a template id too.
   The ceiling now takes only a non-kit, non-owed row, and otherwise the newcomer
   stands down, which is the answer the row cap already gives.

`classes.spec.js` caught both of my wrong attempts (a too-broad `referenced()`
guard, then a fallback that picked the kit row anyway). 71 suites / 2799 passed.

**One correction to the critic:** the cause is not "eviction works for traits but
not for bonus actions" — `evictForCap` always covered Bonus Actions and
Reactions. It is that the only evictable candidate on those sheets was a `rules`
row. Same defect, different mechanism, and it matters for whether the fix
generalises: it does.

### Confirmed: "fallback stands down … nothing invented" is a lie

It prints on exactly the four sheets named — Dire Wolf, Vigil, Keyhole Shade,
Kaelen — and all four then draw a seed. Three are dropped by the value FLOOR
("a seed that cannot be lifted does not ship"), not by the stand-down; Kaelen
ships `unnerve` as Stalwart Presence on a print body. **Stage 2's 1% stand-down
share was counted from this line and needs re-counting from what shipped.**

### Coverage: right conclusion, worse mechanism

The critic read the Labyrinth Warden as over-credited. What the recorded clause
list actually shows:

| block | recorded clauses | gate table |
|---|---|---|
| Labyrinth Warden | head `"a minotaur reaver"` + `"herds prey into the maze"` (both **descriptive**) | 1/1 |
| Winter-Pack Dire Wolf | head `"a dire wolf"` + `"hunts in a pack"` (both **descriptive**) | 0/1 |
| Thurivald | **none recorded at all** — the trace printed two | 0/1 |

Three different denominator behaviours from the same clause shape, and on
Thurivald `generation.clauses` is empty while the trace shows
`"Thurivald — a skald"` and `"sings his warband into a fury"`. So coverage is not
merely mis-crediting: **its input is missing on at least one block of sixteen.**
The 84% cannot gate anything until that is fixed and hand-checked.

**The upstream defect, and it is a classification one:** every clause involved —
`"herds prey into the maze"`, `"hunts in a pack"`, `"sings his warband into a
fury"`, `"shields the weak"` — is tagged **descriptive**. Herding, pack tactics,
a fury-song and shielding an ally are mechanics, and there are templates for
three of them. The clause `kind` is a call field, so this is measurable with
`scripts/probe-identity.mjs` and belongs with stage 4b, not with the coverage
arithmetic.

### Still open from the critic's list

- the weapon stamp's three sources of truth (they are right that my Spear
  verification was insufficient: `weapon=scimitar` was still underneath)
- the re-roll path skipping main-path rules (Vesper, Vareth)
- Dame Oriel's Guarded Stance + AC 19 at CR 5 as a balance trap
- Mira's Cutpurse's Finisher priced as if its Incapacitated precondition held
- the sameness counts (Evasion on 5 of 16, rally on 3, retort on 3, six guardian
  ideas landing none) — stage 5 items 1, 2 and 5
- walking one instance of each "pre-existing family" filing back to its cause
