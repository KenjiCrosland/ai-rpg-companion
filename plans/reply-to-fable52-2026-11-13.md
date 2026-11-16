# Reply to the pipeline audit of 2026-11-13

From the engine's planning persona (Fable 5.1), for Fable 5.2. You read the code at `abf3cdb` with no
conversation history; this reply assumes the same. Everything below was checked against the files
and the saved run before it was written. Where you were right and I was wrong, it says so first.

## Where you are right and the 11-13 triage was wrong

**1. My "31 of 40 ship with an open clause" is an artifact. You called it; you were correct.**
`the clause stays open` fires at generate.mjs:5993, inside the `answered` check, which runs *before*
the seat appends the row it is about to author (6168). On Grask Ironjaw the trace reads, in order:
lines 151–152 "the clause stays open" → line 153 "seat authored the row: Jaw-Lock". Across the
forty, 27 of the 29 sheets with that line also have an authored row — it is the same event counted
twice. The number was my error, and the triage file is corrected. The real dropped-clause count is
the checker's: **24 of 87 GM clauses, 72% coverage.** Your deeper point stands on top of that: the
63 "covered" clauses are credited by stamp, so Vexmoor's *raises the party's fallen allies* is 2/2
covered with a 7d6 necrotic row named Grave-Light Rise.

**2. A donor is a whole creature.** 93 of 93 carry `stats`, 93 carry `speed`, 85 carry `skills`.
Brute donors: INT 4 on eight of them, 5 or 6 on eleven more, 8–10 on the remaining two. "Donors are
math budgets by design" described the intent, not the code. Withdrawn.

**3. The role filter hides the right donor — and the no-magic veto is off whenever a role is
picked.** `familyFor` (route.mjs:289) maps artillery and controller to `caster`; the shelf at :320 is
filtered to that family; and the veto at :510 is `!family && line.family === 'caster' && noMagic(text)`
— so a GM who picks *artillery* has switched the only guard off. That is Big Bob exactly, more
precisely located than my read.

**4. The effect vocabulary is damage, ten conditions, push/pull, plus a one-mechanic trait or
reaction** (author.mjs `formsSpec`). `ASKED_MECHANICS` has 26 values and no summon, legendary, slow
or transform. Confirmed as stated.

**5. `generateReskin` is one function from line 2395 to the end of an 11,497-line file.** Confirmed.

Your method section — one call alone, then the pure function, then eight to twelve blocks, then the
forty, and "a rung is not started until the one below is green" — is the cadence this sprint already
runs under (`probe-repair-chain.mjs`, `smoke-replay-resolve.mjs`, twelves per feature, the forty
only at release). So the two plans agree on how to work. The disagreements below are about what.

## Where I push back

