# Ask the call, don't grow another regex

**Trigger:** you are about to add a regex, a word list, or a lookup table to the
reskin engine that reads the GM's prose or a coined row name to decide something.

## The principle (owner, 2026-10-15)

> "If we can ask llms specific questions to populate metadata, that's the route
> we usually want to go unless the options to choose from are too numerous and it
> dilutes the prompt."

The call that writes a thing is the one that knows what it meant. The engine's
job is to hold facts, do arithmetic, and demand a receipt — not to re-guess
intent from the words. Phrased as the rule this sprint already runs on: **the
call judges, the engine validates.**

So before adding a pattern, ask which of these you are writing:

| | belongs to | why |
|---|---|---|
| "which weapon is a *Hurlaxe*?" | **the call** | intent, unbounded phrasings, one short answer |
| "what damage does a handaxe deal?" | **the engine** | a fact from print's table; nobody is choosing |
| "is +8 STR 18's mod plus PB 4?" | **the engine** | arithmetic |
| "does this row's name match what it deals?" | **the engine** | a gate, with a receipt |

A question goes to the call when the answer space is open and the answer is
short. It stays in the engine when the answer is a fact, a number, or a
predicate over the finished sheet.

### The dilution limit

Each question costs prompt budget and attention. Two tests before adding one:

1. **Can it ride a call that already exists?** The weapon question rides the
   call that *names the rows* — it is one more key in a JSON object it was
   already returning, not a new call. That is nearly free.
2. **Is the option space small enough to state, or open enough to leave open?**
   "Which weapon, in plain words, or none" is open-ended and short. A question
   that would need forty options listed in the prompt dilutes it — keep that one
   deterministic, and have the call answer in plain words you resolve against
   the table instead.

## The measurement (2026-10-15, before the weapon landing)

The deterministic pile at the time of writing:

- **10 regexes** reading weapon words out of names and prose, in 5 files
- **12 tables** restating print's weapon facts (type, range, reach, mastery,
  heavy, finesse, launcher, thrown)
- **88 predicate rules** in the checker

The 88 predicates are *correct* deterministic code — they are gates over a
finished sheet, each with a receipt, and they are what lets the call be trusted.
They are not the problem. The 10 regexes and 12 tables were: the same fact
written a dozen times, each added on a different day, drifting apart.

Two live defects came from exactly that drift:

- a **Shortsword** dealt Slashing because one copy of the facts only knew the
  word "sword" (critic, 2026-10-14)
- a **Hurlaxe** printed 60/240 — a longbow's range — because no copy saw the axe
  inside the coined word (critic, 2026-10-14)

## Landed

**One weapon table + one question.** `reskin/weapons.mjs` holds 40 entries of
print's 2024 weapon facts and three resolvers: `weaponNamed` (a plain-words
answer), `weaponFor` (reads a name — the *fallback*, not the decider), and
`weaponProp`. The main call now answers `"weapons": { "<row name>": "<the
mundane weapon it is, in plain words, or none>" }`.

Resolved once onto the row (`e.weapon`) right after the renames land, so no
consumer re-derives it. Retired in favour of it:

- `generate.mjs` — `WEAPON_TABLE`, `THROWN_HEAD`, `LAUNCHER_NAME`, `REACH_10`,
  `MUNDANE_L`, `MUNDANE_R`
- `checker.mjs` — `RANGE_OF`, `LAUNCHER`, `NEVER_RANGED`, `THROWN_NOUN`, `MUNDANE`
- `features.mjs` — `HEAVY`, `MASTERY`
- `scale.mjs` — `MUNDANE_MELEE`, `FINESSE_W`
- `templates.mjs` — `PROJECTILE_WEAPON` and its duplicate `projWeaponRange`
- `header.mjs` — the weapon half of `ANATOMY`, now **derived** from the table
  (four entries print tuned by hand stay tuned: javelin, lance, spear, pike)

Pins: `reskin/__tests__/weapons.spec.js` — 24, including the two that hold the
split. "Fangblade" + the answer "a shortsword" proves the call's answer beats
the name's reading; no answer at all proves the name still carries the row.

## The audit (2026-10-15, owner: "find the blatant offenders")

**The criterion is churn, not size** (owner): "on precise regex matches we may
keep because they're cheap, but if we're piling on fix after fix to accommodate
an ever expanding number of edge cases, we need some sort of metadata key to be
returned."

So the metric is **how many commits have touched that line**, measured with
`git log -L <line>,<line>:<file>` over all 164 cue constants in
`reskin/` + `format-2024/`.

### The scoreboard

