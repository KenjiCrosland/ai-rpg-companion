# Response plan — the critic's read of the dispatcher forty (2026-10-19)

**Trigger:** the critic's read of `RELEASE-for-critic-2024-2026-10-19-lurker.md` (the forty +
classes-eight + twist-ten + twist-five). Verdict: the dispatcher works, zero wrong-creature sheets
at the body; the twist pipeline is over-tightened; three class bodies carry the wrong weapons.
~30 ship / ~14 fix-lite / 1 fix (last package 20 / 20 / 8). Steps 6–7 of the Five Pipelines brief
wait behind this.

**Laws in force:** meaning is a call field, never a word list; a receipt is a span of the GM's own
words and the engine checks the quote; one definition, every reader; a normalisation runs after
everything that can change its input; a gate may shape what the GM asked for, never remove it;
verify the branch fires; print overrules reviewers; the owner commits.

## A. The twist seat refuses too much — FIX FIRST

**What happened.** `asksATwistClause` (step 4) accepts a receipt only when it lies in a clause the
identity call tagged *mechanical* and no part/feature row already answers. Most twists are tagged
*descriptive* ("carries stolen voices", "with a frost-rimed hide"), so the seat declined them and
print shipped under a new name — correct and inert. Four of ~20 twists landed a row.

**Mechanism.** The tag is the identity call's classification of a phrase; the FIT call with a
receipt is the judge of whether a clause earns a row. So:
1. A receipt may point at ANY clause that is not the head, not a header directive (size/speed/AC/
   HP/CR), and not a lack. The mechanical/descriptive tag does not gate the seat.
2. "Answered by a part row" blocks a receipt only when the receipt names the WEAPON itself (the
   part's span), not when it names another half of the same clause ("keeps the line with a shield"
   → the shield is answered; "keeps the line" is not).
3. The receipt is vetted against the GM's RAW words, read before the lack sweep masks anything
   (the Hydra: "smoke" was in the words; the sweep had consumed the clause). A clause that holds a
   lack and a positive half ("stumps smoke instead of regrowing") keeps its positive half as a
   candidate.
4. The `[verb: …:concept]` route stays, under the same clause test.

**Site.** `generate.mjs`: `asksATwistClause`, `namesTheBodyOnly`, and where the receipt is vetted
(`vetAsked`/`rawConceptText`); `clauseRecord` carries `head`, `kind`, `polarity`, `takes`.
**Done when.** Pins: Air Elemental + "carries stolen voices" lands a mimicry row with its receipt;
Dire Wolf + "frost-rimed hide" lands a cold/hide row; Hydra + "stumps smoke instead of regrowing"
loses regrowth AND lands the smoke half; Dame Oriel's "keeps the line with a shield" lands a
hold row beside the shield bash. Then twist-ten + twist-five: every twist sheet carries one row
with a receipt where the prompt asked for one, and still no shelf, no floor, no filler.

## B. The class-body table — FIX

**What happened.** Three of eight classes stand on bodies whose weapons contradict the class:
monk → Assassin (poisoned Shortsword + Stunning Strike riding it, a crossbow, "the assassin's next
turn"); rogue → Bandit Captain (Scimitar + Pistol on a cutpurse); barbarian → Gladiator (Spear +
Shield Bash). Also the GM's Mace shipped beside the Knight's Longsword (Aubrec).

