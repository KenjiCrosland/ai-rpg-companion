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