| patches | cue | file | what it is really asking |
|---|---|---|---|
| **10** | `JOB_TAIL` | generate.mjs | is this two-word print name a family or one creature holding a post? |
| **9** | `ROLE_HEAD` | generate.mjs | *(the other half of the same question)* |
| **6** | `SPECTRAL_COMPOUNDS` | generate.mjs | does "-fire" in a coined name mean Fire damage, or is it imagery? |
| **4** | `TETHER` | generate.mjs | does this name a thing that reaches out and holds? |
| **4** | `CASTER_WEAPON` | generate.mjs | which mundane weapons does a caster carry? |
| **4** | `ANAT_STAMP` | generate.mjs | is this noun a body part? |
| **4** | `REQUIRES_IMPOSED` | templates.mjs | *(a Set of our own template ids — not prose)* |
| **3** | `HINT_ECHO` | generate.mjs | is this name one the model keeps reaching for? |
| **3** | `MENTAL`, `RIDES_THE_BOW` | templates.mjs, generate.mjs | *(Sets of our own template ids — not prose)* |

For scale: **48 inline regexes** are tested directly against the GM's own words
(25 in generate.mjs, 10 in checker.mjs), and **17 of the 75 named cue constants**
read the GM's prose rather than the sheet.

### Four classes, and only two of them are offenders

**A. An unbounded generative space chased by an exception list.** THE blatant
class. The space is infinite, so the list can only ever grow.

- `SPECTRAL_COMPOUNDS` (6 patches) is the clearest case in the engine.
  `nameClaimSatisfied` gates "does the coined name's element word match the
  damage the row deals" — a fine gate. The escape hatch is a literal list of
  folklore compounds whose fire does not burn: `witchfire, foxfire, balefire,
  marshfire, ghostfire, coldfire, wispfire, corpsefire`. Six patches, one per
  newly coined compound, and the next ones are already obvious (spiritfire,
  hexfire, moonfire, soulfire, gravefire).
  **The call already returns `damage_types` for this very row.** It coined the
  name and declared the type; it is the only thing that knows whether its own
  "-fire" was literal or imagery. One field — `name_element: literal | imagery`
  — and the list stops growing. Today's regex becomes the fallback.
- `HINT_ECHO` (3) is the same shape, smaller: five literal names the model keeps
  reaching for (`Dreadful Glare`, `Deathless Strike`, `Flame Whip`, `Arcane
  Burst`, `Blade Scatter`). An exception list over a generative space.
- `TETHER` (4) and `ENGINE_KEY_WORD` (a 50-word alternation on the concept) ask
  "does the GM describe a creature that reaches out and holds / seizes and
  swallows?" Open phrasing, binary answer, and the fit call already has the
  concept and the menu in hand.

**B. A closed corpus fact being inferred from words.** `ROLE_HEAD` + `JOB_TAIL`
together carry **19 patches** — the most-churned pair in the engine — and they
are inferring, from two words, something that is simply **a fact about 119
specific print names**. "Warrior Veteran" is a family; "Goblin Boss" is one
goblin holding a post. There is no open space here at all: the corpus is 329
blocks, 119 of them two-word, and it does not change between releases.

This one does **not** want a per-generation call. It wants the 119 labeled
**once** — offline, eyeballable in a minute, stored as a field on the block
(`srd52-monsters.json` already carries a `flags` key). Then two regexes and
nineteen patches of history delete, and a new print name costs a data edit
instead of a code patch. Today's rule gets a defensible 14/119 split; the cost
is not that it is wrong, it is that every new name shape costs another commit.

**C. Still more copies of facts already centralized.** The weapon landing missed
two:

- `CASTER_WEAPON` (4 patches) — 8 of its 14 words are `weapons.mjs` entries
  (staff, quarterstaff, dagger, scimitar, club, mace, spear, sickle); the other
  six are props, not weapons (scythe, cane, rod, sceptre/scepter, knife-as-alias).
  Should read the table plus a tiny prop list.
- `ANAT_STAMP` (4 patches) — all but three words (`stingers`, `pincer`,
  `pincers`) are already keys in `header.mjs`'s `ANATOMY`. Should read it.

**D. Sets of our own template ids** — `REQUIRES_IMPOSED`, `MENTAL`,
`RIDES_THE_BOW`, `NEEDS_ENGINE_KEY`. These are catalog metadata about templates
we wrote. Correctly deterministic; they only want to live as a field on the
template entry instead of a Set in another file. No correctness risk, lowest
priority.

### One finding the churn metric cannot see

`NEG_CUE` has been patched **once**. By the stated criterion it is cheap and we
keep it — except that a probe of seventeen realistic GM phrasings misreads
**thirteen**:

| read as *has* but means *lacks* | read as *lacks* but means *has* |
|---|---|
| "it is blind", "eyeless and deaf", "born mute", "wingless", "sightless", "it lost its wings in the fall", "devoid of eyes", "bereft of legs", "robbed of sight", "stripped of its voice", "its eyes were put out long ago" | "it has not one but three eyes", "a knight who never yields" |

It is stable because nobody is reporting the misses, not because it is right —
a regex over negation only ever catches the *grammar* of negation, and English
says "lacks" with adjectives (`-less`, blind, mute) and with verbs (lost,
stripped, robbed) far more often than with "no" or "cannot".

