# Response plan — the critic's fourth-package read (2026-10-19, both halves)

**Trigger:** the consolidated read of `RELEASE-for-critic-{2024,2014}-2026-10-19-paths.md`. Verdict:
the dispatcher holds; the 2014 conversion is clean (22/22 on the first call, no 2024 phrasing); the
defects sit on the class path and in weapon handling. 2024: 38 sheets, 26 ship / 10 fix-lite / 2 fix.
2014: 22 sheets, 15 / 3 / 4.

**Laws:** meaning is a call field, never a word list; a receipt is a span of the GM's own words; one
definition, every reader; a normalisation runs after everything that can change its input; a gate may
shape what the GM asked for, never remove it; print overrules reviewers; the owner commits.

## Already answered, before any work

**Process 1 — the package rendered a stale run.** Correct and mine: the file carried the 15:11
twist-ten (3 FAILs) while the case reported 0 FAIL from the 15:22 run that was not included. The
package is rebuilt so every number in the case is a run inside it (forty `18-35-07`, classes-eight
`19-07-00`, twist-ten `15-22-58`, twist-five `15-14-56`), and the classes-eight line now reports its
own 1 FAIL rather than an earlier run's zero.

**Process 2 — which blocks ran degraded.** The breaker opened in block 37's post-save ENRICHMENT
(`Failed to enrich Ozghar: TypeError: Failed to fetch`), not in a generation. **Blocks 38, 39 and 40
generated with it open**; 1–37 did not. C4 below stamps it so the question cannot recur.

**A3's second half — print's own Bite — is already fixed.** The critic read the stale twist-ten: a
chassis row whose name already equalled print's never received `print: true`, so the closed-Actions
sweep removed it. The flag is stamped before the `from === to` return as of the 15:22 run, which is
why that run is 0 FAIL. The clause-coverage half of A3 (Bellard's handaxe) is live and below.

## A. Before posting

### A1. Guarded Stance through one gate — **owner's ruling needed**
Two policies for one trait, third read. The signature seat gates it off when AC already beats print's
(12 times this package); the fighter/paladin KIT adds it with no check (Vashka AC 19, Oriel AC 16);
and the 10-18 rule that lowers AC when the trait lands does not run on the class path.
Three ways, the owner picks:
1. **One gate.** The kit asks the same question the seat asks: no Guarded Stance when AC already beats
   print's at the CR. The kit then lands its next row instead (Riposte, Second Wind).
2. **Lower the AC.** The kit keeps the trait and the 10-18 AC reduction runs on the class path too.
3. **Print's Parry instead.** Print gives no persistent Disadvantage-to-be-hit trait (0 of 329); it
   gives the Knight/Gladiator a Parry reaction (+2 AC against one attack it can see). The kit ships
   Parry and Guarded Stance leaves the fighter and paladin kits entirely.
Recommendation: **3**, with 1 as the fallback — it is the only one print supports, and it ends the
two-policy problem by removing the trait rather than arbitrating between two gates.

**LANDED as 1, and why (2026-10-19).** The owner took the recommendation (3), and then print overruled
its premise: **the 2024 SRD has no Parry at all**, and only 3 of 329 blocks carry any reaction
(two Protective Magic, one Protective Magic) — there is no AC-raising reaction in the corpus to
lift. Print overrules reviewers, me included, so the stated fallback stands: **one gate**.
And the gate had to be one PREDICATE, because there were three doors, not two — the signature
seat's menu (gated), the class kit (ungated: Vashka AC 19, Oriel AC 16), and the **concept-first
ranking**, which binds the GM's own words to the shelf and shipped the trait with no AC question at
all (that is how Vashka got it even with the kit gated). `guardedStanceIllegalAt(cr, ac)` now answers
for all three; the AC is passed in because `monster` is not initialised at the kit pass.
One pin changed outcome and is recorded: the sergeant's stance (AC 16 against print's 15 at CR 5) is
now refused by the concept-first door, and that test still proves the door through the gong's
resonant-body. Gate 109 suites / 3569 passed, build green.

