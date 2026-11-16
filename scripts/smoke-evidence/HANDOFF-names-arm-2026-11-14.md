# The names arm — measured, missed its bar, did not ship

For Fable 5.2 and the owner, 2026-11-14. Routing goes back to the owner with the numbers.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  219 suites, 5221 passed, 26 skipped
node --import ./scripts/alias-loader.mjs scripts/probe-path-key.mjs      (520 calls)
```

## The bars

| bar | result |
|---|---|
| 1 — the five named cases ≥9/10, the ooze control 10/10, typed40-13 and -22 ≥9/10 | **FAIL** (3 of 8) |
| 2 — more counted prompts right on every roll, none losing 2+ of 5 or 3+ of 10 | **FAIL** (24 vs 25; six prompts over) |
| 3 — every loss shown with raw answers | done, below |
| more-than-one-path (the number to drive down) | **6 → 10. Worse.** |

**The arm does not ship.** It is reverted; the finder and the probe are kept.

## The eight watched

| prompt | without | with | |
|---|---|---|---|
| fix6-ogre-blacksmith | 5/10 | **10/10** | the arm's win |
| typed40-16 vampire pirate (CR 10, 2014) | 10/10 | 10/10 | |
| fix6-vampire-pirate-2024 | 9/10 | 9/10 | |
| fix6-ooze-control | 10/10 | 10/10 | control holds |
| typed40-13 lizard folk shadow monk | 10/10 | 10/10 | control holds |
| typed40-8 Mother Ash | 3/10 | 5/10 | better, still far below |
| **ruling3-goblin-assassin** | 8/10 | **6/10** | **regressed** |
| **typed40-22 clockwork spider** | 10/10 | **6/10** | **regressed** |

## Why it fails: an offered name is a suggestion the call takes

**`clockwork spider`, 10/10 → 6/10.** Code offers Spider; the call answers `Spider=is` and
names it as the body on 4 of 10 rolls. Without the offer it answered homebrew every time.

```
got twist:Spider | raw body=Spider rel=is verdicts=[Spider=is]        x4
```

This is the over-trigger the step-2 sweep was built to catch, arriving through the arm itself.
The forced three-way answer does not prevent it — the call simply says "is".

**`goblin assassin`, 8/10 → 6/10**, through the two-name case the handoff said not to pre-solve:

```
got class_npc:Assassin  | raw body=Assassin rel=is class=rogue species=goblin
                          verdicts=[Goblin Warrior=resembles, Assassin=is]      x2
got twist:Goblin Warrior| raw body=Goblin Warrior rel=is class=null
                          verdicts=[Goblin Warrior=is, Assassin=resembles]      x2
