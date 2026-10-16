# Hold 1 — "no magic at all" not honored

**Critic's hold:** the same prompt produced one clean priest and one carrying the
Priest's Spellcasting and Divine Aid, and the second block's trace showed no lack
line, "so nobody can tell whether the call read 'has' or never split the clause."

**Owner's ruling that shaped the fix:** "A random failure on an LLM is better than
100 silent regex failures that are consistent but invisible because we aren't
testing them" — with three obligations for every LLM-populated field: trace the
answer, check the engine against it, and measure the error rate. Plus, mid-fix:
"let's not give up if the prompt gives us the wrong answers consistently. Let's
adjust the prompt."

## What it actually was

Not a plumbing gap. Regenerating the block live answered the critic's question:

```
[reskin] polarity declared: "no magic at all" has — the call's own reading (the words alone read lacks)
```

The call read it as **has**. Polarity was computed and persisted correctly; the
answer was simply wrong. (I first suspected the field wasn't being saved and
nearly fixed the wrong layer — the saved record from the critic's run has no
`polarity` key, which looks like a plumbing bug and is really just the call
having answered "has".)

And the cause was a prompt I wrote earlier the same day: every example in it was
a **body** lack — blind, eyeless, mute, wingless, lost its legs — and I had added
"MOST CLAUSES ARE has" to stop a clause-smearing problem found that morning.
Together they taught the call that an *ability* lack is not a lack. The 6/9 → 9/9
fix had over-corrected into a new failure.

## The three obligations, now met

**1. Trace.** Every clause puts its polarity on the record, unconditionally:

```
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
```

**2. A predicate checks the engine against the field.** `lack-honored` fails when
the record says a thing is absent and the sheet still carries it. It is correctly
*silent* on a call misread — that is the division of labour: the gate catches
engine bugs, the trace and the rate catch call misreads.

**3. The rate, measured** — four phrasings, two runs each, ten lacks-clauses:

| design | misses | false positives |
|---|---|---|
| per-clause `has`/`lacks` label | **4 of 10** | 0 |
| one `lacks` list, provenance receipt | 0 of 10 | **1** |
| one `lacks` list, both receipts, prompt restated | **0 of 10** | **0** |

The first row is why the question changed rather than the wording: the misses were
**random**, not systematic — the same sentence answered both ways on two rolls, so
no example set could fix it. The owner chose the redesign.

## The redesign

Instead of labelling every clause, one direct question:

> `"lacks": [<EVERY thing the user said the creature does NOT have. Quote the
> user's OWN WORDS. EVERY entry must contain a word that takes something away:
> "no", "not", "cannot", "never", "without", "lost", "stripped", or a word that
> means the absence itself — "eyeless", "mute", "blind", "deaf", "wingless">]`

It is the question the GM's sentence actually answers, and it is one short list
instead of a judgement on every fragment.

**Two receipts, because one was not enough.** Round two caught 10 of 10 lacks and
then listed "tracks prey by scent alone" as one — the GM's own words, so
provenance passed, and the ability the GM asked for would have been **deleted**:
the exact harm of the retired design. So an entry must both

1. **quote words the GM typed**, and
2. **name an absence** (the same closed privative check the old design used).

Each refusal says which receipt failed, because the first version reported
"quotes nothing the user typed" for a phrase that plainly quoted the user — a
trace giving the wrong reason is worse than no trace.

**The prompt was fixed too, not just the gate** (owner's instruction). The old
wording said *"and neither is 'tracks prey by scent alone'"* — and the call listed
that precise phrase. Naming a thing inside a prohibition primes it. The prompt now
states the engine's receipt *positively* and carries no negative examples, so the
call and the engine check the same rule.

## A finding to carry forward

On the eyeless block, run 3, the call offered `"no magic at all"` as a lack —
**my prompt's own example**, echoed onto an unrelated concept. The provenance
receipt refused it. This is the third sighting of prompt examples leaking into
output this sprint (`Flame Whip`, `Scythe`, now this), and it is the argument for
keeping the provenance receipt permanently rather than as a crutch: examples in a
prompt are a generative source, not only an illustration.

## Also collapsed

`LACKS_STOP` — the words a lack phrase carries that name nothing ("no magic AT
ALL") — lived in checker.mjs and inline in generate.mjs, and this work wanted a
third copy. One home now, both read it.

## Gate

`npx jest` 2730 passed / 70 suites. `npm run build` clean. Seven pins rewritten
from the retired label to the list, plus the two receipt pins and one asserting
each refusal names its own reason.