### A2. A named weapon is priced against the body's attack count — FIX
Oriel (CR 5) and Harrowic Vane (CR 6, 2014) each make three Longswords at 4d8 + 4 = 66 a round,
reading CR 10. The GM's weapon is priced as a two-attack row and then multiplied by the Gladiator's
three-attack Multiattack. **Mechanism:** a named part's dice are priced against the Multiattack the
sheet actually ships, read AFTER the print Multiattack lands (a normalisation runs after everything
that can change its input) — one definition with the solver's per-hit share. Also: the hot-offense
gate did not fire on either sheet, so the gate is read in the same pass.
Done when: both sheets read at their own CR ±1, the per-attack share is print's, and the hot gate
fires on a crafted 66-a-round sheet. Pins: Oriel CR 5, Vane CR 6 (2014).

### A3. The closed-Actions rule never removes a weapon the GM named — FIX
Bellard, "hurls a handaxe and closes with a shortsword": the handaxe left with "the Gladiator prints
no row for it", one named part landed, and coverage still credited the clause 2/2.
**Mechanism:** the sweep already spares `e.part`; the handaxe never BECAME a part. `partRows`' cap and
its "last noun of the clause" read keep one weapon per clause, so a two-weapon clause loses one. Every
weapon the GM names is its own part row (the segment split already exists for "and"/"or" — it did not
fire on "hurls X and closes with Y"). And coverage credits a clause only for the rows that landed.
Done when: Bellard ships a Handaxe (thrown) and a Shortsword, coverage reads 1/2 if one is missing,
and the single-weapon control is unchanged. Pins: Bellard, a one-weapon control.

## B. Post-ship, by path

### Class NPC
| item | mechanism | done when |
|---|---|---|
| The re-arm leaves the body's OTHER rows (Radrik keeps the Gladiator's Shield Bash at 27 over his axe; Ser Aldous has the GM's mace AND the Guard Captain's longsword) | the re-arm renames the body's weapon rows; it must also drop a body weapon row the class replaced, and a save row that IS the body's weapon (Shield Bash) goes with the weapon it belongs to | Radrik has one melee weapon row and no Shield Bash; Aldous one melee row |
| Vashka's longbow at +7 off STR (should be +4 off DEX); the attack-stat gate missed it | a launcher rolls DEX — the rule exists for the weapon table; the class re-arm must re-derive the bonus from the weapon's own stat, and the gate reads a class-armed row | the longbow is DEX-keyed; the gate fails a crafted STR-keyed bow |
| Print-row nouns leak ("The hobgoblin has Advantage…", "The guard makes two attacks", "The thurivald makes three attacks") | print's row text carries print's inline noun; the sheet's own inline replaces it on every print row, not only the renamed ones | no print row names another creature; Thurivald reads "the skald" |
| Thurivald carries the chassis Guard Aura though the class path is closed | the closed-Actions sweep covers Actions only; Traits/Bonus Actions/Reactions on a CLASS body need the same closure | no chassis filler on a class sheet |
| A title with no class word (Brother Halric) → class null → no body, no kit, a skirmisher chassis with "Hurled Scripture" | the PATH CALL answers the class for a title — it already returns `title`; the prompt must name the class a title implies ("Brother"/"Sister" → cleric, "Dame"/"Ser" → fighter or paladin, "Captain" → fighter). A title with no class still takes a default NPC body by CR rather than a monster chassis | Halric is a cleric on the Priest; a nameless title takes an NPC body |
| **The class receipt rule — the critic's own correction** | an EXPLICIT class name is its own receipt anywhere in the GM's words; the head-clause test is only for IMPLIED words (titles, jobs). Meshrin's "He is a barbarian who rages" was refused | Meshrin is a barbarian; the implied-title control still needs the head clause |
| Meshrin's "frightening roar" came out a charm (the lure template) | the fit call chose a charm for a fear clause: the template menu for a clause naming fear offers the Frightened shapes first, and a charm fit on a fear clause is refused | the roar frightens |
| "lizardfolk monk" went homebrew with no class (a probe-set prompt; the first live class misread) | the path call's own miss — report it by name, add it to the probe set, and tune the prompt: a people's name beside a class word is class NPC on that people | 5/5 class_npc in the probe |
| Lizardfolk swim 40 against the kit's 30 (fifth read) | the species kit's mode is the floor; a chassis speed above it stands only if the concept gave it. One definition for every mode | the sheet swims 30 |