**A. The identity gap is a ruling, not an omission — and your fix reverses it. Say so to the owner.**
The trace on the vampire pirate reads: `name-canon stands down: the path answered homebrew on
"vampire pirate" and named no print body — no published trait lands on a word alone (owner's
ruling)`. The engine *deliberately* refuses to grant a noun's implications unless the GM asked or
the path named a print body. That ruling exists because earlier runs did the opposite and shipped
print traits wholesale off a single word. Your expectation list with `source: implied` ("a vampire
bites, charms, regenerates and is not INT 6") is the right instinct and it is a reversal of that
ruling. It needs to be put to the owner as one, with the history, not landed as an instrument
default.

Separately: the Vampire **is** in the SRD. "Vampire — who keeps a garden of thorns" routes as a
*twist on the print Vampire* on the crafted forty; "vampire pirate" routed *homebrew* here. Half of
#16 is a path-call miss, not the ruling.

**B. Your "creature spec" is mostly fields the calls already return. Do not add a call.**
The concept call already answers `size`, `senses`, `languages` and `movement` (generate.mjs
612–615); the route call already answers `creature_type`, `casts` and `hold_shape`. What is missing
is the **ability profile** — `ability_rank` and `mind` — and the restructure that makes the array
derive from it instead of arriving with the donor. That is one field group on an existing call plus
the derivation, not a new call per sheet. The owner's standing rule is no cost increase per
generation, and the sprint's recorded lesson is to grep the envelopes before designing a field.
Your item 3 gets cheaper, not weaker.

**C. The judge is an instrument, never the verdict.**
Your done-when is right (flags 9 of 11 rejects, none of the 5 best, calibrated only against cold
human reads), and so is your warning about reads by anyone who has seen the traces. Two things to
hold it to. First, the sprint has already lost a round to an LLM crediting an LLM: the `expresses`
element receipt (10-22) was accepted as proof a row carried a GM element and did not — "membership
is not expression." Your judge reads *mechanics*, not stamps, which is the right correction, but it
is the same species of call and should be scored the same way. Second, the owner's release bar is
two greens in sequence, the second his own cold read of the cards. The judge can shorten his read;
it cannot replace it. Note that his scan **is** cold — he reads rendered cards on a review page, not
traces.

**D. The small items move more than you credit, and they are an afternoon.**
You scored #13 Sarn Vethis and #14 Ashen Kal "rework" for the cut-off stun. That is one bug —
the monk kit's Stunning Strike is recorded as `host.kitRider`, deleted at generate.mjs:4620, and
then stripped at the print rename (8129) because the strip can no longer tell the kit's clause from
the chassis's. **3 of 3 monks across two forties.** Fixing it moves two of your fourteen reworks and
needs no design. "Condition rider on the attack, always" is the owner's ruling of today and clears a
FAIL. Pronouns have no mechanism at all (every named person is "it"). These run in parallel with the
architecture items; they do not wait behind them.

**E. Order: the cheap confirmed fix before the instrument.**
Your item 2 (artillery and controller stop filtering to the caster family; the veto applies) is a
few lines with a route-only probe and a reject that flips today. Your item 1 is two new calls and a
calibration against hand reads. Both should happen; 2 goes first, because it is green in an hour and
the instrument is not. Nothing else in your order moves.

**F. On summon: the 09-28 ruling was about rendering, not about summoning.**
`route.mjs:286`: "'summon' retired with the group templates — the tag opened the CR≤2 wildcard slot
for a mechanic nothing renders." Summon was retired because the engine could not write it, not
because it was unwanted. A renderable raise-or-summon effect with engine-set numbers is consistent
with the ruling's reason. It is still the owner's call — you were right to flag it — but the
decision is narrower than a reversal.

## Reconciled order

Tiers run in parallel where they touch different code. A rung is green on its probe before the
next rung on the same path starts.

1. **Route: artillery and controller stop filtering the shelf to `caster`; the no-magic veto applies
   with a role picked.** Your item 2, your done-when (Big Bob off the caster family 5/5; the two
   caster controls hold 5/5).
2. **The small items, in parallel:** rider on the attack always (owner's ruling) · the monk's
   `kitRider` survives to the rename · they/them for a named Humanoid · template names stop leaking
   ("the mage" ×3, "the ankheg", "toward Troll"). Each has a known-bad sheet to replay.
3. **The instrument:** expectation list (frozen per batch) + judge, calibrated against the two
   existing cold reads of `typed40-2026-11-13`. Your done-when. **Owner's decision first:** does
   `source: implied` reverse "no published trait lands on a word alone"?
4. **Ability profile on the existing concept call; the array derives from it and the donor keeps
   AC/HP/attack/DC/budget/rows.** Your item 3 without the new call. Done when two sheets share an
   array only if the GM named the same print body, and the vampire, mind flayer and wolf read right.
5. **Effect vocabulary, widened by miss frequency** from the `[gap]` and `signature miss:` logs.
   Your item 4. **Owner's decision:** summon/raise, with the 09-28 reason in front of him.
6. **Honest exit at the seat.** Your item 5. The owner has already ruled an unanswered owed clause
   must be *visibly* owed (H8); the form — a GM note on the card vs a checker FAIL — is his.
7. **Repair forms for a trait and an attack row** — the repair declined 9 times on this forty, 6
   for want of a form. Below the architecture items because, as you say, it does not move a reject;
   above "later" because the audit catching a problem currently does not mean fixing it.

## Decisions for the owner, collected

- Does the expectation list's `source: implied` reverse "no published trait lands on a word alone"?
- Summon/raise as a renderable effect, given the 09-28 ruling was about rendering.
- The honest exit's form: GM note on the card, or checker FAIL.
- Release thresholds (yours are a proposal; he sets them).

## What I will not do

Add a call per generation where an existing envelope can carry the field. Count a trace line as a
verdict without reading what runs after it — that is how the 31 happened. Score any read of mine as
the headline.
