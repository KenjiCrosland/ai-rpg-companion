# The idea call is forbidden the vocabulary we then match it on

**Owner, 2026-10-27:** *"the idea is not about length for the ability, maybe we
tell deepseek this is for dnd but also to use maximum creativity so then it'll
be easier to match to an existing template."*

This corrects an earlier framing of mine that called it a LENGTH problem. It is
not. It is REGISTER, and the cause is an explicit instruction in our own prompt.

## The cause, verbatim from `buildIdeaPrompt` (templates.mjs)

> "You are inventing the SIGNATURE ability for a nearly-complete D&D monster.
> Everything below is already final. Describe the ability in PLAIN WORDS — what
> it does, when it fires, whom it affects, what limits it. **NO rules grammar, NO
> numbers, NO dice, NO DCs, NO condition names in capitals**: the engine owns
> every number and will pour your idea into a printed rules shape afterwards."

We tell it not to use rules grammar or condition names. It obeys, and returns
narrative prose. The FIT call then has to match that prose against templates
whose cells are declared in exactly the banned terms (`trigger`, `effect`, the
condition). The mismatch is self-inflicted.

The instruction bundles two bans that should be separate:

- **"don't invent numbers/dice/DCs" — KEEP.** The engine owns pricing and CR
  math; an LLM-invented DC is a real defect class.
- **"no rules grammar, no condition names" — THIS IS THE ONE TO RELAX.** It
  removes the only vocabulary that makes an idea matchable to a shape.

"Maximum creativity" is the other half of the owner's note: the goal is not a
tamer idea, it is a creative idea *in the game's own idiom*. Do not trade
inventiveness for matchability — the owner's reason for leaving the call free
stands ("I wanted the llm to be free from prejudice when creating a signature
ability"). The target is the IDIOM, never the content.

## The measurement behind it

Across 490 sheets (runs of 2026-10-24..27):

- 94 `signature miss:` lines — a seat that never got a pick.
- **91% had a menu OFFERED and the fit call refused every template on it.** Only
  8 lines (9%) had an empty menu, the sole true catalog gap.
- **0% of missed seats were rescued** within three trace lines.
- Refused ideas: mean 49 words, median 50, p90 67 — long because they describe
  two or three mechanics at once, which is what prose invites.

A refused idea, with ten templates on its menu:

> "When the haft hits a wounded foe with its shortsword, it wrenches the blade
> free in a spray of blood and immediately hurls a handaxe at a different enemy,
> using the first foe's body as a pivot to catch a second target off guard. The
> throw carries the same vicious momentum, leaving the first foe reeling and
> unable to strike back cleanly." [rider/on_hit/damage]
> (offered: isolation, charge, composed:payoff:damage, affliction, contagion,
> stunning-strike, charge-push, pounce, bolt-mark, disarm)

Three mechanics in one idea and no rules word in any of them. The refusal is
correct; the prose is what we asked for.

## Ranking

The owner first deferred this ("a lever to pull if other levers fail"), BEFORE
either of us knew the prompt actively forbids the register. That evidence makes
it cheaper and better-targeted than the deferral assumed, so the ranking is
worth re-confirming with the owner rather than inherited.

For comparison, the other seat-loss buckets over the same 490 sheets: 168 of 252
accepted picks never reached a sheet (67%); the named drop sites are the value
floor 57, the weld 41, no-legal-template-or-seed 24, trait ceiling and budget 16.
The death-site instrument (`dropLog`/`noteDrop`, read by `readGapOutcomes`) was
added to attribute the rest.

## If and when it is pulled

- Change the IDEA prompt only. Keep the numbers ban word for word; relax the
  rules-grammar and condition-name ban so the idea may say "a saving throw",
  "the Frightened condition", "a reaction", "an area".
- Say it is for D&D 5e and ask for maximum creativity INSIDE that idiom — one
  mechanic, the shape of a printed row.
- Never a validator that rejects an answer, and never a word rule
  (`plans/`, "Meaning is a call field, never a word list").
- Measure the same way afterwards: the `signature miss` rate WITH a menu offered
  (91% today), and shapes-landed-per-sheet (mean 1.2 today, 2 seats attempted on
  93% of sheets). If the miss rate does not fall, revert.
- Two failure modes to watch: ideas that merely restate a template's own text
  (matchable but not creative — check the sameness metric, aura rows are 18% of
  sheets today), and an idea so terse the fit call has nothing to bind a receipt
  to, which shows up as more `free signature row` decoration rows.
