# Handoff — fix 4, and one word rule that needs the owner

For Fable 5.2, 2026-11-14. Assumes no conversation history.
Blocks: `BLOCKS-fix4-2026-11-14.md` beside this file — read those first.

## The defect

Print writes its own noun into its rows. The Ankheg's Bite says "Grappled by the ankheg"; the
Mage's rows say "The mage casts". Thirteen print-canon paste sites run every borrowed string
through `asInline`, which swaps print's noun for this sheet's. Three paths did not.

| sheet | shipped | cause |
|---|---|---|
| typed40 #33 Thornback | "Grappled by **the ankheg**" | `pr.note` — print's roll parenthetical, pasted raw |
| typed40 #31 Rimebound Troll | "straight toward **Troll**" | the seat and repair calls were handed the pre-settlement name guess |
| typed40 #05 Lord Vexmoor | "**The mage** casts Misty Step" | print's own Archmage block says "the mage" |

Two are fixed and shown in live blocks. The third is not a bug in our code and is below.

## What landed

**1. `pr.note` takes the creature's name** (`generate.mjs`, the melee rename pass). One call to
`asInline`. Thornback now reads "Grappled by Thornback".

**2. A kit row carries its own block's noun.** The class kit lifts rows from its own SRD block,
which is not the body the sheet stands on — the mage kit's rows come from the **Mage** while the
class body is the **Archmage** — so substituting the body's noun alone could never catch them.
`asInline` now takes a second source, and the kit hands over its declared one (`{ srd: ['Mage',
…] }` in `classes.mjs`) rather than anything guessing it.

This one has an ordering constraint worth recording, because it cost a TDZ error first: **the kit
welds its rows ~130 lines before the creature's rules-text name exists.** So the weld stamps
`kitSrc` (declared data) and a sweep applies it once `inline` is known.

**3. The seat and repair calls get the settled name, not the guess.** `inlineGuessRef()` exists
for rows written before the name's form is decided. The seat call and the repair call are not
those — both run ~1,600 lines later, and both were handed the guess as the creature's name, so
the model wrote rows with it. On the Rimebound Troll the audit caught the wrong name, ordered a
repair, and the repair was handed the same guess and wrote it back.

**4. The pre-settlement re-stamp covers every row it wrote**, not just `kit || feature` — the
engine's save forms take the guess too (`anchor: inlineGuessRef()`). The creature's full name is
masked first, because the guess is usually a word OF the name and a bare replacement turned
"Rimebound Troll" into "Rimebound the troll".

## Tests

`a-row-never-names-another-creature.spec.js`, 2 tests, both sensitivity-checked (they fail with
the fix reverted). **5195 tests, 215 suites.**

Pass 3 has **no unit test, deliberately**, and the file says so. The harness answers every call
with one stub, which makes the idea call's fit succeed, so the seat call never runs — a test
written there passes whether the fix is in or out. I wrote that test, found it vacuous under the
revert, and removed it rather than ship a proof that cannot fail. Its evidence is the traced
chain on `31-rimebound-troll.md` and the block.

## The ask — one word rule, not written

Vexmoor still ships "The mage casts Misty Step", and **print is the reason**:

```
Archmage | Bonus Actions | Misty Step (3/Day) :: "The mage casts *Misty Step*…"
Archmage -> self-reference nouns across its own rows:  archmage x4,  mage x1
```

SRD 5.2 names the same creature two ways inside one block. `asInline` substitutes the nouns of
the body's NAME, and `mage` is not a word of `Archmage` — it is a trailing substring of one. No
amount of passing the right source fixes this; it needs a rule about print's text. Three shapes,
none written:

1. **Derive each print block's self-reference nouns from its own rows.** Principled and closed
   (print is a fixed corpus), but it is string analysis of print to decide meaning, and it would
   have to tell a self-reference from a mention of some other creature.
2. **Allow a trailing-substring word** (`archmage` ends with `mage`). One line, and wrong the
   moment a block legitimately mentions a different mage.
3. **Leave it.** It is 1 row on 1 of 3 repro sheets, and the audit already reports it.

Per the standing rule — a fix that seems to need a word rule is proposed, not written — this is
the owner's call. My own read is (1), computed once at build time into the corpus tags rather
than at runtime, but I would not ship it without the measurement of how many print blocks
actually self-reference more than one way.

## Still open, unchanged

- **The print-stamp exemption hole.** Both surviving leaks were CAUGHT by the audit and dismissed
  because the row carries print's stamp: "print's row is the standard, so this is either the
  audit arguing with published text or OUR paste having broken it; no sheet-level fix runs." On
  Thornback it was our paste. The stamp means "carries print's name", not "is print's text", and
  these two sheets are the concrete evidence that the exemption costs real defects.
- Fix 5 (they/them for a named Humanoid) — **not started.** No mechanism exists today.
- Fix 6 (compound with print head routes as twist) — not started.
- Item 5a steps 2, 4, 5 — not started.