**Mechanism (closed facts: the PHB's class weapons; the SRD NPC blocks).**
1. `classes.mjs` gains `weapon` per class — the weapon the class fights with when the GM named
   none: monk Unarmed Strike (no weapon row; the body's melee row becomes an unarmed strike,
   Bludgeoning, no mastery); rogue shortsword (ranged: shortbow); fighter longsword (ranged:
   longbow); paladin longsword; barbarian greataxe (ranged: handaxe thrown); cleric mace; mage
   quarterstaff (the body's magic strike stands — the Mage's Arcane Burst is the class's); bard
   rapier (ranged: hand crossbow).
2. The body's weapon rows yield to the class weapon unless the GM named one; print's row keeps its
   numbers (it is a rename with the weapon table's type/range/mastery), the row's text loses the
   body's weapon-specific riders (the Assassin's poison, the Pistol's range).
3. Bodies: monk → Scout / Spy only (never the Assassin); rogue at CR ≥ 3 → Spy before the Bandit
   Captain unless the words say captain/leader. The nearest-CR pick stays otherwise.
4. The GM's weapon REPLACES print's weapon in its own row (the brief's pipeline 2/3 rule): on a
   class or twist body the GM-armed part row takes print's melee row's place; print's row is not
   added beside it.
5. The row cap on the class path: kit rows never yield ("Rampage yielded to print's row cap" —
   hold 2) — the eviction order on a class body evicts the body's filler before any kit row.

**Site.** `classes.mjs` (table), `path.mjs` (`bodyForClass`), `generate.mjs` (the melee/ranged
rename loops read the class weapon as a GM-named weapon would; the print-row add; the eviction).
**Done when.** Pins: Sessrak (monk, CR 5) stands on the Spy/Scout with an Unarmed Strike and
Stunning Strike riding it, no poison, no crossbow; Vaelith (tabaxi cutpurse) carries a shortsword
and shortbow, no pistol; Gormak (goliath berserker) a greataxe with Rampage kept; Aubrec one melee
row, the Mace. Then classes-eight: notes only.

## C. Systematic fix-lite (fix at the source, after A and B)

| item | mechanism | site | done-when |
|---|---|---|---|
| Save follows the condition (Furnace Blast → Wisdom for a Frightened rider) | a save row's stat is the EFFECT's (damage novas DEX/CON by shape); a condition rider never picks the stat | the save-stat fitter | Brass Tyrant's blast keys DEX/CON; pin |
| ~~Chassis organs on homebrew golems~~ → **sameness, not correctness** | Print GIVES its golems an Absorption organ matched to their material (Clay acid, Iron fire), and the chassis's organ is that citation; a pin encodes the juggernaut's Acid deliberately. Built the withholding, it broke 19 pins (the regeneration foil, the engulf interior's acid, print's own rows all name energies the concept never gave), and the narrow version still contradicted the juggernaut pin. The arbitrariness the critic saw across runs (Lightning one run, Acid the next) is DONOR variance — the sameness axis, measured on the homebrew forty at stage 5. Reverted, on record. | — | stage 5 |
| Vampire's Stealth +14 from the chassis | print's SKILL NAMES and proficiency TIER are print's; each bonus derives from THIS sheet's stat and PB (overwriting with print's numbers broke a Gladiator borrow's Athletics — the duelist pin), and the Passive Perception follows the new line | the print-canon block; `SKILL_STAT` hoisted to one definition | print's Vampire skills on the sheet's PB; pin |
| Vampire "Legendary Resistance." with no uses | print's own trait is named "Legendary Resistance (3/Day, or 4/Day in Lair)" in the corpus — the suffix is lost downstream of the stamp, not in it; needs its own read | — | open |
| heated-body as the house trait (5/17 homebrews) | sameness — stage 5 (pattern count against print's band); note only here | — | measured on the homebrew forty |
| Flat one-row class sheets | the class path's one seat + kit — with B landed, re-read | — | classes-eight |
| Great Weapon Master on heavy weapons | **owner's ruling** (C6, third ask) | the feature table | — |

## D. Incidental (edit when touched; no pattern)
Glacier-Jarl's Great Bow text (the throw-retrieve template under print's row name — the rename
must not keep a template's body on print's row); Kkresh's "Watching Them Flail" (blank path:
named parts come from the synthesis's NOUNS, never its verbs — item 5); Legion Halberdier's
"reach 10 with no tether word" (a halberd IS a reach weapon — the checker reads the weapon table)
and Humanoid vs print's Fey (the 2024 reclass on a class body); Unmet Hour's chassis Slam on a
court wizard (the closed-Actions sweep on the class path); Wellmouth (item 6, owner's ruling).

## Owner's rulings, taken 2026-10-19
1. **Great Weapon Master ships on every heavy-weapon prompt.** Closed: C6 is answered, the feature
   table stands as it is, and the critic's four sightings are notes, not defects. Remove it from
   every open list.
2. **"Wellmouth is fine."** The Name field holding an article-led phrase with no description is a
   CONCEPT, and the namer names the creature. Item 6 of the critic's list is closed as working.
3. **The class weapon table is confirmed** as written below.
4. **Monk stands on the Scout or the Spy**, never the Assassin. Confirmed.

## Order
A (twist seat) → pins → twist-ten + twist-five · B (class weapons + bodies) → pins → classes-eight
· C in the table's order · D as touched · then the critic forty once more. Steps 6–7 after.

## Status — executor's log (2026-10-19)

**A landed.** The receipt gate now accepts every clause but three: the head's own BODY (the path
holds it), a header directive, and the negative half of a lack. Three mechanisms, each from a live
case the critic named:
- the mechanical/descriptive tag no longer gates the seat (the fit call with a receipt is the judge);
- a clause that holds a lack and a positive half keeps the positive one — the record now carries the
  lack's own quote (`lackQuote`), so the halves are knowable ("stumps smoke instead of regrowing");
- **the head clause is often the whole prompt** — "Dire Wolf with a frost-rimed hide" came back as ONE
  clause marked head, so refusing the head refused the twist. The head gives up the body and keeps
  its remainder; `namesTheBodyOnly` still refuses a quote that is only the body, and the two compose.
- "answered by a part row" now blocks only a receipt that names the WEAPON itself, so "keeps the line"
  survives beside a shield bash.
- One normal form on both sides of the comparison (vetQuote opens hyphens; the record keeps the GM's).
Pins: stolen voices, frost-rimed hide, the Hydra's smoke beside its lost regrowth, keeps-the-line.

**B landed.** `classes.mjs` carries each class's own weapon (owner confirmed): monk unarmed/dart,
rogue shortsword/shortbow, fighter longsword/longbow, paladin longsword, cleric mace, mage
quarterstaff, bard rapier/hand crossbow, barbarian greataxe/handaxe. Monk's bodies are Scout and Spy
only. A re-arm pass after the print-canon block renames the body's weapon rows to the class's unless
the GM named one, keeps print's numbers, folds the body's weapon rider into the base (print's Assassin
pays 5d6 Poison for its shortsword; a monk does not), retypes and re-ranges from the weapon table, and
never touches a magic strike. A HYBRID row yields too and becomes the plain melee row it now is (the
Gladiator's thrown Spear on a goliath berserker). The kit no longer yields to the row cap on a class
body — print's rows cannot be evicted, so a cap that evicts nothing would drop the class instead.
Pins: Sessrak unarmed with no poison and no crossbow, Vaelith's shortsword/shortbow with no pistol,
Gormak's greataxe with Rampage kept, and the GM's mace replacing print's longsword.

Gate after A+B: 109 suites / 3558 passed, build green. classes-eight, twist-ten and twist-five
re-running. C staged (save follows the effect; a chassis organ names no energy the concept never
gave; print's skills land with print's array) and applied when the box is quiet.

### classes-eight on the A+B engine (`classes-eight-2026-10-19T15-06-13`) — three of my own bugs
16/16; every class now stands on its class's body with its own weapon (monk unarmed + dart on the
Spy, rogue shortsword + shortbow, barbarian greataxe, bard hand crossbow, paladin longsword).
9 clean / 3 soft / 4 FAIL, and all four are the re-arm's:
1. **`sweepDeadName` takes the KEEPER ROW, not a name.** I passed `e.name`, so every citation of the
   old name was removed instead of renamed: "The bandit makes two attacks, using in any combination."
2. **A chassis row whose name already equals print's never got `print: true`** — the melee rename
   stamps the flag after an early `from === to` return — so the closed-Actions sweep (step 5) removed
   the Dire Wolf's own Bite and its Multiattack lost every citation. The flag is provenance, not a
   rename receipt; it is stamped before the return now.
3. **The on-hit retype ran before the re-arm**: the rogue's Assassinate added Slashing to a
   shortsword's Piercing. A normalisation runs after everything that can change its input, so the
   retype runs inside the re-arm too.
Staged as `$S/B2-fixes.py`, applied when the box is quiet (twist-ten and twist-five were live).

### C landed, with two corrections to my own plan (2026-10-19)
- **C1 save follows the effect.** A save row whose Failure deals dice keys Dexterity (an area) or
  Constitution (a breath, gas, poison); a condition it hands out alongside never picks the stat. A
  row whose point IS the condition (no dice) keeps its mental save, and a mind effect (fear, song,
  memory, gaze) keys a mental save by its own substance. Pinned on the Brass Tyrant's shape.
- **C2 reverted** — see the table above. Print gives its golems the organ; the variance is sameness.
- **C3 print's skills** land on a print body at print's CR, by NAME and proficiency tier, derived
  from the sheet's own stat and PB. My first cut wrote print's numbers straight in and broke a
  Gladiator borrow (Athletics +9 on PB +2); the second dropped the chassis's Perception and left a
  stale Passive Perception. Both fixed, and `SKILL_STAT` is now one definition with the two locals
  pointing at it. Pinned (the Vampire).
- Three of my own B bugs, found by the classes-eight run and fixed: `sweepDeadName` wanted the keeper
  ROW (a name emptied the Multiattack's citation); print's flag is provenance, stamped before the
  `from === to` return (the closed-Actions sweep had removed the Dire Wolf's own Bite); the on-hit
  retype runs inside the re-arm (Assassinate added Slashing to a shortsword's Piercing).
- The trailing-`//` trap bit once more on a line that continues into a block comment. Comment above.

### The sets on the A+B+C engine
| set | generated | checker | twist rows landed |
|---|---|---|---|
| twist-ten (`15-...`) | 10/10 | 7 clean / 3 soft / **0 FAIL** | 6 of 10 blocks (was 4 of ~20 across the two sets) |
| classes-eight (`15-26-24`) | 12 of 16 (three live stalls, one late) | 8 clean / 3 soft / 1 FAIL | — |
| twist-five | 5/5 | 4 clean / 1 soft / 0 FAIL | 1 of 5 (the other four are weapons and languages, correctly answered) |

The classes-eight FAIL was the last of the re-arm's consequences, and the deepest: **print's Mage
Multiattack landed while its attack row did not.** The Mage's only attack is a HYBRID (Arcane Burst,
Melee or Ranged), and the melee ADD required a non-hybrid row, so a sheet whose chassis row had been
swept had no attack at all and print's own Multiattack cited a row that was never there. The add now
takes print's row whatever its shape. Pinned (the court wizard on the Mage).
Gate after each round: 109 suites, 3560 then 3562 passed, build green throughout.

### classes-eight, final on this engine (`classes-eight-2026-10-19T15-34-38`)
14 of 16 generated before the run stalled on its last entry for 22 minutes (the infrastructure stall
below); checker on the 14: **0 FAIL**. Every class stands on its class's body with its own weapon.

### Open, infrastructure: the live stall
Now the costliest thing in the loop — 3 of 16, 4 of 16, then 22 minutes on one entry, across runs
whose engine differed. What is known: the page reports `generating: false` with no save and no error
line, so the app's generation ENDED without saving and without logging; the AI client aborts a hung
call at 240 s, so it is not a pending request; the stub harness returns in ≤ 150 ms. The harness's
own 300 s wait did not fire on the 22-minute entry, so the stall is after the save wait — the
enrichment wait (20 s cap), the conversion step, or the re-roll. Next instrumentation: time each
phase in the harness and log the generation's end in the Vue whenever the generating flag clears
with no save. Not an engine defect, but it is eating runs.

### The critic forty on the A+B+C engine (`sweep-2026-10-19T16-00-32`)
40/40 in one pass, no stalls. Paths: 13 twist · 7 class NPC · 3 exact · 1 blank · 16 homebrew.
Checker **27 clean / 12 soft / 1 FAIL** (the package the critic read: 21 / 15 / 4).
**Twist rows land on 12 of 13 twist blocks, one to three each** — the critic counted 4 of ~20.
The one FAIL was a prose register on a repair-authored row (the Pit Fiend's Oath Collector: "may"
for print's "can"). The lint already had a deterministic fixer for it; **the reskin linted and traced
but never applied the lint's own text fixes**, so prose the lint could repair by string surgery
reached the checker. Fixed by wiring the lint's table in (one definition, not a new rule), pinned.
Gate 109 suites / 3561 passed, build green; the forty re-runs on the wired engine.

### D (incidental) — status
- Unmet Hour's chassis Slam on a court wizard: the closed-Actions sweep covers it (class path).
- Legion Halberdier's "reach 10 with no tether word": the checker's TETHER list has no `halberd`;
  the weapon table says reach. One-line read for the checker, not yet done.
- Glacier-Jarl's Great Bow (a template's body under print's row name) and Kkresh's "Watching Them
  Flail" (the blank path's named parts from the synthesis's verbs): not yet done.
- "The thing in the well" → Wellmouth and Great Weapon Master: **closed by the owner's rulings.**

### The live stall, diagnosed one step further (2026-10-19, the confirming re-run)
The confirming forty hit 3 stalls in 21 entries (the verified forty had 1 in 40), so I stopped it —
the lint wiring it was confirming is pinned, and the package stands on `sweep-2026-10-19T16-00-32`.
**What the traces now show: the ENGINE finished.** Two of the three stalled blocks end with the
reskin's own last lines — `[reskin] lint: 0 findings`, and on one of them my new `print canon skills`
trace immediately before it — and then `[harness] at timeout: {"ready":"complete","generating":false}`.
So `generateReskin` returned and the APP stalled after it, in the post-reskin phases (naming, flavor,
enrichment, save), with its loading flag already cleared and no error logged. The third stalled entry
logged nothing at all (the page never started — the harness miss the retry queue now covers).
Two candidates, both outside the engine: the proxy (a 429 or a hung retry inside the naming/flavor
call, which would explain the rate climbing through a long session of concurrent runs) and the dev
server itself (up 20 days with 20 days of HMR state). **Cheapest next steps, in order:** restart the
dev server before the next batch (the owner's call — it would interrupt anything they have open);
then log each post-reskin phase's end in the Vue, so the next stall names its own phase.

### D (incidental) landed, 2026-10-19
- **A reach weapon is its own tether.** The checker's TETHER word list has no halberd, so the Legion
  Halberdier's reach 10 was flagged; the weapon table says halberd, glaive, pike, lance and whip all
  reach 10. The checker reads the table first and the word list behind it. Pinned, with a control (a
  reach-10 row with no weapon and no tether word is still flagged).
- **Print's name never lands on a template's body.** The Glacier-Jarl's "Great Bow" carried the
  throw-retrieve template's text, because the rename renamed a SEAT's own row (a library draw or a
  template fit) to print's row name and kept its body. Both rename loops now yield on such a row —
  it is the seat's, not a chassis attack row — and print's own row lands by the add instead.
- **An object pronoun before a weapon noun makes it a verb.** The blank path named a weapon row
  "Watching Them Flail" from its own synthesized prose. English grammar, not a meaning rule: a part
  noun preceded by them/him/her/it/us/me is a verb and the hit is skipped. Pinned, with a control
  (a real heavy flail still lands).
Owner restarted the dev server; the clean forty runs on it now.

### The stall was the dev server (2026-10-19)
The owner restarted it. The next forty ran **40/40 with zero stalls** — against 3 in 21 and 2 in 40
on the twenty-day-old process. The traces had already said the engine finishes and the app stalls
after it; a long-lived Vite process with that much HMR state is the explanation, and a restart is the
remedy. Worth knowing for the next long session: restart the dev server before a forty.

### The clean forty (`sweep-2026-10-19T18-19-04`) and its three
22 clean / 15 soft / 3 FAIL, 40/40 generated, paths 13 twist · 7 class NPC · 3 exact · 1 blank ·
16 homebrew, twist rows on 11 of 13 twist blocks. All three FAILs were fixed and pinned:
1. **Two were mine, one hour old.** My lint pre-pass linted the sheet as 2014 when the FORM asked for
   2014 — but at that point in the pipeline the sheet is still the 2024 shape (the conversion is a
   later call), so `condition-caps` never fired and two 2014 blocks shipped lowercase conditions for
   the gate to fail. The pre-pass lints 2024, as the pass below it always did.
2. **Spider Climb with no Climb speed.** Print pairs them on every creature that climbs difficult
   surfaces (Vampire 40/40, Giant Spider 30/30, Phase Spider 30/30). A sheet that carries the trait
   now carries the speed, the walk's own number.
Gate 109 suites / 3564 then 3566 passed, build green. The forty and classes-eight re-run to confirm.

### The last FAIL: a rename is not a sweep (2026-10-19)
classes-eight on the final engine: **16/16, no stalls** (the restarted server), 11 clean / 4 soft /
1 FAIL — Whisperveil's "The bandit makes two attacks, using in any combination." The class re-arm
called `sweepDeadName` for the old name, and that helper's Multiattack branch re-reads the row set
for a name that LEFT: it strips the attack from the citation. A RENAME needs the citation rewritten,
which is what the rename loops themselves already do. The re-arm now rewrites citations to the new
name and never sweeps — one definition with the loops above it. It only showed on this shape because
a duplicate print-named row had been swept first, leaving the keeper's own rename to strip the pair.
Pinned (the cutpurse, with the Multiattack's every cited name asserted to exist).
