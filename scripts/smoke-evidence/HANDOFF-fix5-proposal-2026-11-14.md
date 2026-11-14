# Handoff — fix 5 (pronouns): the measurement, and what I will not build

For Fable 5.2 and the owner, 2026-11-14. You asked me to say which this is — mine to build
from declared slots, or yours to rule — **before** writing anything. This is that answer.
Nothing is written.

## The short version

**It cannot be done by matching finished text, and the measurement says so plainly.** On a
sheet whose creature is a named person, 28% of "it"/"its" mean the TARGET, not the creature,
and the two cases are written in the same words. Swapping them would be wrong on a quarter of
the pronouns on the card.

## The measurement

105 named-person Humanoid sheets across the saved runs of 11-05 to 11-14; 103 carry "it" or
"its". 361 occurrences, classified by their antecedent in the same sentence:

| what the pronoun means | count | |
|---|---|---|
| **the creature** | 189 | 52% — these are the ones fix 5 wants to change |
| **the target** | 101 | **28% — must not change** |
| no antecedent in the sentence | 71 | 20% — undecidable from the sentence alone |

And this is the pair that settles it. Both from Lord Vexmoor's own card:

```
Protective Magic.      …gaining a +5 bonus to AC until the start of its next turn.   <- VEXMOOR
Bone-Shackled Thrall.  The target has the Frightened condition until the end of its next turn.   <- THE TARGET
```

Same four words, opposite referents. No string rule separates them, and a rule that tried
would be exactly the kind of word rule this project refuses to write.

## Where the pronouns come from

By row provenance, over the same 361:

| | | reachable from declared data? |
|---|---|---|
| authored (seat/repair) | 23% | **yes, as a prompt field** — the call already answers `inline_kind: person\|kind`; it can be told to write the creature as they/them |
| chassis (donor rows) | 22% | yes — our own catalog text |
| template frames | 21% | yes — our own catalog text |
| **print** | **20%** | **no** — print's sentences are print's |
| kit | 10% | yes |
| rules / library | 3% | yes |

So ~80% is reachable without touching finished text: a pronoun slot in the frames we author,
plus telling the authoring calls the creature's pronoun. The frame's author knows which "it"
is the creature, because they wrote the sentence — that is the declared knowledge the string
rule lacks.

## Why I still do not recommend building it yet

The 20% that cannot be reached is print's rows, and they sit on the same card. A sheet that
says "Vexmoor adds 3 to **their** AC" in our rows and "Once on each of **its** turns" in
print's reads worse than one that says "it" throughout — the inconsistency is more visible
than the original problem. Fixing print's share means tagging pronoun referents across 1,310
corpus rows, which is a much larger piece of work than fix 5 was scoped as.

**So this is the owner's ruling, not my build.** Three shapes:

1. **Catalog + calls only, accept the mix.** ~80% of pronouns become they/them; print's rows
   keep "it". Medium work, and the result is visibly inconsistent on any sheet with print rows.
2. **Catalog + calls + tag print's referents.** Consistent, and the only version that actually
   delivers "a person is never 'it'". Much larger: 1,310 rows, and it is corpus work of the
   same kind as the Archmage repair but three orders of magnitude bigger.
3. **Don't.** Print itself writes every humanoid NPC — the Archmage, the Knight, the Priest —
   as "it". The bar would be a change from print's own register, not a defect against it.

My own read is (3) for now and (2) if the owner wants it properly, because (1) ships a card
that is half-corrected and looks like a bug. But the question "should a named person read as
'it', the way print writes its own NPCs?" is a taste call about the product, and that is the
owner's.

## What would be true regardless

If the owner picks (1) or (2), the first step is the same and is cheap: the seat and repair
calls are told the creature's pronoun. They already receive `inline` and the creature's name,
`inline_kind` already distinguishes a person from a kind, and the model writes 23% of the
pronouns. That is a prompt field and a declared answer, not string surgery, and it is the
part I would build first in either case.

## Fix 6 is unaffected and I am starting it

The compound-with-a-print-head routing (typed40 #16 "vampire pirate", "ogre blacksmith") does
not touch this. Controls that must NOT become twists: "cathedral-vault ooze" and "Mind Flayer".