### Twist
- **The seat receives its own clause.** The critic's prescription, and right: the twist seat should be
  handed the clause it is answering, with that clause as the receipt BY CONSTRUCTION, and the call
  picks only the template. That removes the receipt-vetting path entirely for this seat. Misses this
  package: the Air Elemental's "stolen voices" (third read, and the pin passes — so the pin's shape
  and the live shape differ: the live fit answered a template with no quote), the skeleton's "former
  life", the two-headed wolf.
  Done when: every non-head, non-header, non-lack clause on a twist sheet either has a row or a traced
  refusal naming the template that declined it.
- **Venting Haze text**: "…up to 10 minutes. has Disadvantage on attack rolls" — a sentence join.

### Homebrew and print
| item | note |
|---|---|
| Trench leviathan: Coil reach 5 ft on a Gargantuan body | reach follows size (the SIZE_REACH table the checker already has); the engine must write it |
| Squallwing Drake: one Claw at CR 7 | the Multiattack/attack-count floor by CR |
| Ozghar: no Multiattack | same floor |
| Vampire "Legendary Resistance." with no uses (third read) | print's corpus name is "Legendary Resistance (3/Day, or 4/Day in Lair)"; the suffix is lost downstream of the stamp — find the stripper |
| "VERB outranks the noun" still running on the homebrew route | expected until step 7 of the Five Pipelines brief; noted so it is not forgotten |

## C. Process work
1. The package renders only the runs the case cites. **Done.**
2. Which blocks ran degraded. **Answered above.**
3. **C4 — stamp it.** `generation.degraded = true` when `isDegradedMode()` is true at generation time,
   surfaced in the review table, so "which blocks ran degraded" is a column and never a question.
4. The enrichment failure that opened the breaker is a `TypeError: Failed to fetch` on the enrichment
   call — the same shape as the stall. Worth one read now that the dev-server restart fixed the stall.

## Order
A1 (on the owner's ruling) · A2 · A3 — each with the three-block trio the critic asks for (the fix, a
control on the same path, a regression case that must not move) · then B's class-NPC table in its own
order (the receipt correction and the title first: they are one prompt change and one validator) ·
then the twist seat's clause-by-construction · then B's homebrew items · C4 alongside. Re-run
classes-eight and twist-ten at the end and read them at the body.

### A2 landed (2026-10-19)
The price pass already read the sheet's own Multiattack — it just ran in the wrong place. It sat
before the print-canon block, so a borrow whose print body attacks three times (the Gladiator) kept
dice sized for the chassis's two: Oriel swung 66 a round at CR 5 against a card of 40. The pass is
now a named pass (`priceTheRound`) called twice, the second time once print's Multiattack and rows
are in place, and the trace says which Multiattack spoke. It is idempotent and never touches print's
own rows. Oriel now re-solves to 13 (2d8 + 4) × 3 = 39 against the card's 40.
Finding the right scope took three tries: the pass lived inside a block that closed long before the
second call site, and my first hoist landed it in another function entirely.
Pins: Oriel inside the card, the sellsword inside the card, and a homebrew control that does not move.

**The hot-offense gate did fire** — as a SOFT, which is its design: `offOver > 7` fails, `> 3` notes.
A crafted CR 5 sheet at 66 a round reads "offense alone reads CR 10, 5 over; the HP axis pulls the
read to 7". Print's own ceiling is +7 (the Adult Brass Dragon), so five over is inside print's spread
and the severity stands. Answer to the critic: it spoke, in the notes column, not the FAIL list.

