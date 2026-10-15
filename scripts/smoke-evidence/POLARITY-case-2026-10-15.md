# polarity on the clause object — folded in, and measured

**Question the owner asked:** separate metadata pass, or fold into an existing
pass and see how competent the LLM is? ("My guess is latter first.")

**Answer: fold in, and it was not close.** The main call already returns
`clauses: [{text, kind}]` — one object per thing the GM typed. `polarity` is one
more key on a structure that exists, in a prompt section that exists. No new
call, no new pass, no extra latency.

The audit found something stronger while wiring it: **the engine already pays for
the model's judgement and throws it away.** `kindOf` runs `isHeader` → `NEG_CUE`
→ `MECH`/`PART` and consults the model's own `kind` only as a last resort. Five
regexes override a field the call already fills — inverted from the principle.

## The competence measurement (run 1, before any fix)

Batch: four concepts built from the phrasings `NEG_CUE` gets wrong.

| the GM's clause | the call | the regex | right |
|---|---|---|---|
| "an eyeless hunter" | **lacks** | has | call |
| "a born-mute bodyguard" | **lacks** | has | call |
| "sightless" | **lacks** | has | call |
| "lost its wings in the fall" | **lacks** | has | call |
| "never surprised" | **has** | lacks | call |
| "has not one but three eyes" | **has** | lacks | call |
| "tracks prey by scent alone" | lacks | has | **neither — the call erred** |
| "a wyvern" | lacks | has | **the call erred** |
| "now hunts on foot" | lacks | has | **the call erred** |

**6 of 9, and all six are cases the regex gets wrong** — including both reverse
cases, where a negative word sits inside a positive clause. On the half that
matters it is plainly more competent than the regex.

The three misses were not misunderstandings. They have one shape: **the call
labelled every clause with the polarity of the sentence it came from.** And it
cost something real:

```
lacks clause: Bonus Actions/"Scent-Stalk (2/Day)" leaves — "tracks prey by scent alone"
```

The call deleted the ability the GM asked for — our own "a gate may shape what
the GM asked for, never remove it", violated by the call's answer.

## Both halves fixed

1. **The prompt** says polarity is per clause, that **most clauses are "has"**,
   and carries the live failure verbatim as its example: in "an eyeless hunter
   that tracks prey by scent alone", only the first clause is lacks — marking the
   second would delete what the user asked for.

2. **The engine demands a receipt** — the half worth keeping even if the prompt
   fix were perfect. The engine cannot *detect* a lack; that is what `NEG_CUE`
   failed at and why the call is asked. It can require that a *claimed* lack name
   the absence in its own words: a negation, a privative adjective (`-less`,
   blind, mute, hollow), or a verb of loss (lost, stripped, severed, bereft). No
   receipt, no lack — the words read instead, with a traced reason.

Replayed over all nine answers the receipt refuses exactly the three errors and
keeps all six wins: **9/9**.

## Run 2 — the confirm

```
polarity declared: "an eyeless hunter" lacks — the call's own reading (the words alone read has)
polarity declared: "a born-mute bodyguard" lacks …
polarity declared: "sightless" lacks …
polarity declared: "lost its wings in the fall" lacks …
polarity declared: "has not one" has — the call's own reading (the words alone read lacks)
polarity refused:  "a wyvern" was called lacks, but nothing in it takes anything away — the words read has
```

The three run-1 errors are gone two different ways: the prompt fix stopped the
smear ("tracks prey by scent alone" and "now hunts on foot" came back **has**,
so they never reach the receipt), and the receipt caught the one that remained
("a wyvern").

**The deleted ability is back.** Block 01 now ships `Bloodscent Pursuit` — the
GM's scent tracking — beside `Senses blindsight 60 ft. (blind beyond this
radius)` for the eyeless lack. Both of the GM's asks, on one sheet.

## The next layer this exposed — a finding, not a fix

Polarity is now right; **the consumer that decides WHAT is lacked is not.** It
finds the lacked thing by slicing the words *after* the negation word, which
works for "lost its **wings**" (`removal clauses: wings`) and finds nothing at
all when the lack is an adjective.

Block 02 is the proof: "a born-mute bodyguard" is correctly labelled lacks, and
the sheet still reads `Languages Common`. A mute creature should read
"understands Common but can't speak" — print's kenku line, which `header.mjs`
already knows how to write. `SPEECH_CUE` does not contain "mute", so the
Languages line never hears about it.

That is the next question in the same family, and it is the one the plan calls
`acts_on` generalized: **what does this clause take away?** The call that labels
the polarity is holding the answer in the same breath.

## Gate

`npx jest` 2678 passed / 67 suites. 33 pins in
`reskin/__tests__/weapons.spec.js`, 7 of them polarity: the adjective lack, the
negative-word-in-a-positive-clause overrule, no answer falling back, a junk
answer refused, the live smear refused with its receipt, how English actually
says lacks (7 phrasings), and one asserting the question rides a **single**
existing `clauses` key rather than a pass of its own.
