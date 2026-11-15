# Probe A — the identity call, told which printed creature this one resembles

For Fable 5.2 and the owner, 2026-11-14. Nothing shipped. Raw answers for all 120 rolls:
`scripts/smoke-evidence/PROBE-A-raw-2026-11-14.txt`.

```
node --import ./scripts/alias-loader.mjs scripts/probe-layer-a.mjs 5      (120 calls)
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  220 suites, 5233 passed, 26 skipped   (flags off, suite unchanged)
```

## Corrections to the engine table

Everything in it holds except these. The second is material to how Probe A reads.

| claim | correction |
|---|---|
| "about 38 kinds" of print-canon stamp | **31** distinct `trace('print canon …:')` prefixes |
| `signature_mechanic` is not read by the reskin engine | **confirmed, 0 uses** — and this is the probe's main finding, below |
| the call recalls "the tradition"; this probe makes it explicit | **it is already partly explicit.** `lexicon.mjs:35` carries a hand-written `CUES` list that briefs a print hallmark for five creature words — troll, golem, zombie, **spider**, mephit. So arm 0 is already told *"a spider carries print Spider Climb — unless it merely weaves, wears, or hunts spiders"*. The medusa, mummy, ghoul, hag and ghost get nothing. That is exactly where arm 0 scores 0-1 of 5. |
| the key's model for the clockwork spider is the Spider | **the 2024 Spider is CR 0 and has no web** — only Spider Climb and Web Walker. The Web (Recharge 5-6) belongs to the **Giant Spider** (CR 1). Arm 1 therefore cannot name that hallmark by construction. Scored as written; the owner settles it. |

The `CUES` list is worth the owner's eye on its own: it is a word list over the GM's text, of the kind the "no list of GM words" leaning rules out, and it covers five creatures out of 329.

## The counts — read from the raw answers, not matched

| prompt | hallmark | arm 0 | arm 1 | arm 2 |
|---|---|---|---|---|
| clockwork spider | a web / ranged restrain | **5/5** | 5/5 | 5/5 |
| medusa sculptor | a petrifying gaze | **5/5** | 5/5 | 5/5 |
| vampire pirate | drinks blood and is mended | 3/5 | 2/5 | **5/5** |
| Mother Ash | deception: disguise, mimicry | 0/5 | 2/5 | **3/5** |
| mummy librarian | a rotting curse, or a frightening glare | 1/5 | **4/5** | **5/5** |
| ghoul gravedigger | claws that paralyse | 0/5 | 0/5 | **5/5** |
| bell-ringer's ghost | possession, or a frightening visage | 0/5 | 0/5 | 0/5 |
| **of 35** | | **14** | **18** | **28** |

**The feed works, by the kill bar: arm 2 beats today's prompt by 14 rolls, against the 5
needed.** It is the only arm that reaches the ghoul's paralysis or the vampire's drain.

**And arm 2 misses the positive bar**: it needs 4 of 5 on at least 6 of the 7 hallmark prompts
and makes 5 — Mother Ash at 3/5 and the ghost at 0/5.

## The three side reports

**1. The model line DOES drag the nature, and arm 2 is the offender.** `medusa sculptor` came
back **Aberration** and **Fey** under arm 2 where arms 0 and 1 held Monstrosity every roll;
Mother Ash came back **Fiend** under both arms 1 and 2 where arm 0 said Fey or Undead. The case
you named is safe — **the clockwork spider held Construct in all 15 rolls** — but the general
risk is real and the signature sentences are where it comes from.

**2. The ogre control is clean.** All three arms answered `thrown-weapon`; no arm invented a
hallmark for a creature whose only hallmark is its numbers. Arm 1 drifted once to `aura` and
once to null, which is noise rather than invention.

**3. The sentence beats the rows, and the rows arm is structurally blind.** The handoff defines
arm 1 as traits, non-attack abilities and gated rows — and the **2024 Ghoul has none of those**:
its paralysis lives inside the Claw attack row, so arm 1 briefed it nothing and scored 0/5
where arm 2 scored 5/5. Same shape for the vampire, whose drain is its Bite. **No 2014 number
leaked** into any answer I read, including from the Ogre's sentence, which contains "2d8+4",
"AC 11" and "INT 5".

The ghost is the one prompt no arm reaches. Every roll in every arm wrote the bell — the GM's
own image — and none wrote possession or a frightening visage. The brief did not displace the
concept; it did not reach it either.

## What I would put first, ahead of any brief

**The call already answers the hallmark as a closed enum on today's prompt, and the engine
reads it nowhere.**

```
clockwork spider   signature_mechanic = snare          5/5, arm 0
medusa sculptor    signature_mechanic = gaze           5/5, arm 0
ogre blacksmith    signature_mechanic = thrown-weapon  5/5, arm 0
bell-ringer ghost  signature_mechanic = aura           5/5, arm 0
```

`signature_mechanic` has **0 uses in `reskin/generate.mjs`**. Before briefing the tradition
harder, the cheaper question is why the answer already on the table is discarded — and that is
a question about the engine, not the prompt.

Note what the enum does and does not carry: `snare` and `gaze` ARE the spider's and medusa's
hallmarks, so for those two the answer is already complete. For the ghoul it answered `snare`
(the grave-soil, not the paralysis) and for the ghost `aura` (the knell, not possession) — so
the field is the creature's chosen mechanic, not necessarily the model's hallmark. Both facts
matter to the design.

## Where this leaves the design question

- "Resembles" as a feed to the identity call **works** and the signature sentence is the better
  brief, at the cost of dragging the nature on two of eight prompts.
- The cheaper half may be upstream of it: one enum field the call already answers and nothing
  reads.
- The `CUES` list is the existing, partial, word-list version of this brief, and any decision
  here should say what happens to it.
