# Handoff — fix 6: one field on the path call, and a stop I am flagging

For Fable 5.2 and the owner, 2026-11-14. Assumes no conversation history.

## The finding, and a correction to my own first answer

**I first reported that fix 6 needed no build, on a measurement that was wrong.** The number
was 20 of 20 correct at the routing decision. It came from a probe that sent a bare user turn
while production sends a system turn (`'You are an assistant Game Master.'`) and disables
DeepSeek's hidden reasoning (`ai-client.mjs:217`, `ai-adapters.mjs:31`). A probe fed the wrong
context returns a confident meaningless number — the third time this sprint — and the probe's
header now says so.

With production's own request, the defect is real and severe:

```
                             BEFORE          AFTER
vampire pirate  CR10 2014    3/10 twist     9/10      <- the exact typed40 #16 form
vampire pirate  CR 8 2024    9/10 twist    10/10
ogre blacksmith CR 3 2024    1/10 twist     4/10      <- improved, NOT green
cathedral-vault ooze        10/10 homebrew 10/10      <- control holds
Mind Flayer                 10/10 homebrew 10/10      <- control holds
```

And the saved history agrees it was never fixed: across 9 runs and 41 unique prompts,
**10 prompts (24%) flip their path between runs**, six of them `homebrew`/`twist` with
homebrew wrong. The flips happen within a single day, so this is not a change over time —
and no saved run predates 11-08, so the "f867440 already fixed it" story cannot be tested
at all.

## The cause, and the one-field fix

The call was treating `print_body` and `class` as mutually exclusive. On `ogre blacksmith` it
answered `class: fighter, print_body: null` **7 times in 10** — so the dispatcher never saw a
body to twist and correctly routed `class_npc`. Not a dispatcher bug; the call never named
the Ogre.

The fix is one clause on the `print_body` field, stating that the two questions are
independent:

> ANSWER THIS INDEPENDENTLY OF "class": they are different questions and both can be filled.
> If a published creature noun is in the words, name it HERE even when you also answer a
> class, a trade or a title — the job word describes what the creature DOES, and this field
> is what it IS.

No example was added, deliberately — a prompt example teaches the answer, and an example
built from the failing case would be tuning to the test.

## Isolation: the 2014 shelf routes worse

Measured before the fix, 10 rolls each, same words:

| | 2014 | 2024 |
|---|---|---|
| CR 10 | 5/10 | 7/10 |
| CR 8 | **3/10** | **10/10** |

Consistent in direction at both CRs. Not chased further — it is a separate finding, and the
fix above lifts 2014 to 9-10/10 anyway.

## Over-trigger check — 39 of 41 unchanged

Step 2, one call per prompt against every saved prompt. The "before" is not a re-run: each
saved sheet recorded its own `[path]` line, so the saved runs ARE the before.

Because the call is stochastic, a prompt's "before" is the SET of paths it has shown. 39 of
41 land inside that set. **Two show a path never seen before:**

| prompt | before | now | read |
|---|---|---|---|
| `Shadowfang \| the druid's wolf companion` | homebrew | **twist** | right — a wolf companion should stand on the Wolf. This is the fix doing its job. |
| `Mother Ash \| hag midwife` | class_npc | **homebrew** | **unexplained.** Neither is a twist on the Green Hag, which is what it probably should be. A lateral move between two answers that both look wrong. |

Both are single rolls on a stochastic call, so neither is conclusive — but by the rule that an
unexplained change is a stop, **Mother Ash is a stop**, and I am flagging it rather than
calling this done.

## A real defect found on the way: the path prompt contradicts itself

Writing the tests surfaced this. The prompt says both:

> "a goblin assassin" a twist on the Goblin, because a MONSTER named as itself outranks a
> class word

and, further down:

> TWO WORDS, A PEOPLE AND A ROLE, IS ALWAYS class_npc with that role as the class and that
> people as the species: "lizardfolk monk" is class_npc

A goblin is on the prompt's **own list of peoples** (hobgoblin, goblin, kobold, lizardfolk,
orc, tabaxi, goliath, tiefling), so both sentences claim "goblin assassin".

`dispatch` implements the second, through `isPersonBody` — the Goblin Warrior is a Humanoid,
so the class keeps the sheet and the answer is `class_npc`. I pinned that as the behaviour
and did NOT pick a side in the prompt, because which one is right is a design question:
should "goblin assassin" be the Goblin Warrior's body with a rogue's kit, or a rogue NPC of
the goblin species? **Owner's call.** It is not fix 6 — fix 6's cases are the Vampire
(Undead) and the Ogre (Giant), neither a person block, so both take the twist branch cleanly.

## Where this leaves fix 6

**Landed, partially proven.** The prompt change is a clear improvement with the controls
intact, but it does not reach the brief's bar:

- `vampire pirate` 9-10 of 10 — green
- `ogre blacksmith` **4 of 10 — not green** (the bar is 5 of 5)
- controls 10/10 and 10/10 — green
- `Mother Ash` moved to a path never seen before, unexplained — a stop by your own rule

My recommendation is to take the prompt change (it is strictly better on every measured case
and the controls hold) and treat `ogre blacksmith` and `Mother Ash` as the remaining work,
rather than to hold the improvement back. But the stop is yours to clear.

## Tests

`a-compound-with-a-print-head.spec.js`, **8 tests**, categories as proposed:

| category | written |
|---|---|
| a compound with a print head routes as a twist on that head | yes (2) |
| a control whose words merely contain a print name | yes (1) |
| a bare print name is exact; the same name plus a description is a twist | yes (1) |
| **a creature print does not have gets no body** (added — see correction 1) | yes (1) |
| a people plus a role is class_npc (pins the contradiction above) | yes (1) |
| a person block keeps the class path | yes (1) |
| relation "resembles" never welds the body on | yes (1) |

All assert on `dispatch()`'s return value. **No assertions on prompt wording** (Ruling 1).
They pin the CODE half, which is deterministic; the call half is what the probe measures.

## Command and counts

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
```

Noted for comparison, since the last report gave a number without its command: the narrower
`npx jest src/tools/statblock-generator` is the 180-suite / 4,553-test figure Fable 5.2 ran.
Both are right; they are different scopes. Every count I report from here carries its command.

## Landed, unproven

- The `print_body` independence clause: proven on the five named cases and the 41-prompt
  sweep, NOT on whole blocks. No block run was made for it — step 3 of your order is not done.
- `ogre blacksmith` at 4/10 and `Mother Ash`'s unexplained move are both open.

## Still open

- The path prompt's self-contradiction about a people plus a role. Owner's call.
- `ogre blacksmith` is 4 of 10, below the bar.
- `Mother Ash | hag midwife` moved class_npc -> homebrew with no explanation.
- The 2014 shelf routes worse than 2024 on the same words.
- Step 3 (whole blocks, for wiring) not run.