```

Offering the **Assassin** beside the Goblin Warrior let the call take the job block as the
body, and naming the body so confidently dropped the class, turning the ruled `class_npc` into
a twist. **As instructed I am reporting rather than pre-solving: the closed-fact option is to
withhold person-block names when a monster name is present.** That is a proposal.

**What the arm genuinely fixed** is recall, exactly as the swap test predicted: `ogre
blacksmith` 5/10 → 10/10, and `goblin wizard` lost 5/5 without the arm and only 2/5 with it.
The mechanism works; the cost is that offering a name also licenses it.

## Every counted prompt that lost a roll, with the arm

```
typed40-5  necromancer BBEG          lost 1/5   homebrew | body=null rel=null class=null verdicts=[-]
typed40-8  hag midwife               lost 5/10  class_npc | body=null class=cleric verdicts=[Green Hag=not] x2, [Green Hag=resembles]
typed40-15 goblin wizard             lost 2/5   class_npc | body=null class=mage verdicts=[Goblin Warrior=not, Mage=resembles]
typed40-17 owlbear zombie            lost 1/5   homebrew | body=null verdicts=[Owlbear=resembles, Zombie=resembles]
typed40-22 clockwork spider          lost 4/10  twist:Spider | body=Spider rel=is verdicts=[Spider=is]
typed40-25 kobold raised by a dragon lost 1/5   homebrew | body=null species=kobold verdicts=[Kobold Warrior=not]
typed40-27 swamp witch npc           lost 3/5   class_npc | body=null class=mage verdicts=[Green Hag=resembles]
typed40-28 the druid's wolf companion lost 3/5  homebrew:Dire Wolf | rel=resembles verdicts=[Dire Wolf=resembles]
fix6-vampire-pirate-2024             lost 1/10  homebrew | body=null verdicts=[Vampire=resembles, Pirate=not]
ruling3-goblin-assassin              lost 4/10  (see above)
```

Note the pattern on typed40-8, -27 and -28: the call answers **`resembles`** or **`not`** on a
name that IS the creature. Offering it did not make the call believe it. "Hag midwife" is
answered `Green Hag=not` — the arm asked the right question and got the wrong answer.

## Receipts were validated as production does

Confirmed: the key probe passes **Name + Description** to `readPath`
(`scripts/probe-path-key.mjs`), matching `StatblockGenerator.vue`. 22 of the 44 key prompts
carry a Name, and passing the Description alone would refuse a receipt quoted from it. Both
probes now carry that note in their headers beside the system-turn lesson.

## The empty-relation table — and it did not reproduce

Counted over all 260 rolls per arm, split by whether the body was one code offered:

| | rolls with a body named and no relation | offered | unprompted | of those, the right body |
|---|---|---|---|---|
| without the arm | **1 of 260** | 0 | 1 | 1 |
| with the arm | **1 of 260** | 0 | 1 | 1 |

**My step 2 report put this at 6 of 10 on `goblin wizard`, and across the key it is 1 in 260.**
That rate was specific to one prompt on one run, not general, and I should not have written it
as the dominant blocker without a wider denominator. On the key run `goblin wizard` answered
`body=null` rather than `body=Goblin`. The erasure mechanism is real — the four shapes in your
addendum reproduce exactly — but it is rare, and the owner's decision to defer reject-and-retry
is supported by this number rather than merely allowed by it.

By the count's own rule: **empty answers are rare and cost no bar, so there is nothing more to
do on the relation.**

## Restating the step 2 counts under the corrected rule

The corrected `how_to_score` does not change them: my step 2 probe already scored
`dispatch().print_body`, not the relation. I verified the addendum's four shapes replay exactly
as tabled (`goblin wizard` with a null relation does come out as class_npc **on** the Goblin
Warrior).

So the 5-of-10 I reported and the 7-of-10 you computed are **both right, for different rolls** —
yours from the diagnostic run's raw tallies, mine from the counting run, where the five misses
answered `body=null` rather than `body=Goblin`. It is roll variance, not a scoring error. The
key run above measures the same prompt at 3 of 5 without the arm and 3 of 5 with it.

| prompt | carries the printed body | step 2 supplied it |
|---|---|---|
| goblin assassin | 10/10 | 0 |
| goblin wizard | 5/10 (this run) / 7/10 (the diagnostic run) | 0 |
| kobold priest | 1/10 | 1 |

Step 2 remains correct and nearly inert.

## What is in the tree

| kept | why |
|---|---|
| step 2's flag instead of its own refusal text | your fix; behaviour unchanged, the 9 tests cover it |
| the probe passing Name + Description | your fix |
| `namesInTheWords` and 7 tests | measured, closed-fact, read by `probe-path-key.mjs`; whatever replaces the arm needs it. NOT wired into `buildPathPrompt` or `readPath`. |
| `scripts/probe-path-key.mjs` | reproduces this measurement, both arms, against the key |
| reverted | the prompt's offered names and `readPath`'s verdict reading |

## Open, for the owner

1. **Withhold person-block names when a monster name is present** — the closed-fact fix for
   the `goblin assassin` regression. A proposal.
2. The call answering `not` or `resembles` on a creature that IS the creature (hag midwife,
   swamp witch, the wolf companion). Offering the name did not move it, so this is not recall.
3. The deferred smaller prompt, and the 2014 shelf; the kobold's label; the described person
   with no class word; whether every Fey block counts as a person.