### A3 landed (2026-10-19)
`PART_THROWN` skipped the WHOLE CLAUSE on any throw verb — "hurls a handaxe and closes with a
shortsword" lost both weapons, and the shortsword that did ship came from the rename, not from a
part. Two mechanisms: the throw test moved to the SEGMENT (a hurled thing the weapon table knows is
thrown lands as its own part in hybrid mode, print's Gladiator-Spear shape; a hurled boulder stays
the throw-retrieve template's), and the scope now opens at the EARLIEST cue, because a throw verb
says "a weapon follows" exactly as a wield verb does and taking only the wield cue started the scope
past the thrown weapon. Pins: both weapons with the handaxe at 20/60, the boulder control, three
single-weapon controls (one of which corrected my own expectation — a dagger is thrown in the 2024
table, so it lands hybrid).

### B, first two items landed (2026-10-19)
**The class receipt, the critic's own correction.** An explicit class NAME is its own receipt wherever
it sits: "He is a barbarian who rages" named the class in a relative clause and was refused for it.
The head-clause test stays for IMPLIED words — a title or a trade, where position carries the claim
("a kuo-toa priest" is a cleric; "priests" in "a hunter who kills the priests of the deep" is not).
One predicate in `readPath`: the receipt names the class itself → accepted anywhere; otherwise the
head clause, as before. Pinned both ways with the hunter as the control.

**A title with no class still stands on a person.** Brother Halric answered class null, so
`bodyForClass` had nothing, no kit landed, and he fell to a monster chassis with a "Hurled Scripture"
row. `bodyForPerson(cr)` walks print's own people — Commoner, Guard, Warrior Infantry, Scout, Spy,
Priest Acolyte, Berserker, Warrior Veteran, Guard Captain, Gladiator, Mage, Assassin, Archmage — and
the class-NPC path takes the nearest-CR one when the call named no class. The prompt also now names
the class a religious or knightly title implies (Brother/Sister/Father/Mother → cleric, Dame/Ser →
paladin, Captain/Sergeant/Warlord/Marshal → fighter, Archmage/Magus → mage), with the title as the
receipt, so most of these answer a class in the first place.

### B, the re-arm's three (2026-10-19)
- **A heavy melee class weapon takes the shield row with it.** Print pairs a shield with no heavy
  MELEE weapon in 329 gear lines — every shield-carrier holds a spear, scimitar or longsword, and the
  Hobgoblin Warrior's heavy weapon is its LONGBOW. So a barbarian's greataxe drops the Gladiator's
  Shield Bash (which outdamaged the axe at 27) and the Multiattack re-reads. A one-handed class
  weapon keeps it — the control.
- **The GM's weapon replaces print's.** Ser Aldous shipped the GM's Mace AND the Guard Captain's
  Longsword. The yield had to run BEFORE the part guard and key on print's own flag, because print's
  row had been stamped onto a part slot — my first cut keyed on `!e.part` and never saw it.
- **A launcher rolls Dexterity after the re-arm.** Vashka's longbow kept the body's +7 off STR 18
  where DEX gives +4; the re-armed row now re-derives its bonus and flat damage from DEX, which is
  print's rule for every bow, crossbow and firearm row.

### One new class, found by the re-arm batch (2026-10-19)
`lint:section-shape` on Vashka: the repair call answered a REACTION in the TRAIT form ("Vashka can
use its reaction to resist the movement"), and the lint rightly refused a Trait written as a
Reaction. The section is deterministic from the text — print puts every "uses its Reaction" row under
Reactions — so the row MOVES rather than being rewritten, and the repair prompt's trait form now says
a trait costs the creature nothing and never spends a Reaction. Pinned.

### Status after B's first five items
Landed and pinned: the class receipt correction · a titled person takes a print person body · a heavy
melee class weapon takes the shield row · the GM's weapon replaces print's · a launcher rolls DEX ·
the reaction-shaped trait moves. Live: `b-receipt` 5/5 0 FAIL, `b-rearm` 4/4 with the one FAIL above
now fixed. Gate 109 suites / 3582 then 3586 passed, build green.
Still open in B: print's nouns leaking into renamed rows · chassis filler in Traits/Reactions on a
class body · the "lizardfolk monk" path misread · the lizardfolk swim speed · then the twist seat's
clause-by-construction, the homebrew items, and C4's degraded stamp.

### B, two more (2026-10-19)
- **Print names itself by the FIRST word of its name**, not the last: the Hobgoblin Warrior's Pack
  Tactics says "The hobgoblin", the Guard Captain's rows "the guard", the Priest Acolyte's "the
  priest". `asInline` substituted the full name and the LAST word only, so print's own noun leaked
  onto sheets that are not that creature. The first word joins the list (length ≥ 4, so "dire" and
  "purple" cost nothing). Pinned.
- **The class path is closed to chassis filler in every section, not just Actions.** The Traits
  branch swept only a named seat's trait, so the leader chassis's `rules` aura rode on a class sheet
  beside the kit's own Aura of Authority — two auras, one creature. On a class body a row with no
  provenance at all is the chassis's and leaves, and the whole-section skip (print has a rules row
  here) no longer hides them, because print's own rows carry their flag. Pinned with a row-provenance
  assertion over the whole sheet.
- **The species' own movement mode is the number.** A lizardfolk swims 30; the chassis's 40 stood
  because the mode was only ADDED when absent. The kit's number is the species', and a chassis speed
  above it stands only when the GM's words name a speed. Fifth read, closed. Pinned with that control.
- **The "lizardfolk monk" misread.** Prompt, not rule: two words, a people and a role, is always
  class_npc with that role as the class and that people as the species. Probed `--only=class_npc`,
  13 prompts × 5: **assembly 0/65 misread, class 0/65, no flips**, and lizardfolk monk is 5/5. The
  one print_body row was my own label — a people body beside a class word is the brief's precedence.
- **The Multiattack cites the rows the sheet has.** print's Multiattack lands whole ("using Javelin
  and Longsword"), but print's Javelin row may never have landed and the GM's weapon may have
  replaced print's Longsword — so the citation named two rows that do not exist while the GM's Mace
  went uncited. Each dangling name now takes the next attack row the Multiattack does NOT yet cite,
  in order, so two dangling names never collapse onto one row (my first cut did exactly that and the
  Whisperveil pin caught it). The citation reader also had to learn print's "and" form: it stopped at
  " or" alone, so "Scimitar and Pistol in any combination" was captured as a single name. Pinned on
  both shapes with the structure and reader gates asserted.

### The twist seat receives its clause (2026-10-19) — the critic's prescription, landed
Two gates stood between the GM's words and a row, and the critic was right that neither should:
1. **The receipt.** The call answered `asked`, the engine vetted the quote, and a fit with no usable
   quote was refused — so "carries stolen voices" was declined three packages running. Now, on a
   closed path, when the sheet still carries a twist clause no row answers, THAT CLAUSE IS THE
   RECEIPT, whatever the call quoted. The call's job is to pick a template. Traced
   `seat takes its clause: "<row>" answers "<clause>"`.
2. **The verb-share gate.** "No template on the shelf shares a verb with the concept or the idea"
   killed the skeleton's "former life" before the receipt was even read. That gate stops decoration
   on a body with no warrant, which is right when nothing was asked for; with an unanswered clause the
   warrant is the clause. It stands down for exactly that case, traced `verb gate stands down`.
Pins: the Air Elemental with NO quote at all, the skeleton with a body-only quote, and two controls —
a print body that asks for nothing takes no row, and a clause a part row already answers is not
handed to the seat. One older pin changed outcome by design (the gladiator-skeleton now SHIPS its
trait, for the clause the GM typed) and is recorded in place.

### The forty's four residuals (2026-10-19) — landed, each at the mechanism print settles

Print was consulted first on all four, and overruled me twice.

**1. Print names its own trait, rate and all.** The Vampire shipped `Legendary Resistance.`
with no uses, which reads as unlimited. The stripper was the print record builder itself
(`generate.mjs`, the `traits` map): it cut ` (…)` off every print trait name. Print's own
name is `Legendary Resistance (3/Day, or 4/Day in Lair)`. Only 7 distinct print trait names
carry a parenthetical across 329 blocks, and the only other readers are two tests anchored
on `^Regeneration$`, which carries none — so the strip bought nothing and cost the rate.
The landing site already strips both sides when it compares, so nothing downstream needed a
change. **Done-when:** a Vampire reskin's trait name is print's, verbatim. Pinned.

**2. A predicate slot is not a sentence.** The Venting Haze defect was not a call defect:
the engine's own blind fill for `{zone_rule}` is `has Disadvantage on attack rolls`, a bare
predicate, and the zone frame sat it after a full stop — `…up to 10 minutes. has Disadvantage
on attack rolls`. The frame now owns the subject and the stop on all four bands (`Each
creature in the area {zone_rule}.`), which is print's Darkmantle shape, the template's own
cite. `PREDICATE_SLOTS` bounds the slot to a lowercase, stop-free fill at both fill sites; a
sentence-shaped answer falls to the engine's predicate rather than landing after a period.
The fit prompt now says what the slot wants, which was the root cause — it said nothing.
**Done-when:** no zone row joins two sentences without a subject. Pinned three ways.

**3. Reach follows the body — at the two sizes print agrees.** The critic's rule overstates
print. Print's 329 gear lines by size:

| size | n | reach 5 | reach 10 | reach 15+ |
|---|---|---|---|---|
| Large | 126 | 84 | 40 | 2 |
| Huge | 37 | 7 | 27 | 3 |
| Gargantuan | 20 | 1 | 3 | 16 |

So there is **no floor at Large** — print puts reach 5 there two-thirds of the time. The
floor is print's modal reach at Huge (10) and Gargantuan (15) only, and print's own rows are
exempt: the Roc is Gargantuan and print gives its Talons reach 5 (its Beak 10). It runs as a
late pass after `priceTheRound("print's")`, because the class re-arm, the melee add and print's
canon can all still change a reach above it. **Done-when:** no non-print melee row sits below
print's modal reach for its size. Pinned with a Large control and a print-row control.

**4. The attack floor by CR.** Print is decisive on the missing Multiattack: 110 of 113 blocks
at CR 5+ carry one (40/42 at 5-7, 24/24 at 8-10, 21/22 at 11-15, 25/25 above), against 91 of
106 single-attack blocks below CR 1. Three print exceptions (Gorgon, Wraith, Remorhaz) make it
a **soft**, not a fail.

My first version also flagged a Multiattack with one attack row to spend — and print killed
it: **70 of print's 110 CR 5+ Multiattacks (64%) name a single row** ("the dragon makes three
Rend attacks"). That clause fired on 47% of 6,407 saved blocks, including print's own Adult
Red Dragon and Hydra. Removed. Swarms are exempt, because `swarm-multiattack` hard-fails the
only shape this rule would otherwise allow, and all seven print swarms make exactly one attack.
The narrowed gate fires on **256 of 6,407 saved blocks (4.0%)**, bracketing print's own 2.6%.
**Done-when:** the gate's rate sits near print's. Pinned four ways, including print's one-row
idiom as a non-finding.

**C4 — the degraded stamp.** `generation.degraded = true` when `isDegradedMode()` is true at
generation time, and `review-batch.mjs` marks the row `⚠︎degraded`. A block generated while
the primary provider was failing had its validation gates relaxed, so its "clean" means less;
the table now says so instead of hiding it.

**The twist seat's clause now reaches the call.** The first landing handed the seat whatever
clause was unanswered *after* the call had already picked a template, which mismatched: the
frost jarl's Clinging Rime was handed "throws boulders". `buildFitPrompt` now takes the clause
and names it as the one to answer, so the call picks a template **for** that clause. The cut
that strips the body out of the head clause no longer leaves double spaces ("a   with two
heads").