**And the checker holds a byte-identical copy**, so the gate cannot catch any of
them. That is the structural half of this finding: **eight cue regexes exist in
both `generate.mjs` and `checker.mjs`** — `NEG_CUE`, `VULN_CUE`, `IMM_CUE`,
`RES_CUE`, `SPEECH_CUE`, `SIZE_HEADER`, `COND_WORD`, `DMG_TYPE_WORD` — seven
byte-identical and one differing only in letter case. A gate that re-derives the
generator's own guess can only ever check that the generator honored its own
reading; it is blind to the reading being wrong.

The fix is unusually cheap: **`polarity: 'lacks'` is already a field on the
clause record** (`generate.mjs:876`), set from `NEG_CUE.test()` and read by seven
consumers including the checker's own gate. Only *who fills it* is wrong. The
extraction call already returns these clauses.

### Landed from this audit (2026-10-15)

**`polarity: has | lacks`**, folded into the `clauses` object the main call
already returns — no new pass. Live measurement in
`scripts/smoke-evidence/POLARITY-case-2026-10-15.md`: the call read **6 of 9**
right on the first run, and all six were cases the regex gets wrong; its three
errors shared one shape (it smeared one sentence's polarity over every clause in
it) and one of them deleted a GM-asked-for ability. Fixed in the prompt (polarity
is per clause; most clauses are "has"; the live failure as the example) **and** in
the engine (a claimed lack must name the absence in its own words — a negation, a
privative adjective, or a verb of loss). 9/9 after. 

**The general lesson for the remaining questions: the call is good at meaning and
careless about scope.** Every folded-in field wants a receipt check on our side —
not a detector (that is the regex we are replacing), just a demand that the
answer point at something in the text it claims to describe.

**Still open, exposed by that landing:** polarity is right, but the consumer that
decides *what* is lacked finds it by slicing the words after the negation word —
so an adjective lack removes nothing. "a born-mute bodyguard" is labelled lacks
and still ships `Languages Common` where print would write "understands Common
but can't speak". This is `acts_on` generalized: **what does this clause take
away?** — and the call labelling the polarity has the answer in the same breath.

**`name_element: literal | imagery`** (ranked item 1) — landed, evidence in
`scripts/smoke-evidence/NAME-ELEMENT-case-2026-10-15.md`. Measuring
`SPECTRAL_COMPOUNDS` first reframed it: a CLOSED compound never claimed anything
(the word boundary blocks it), so all six patches were adding HYPHEN spellings,
and three of its eight entries could never fire at all. print's real rule is
about form — a fused element word makes no claim, a standalone one does — so the
engine checks the form (`elementFused`) and the call judges which fused compounds
are folklore. Receipt: `imagery` believed only on a fused word, so a bare "Flame
Lash" cannot dodge the gate. Confirmed live in both directions.

**The 119 two-word print names, labelled** (ranked item 3) — landed, evidence in
`scripts/smoke-evidence/PRINT-NAMES-case-2026-10-15.md`. `ROLE_HEAD` and
`JOB_TAIL` deleted (19 commits between them). Not a call: a per-name FACT, in
`reskin/print-names.mjs`, frozen from the old rules' verdict and corrected in
three places. The freeze is pinned by re-deriving the old rules — which caught my
own table silently dropping two names. A new print name now fails the coverage
pin and gets labelled in data instead of patched in code.

### Recommended order

1. ~~`polarity` on the extraction call~~ — **landed 2026-10-15**
2. ~~`name_element`~~ — **landed 2026-10-15**
3. ~~Label the 119 two-word print names~~ — **landed 2026-10-15**

Remaining:

1. `CASTER_WEAPON` and `ANAT_STAMP` point at the tables that already exist.
2. `TETHER` / `ENGINE_KEY_WORD` as a field on the fit call.
3. `acts_on` generalized — *what does this clause take away?* — the gap the
   polarity landing exposed (born-mute still ships `Languages Common`).
4. `HINT_ECHO` — second sighting in `branch-element` run 1; same class as
   `name_element`, so the same shape of fix should apply.

## The three questions still to ask

Same shape: each rides a call that already runs, each replaces a cue regex.

1. **`polarity: has | lacks`** on each clause, replacing `NEG_CUE`. The engine
   currently reads "no eyes", "cannot speak", "without wings" with a negation
   regex, and a phrasing it has not seen reads as a *has*. The extraction call
   already returns the clause; it can label it.
2. **`acts_on: self | others | none`** on each ability. Several gates
   (`interior-energy`, the swallow gullet, `coating`) approximate this from
   verbs. The call that writes the ability knows.
3. **`names: object | action | trait | lore`** on each rename. `inline-correctness`
   and the head-word rules guess this from shape, and the "of the …" tail case is
   a known false positive ("Herdmaster of the Storm-Plains" heads on "the
   herdmaster").

Land them one at a time, each with: the question on an existing call, the engine
validating the answer against something closed, a pin proving the answer wins,
and a pin proving a missing answer still works.

## What NOT to move to the calls

- the checker's 88 predicates (gates with receipts over a finished sheet)
- every arithmetic path: CR bands, DPR, hit dice, DCs, attack bonuses
- print's own facts: donor stats, the weapon table, the condition list
- the never-fail fallbacks — a call that fails must still ship a sheet
