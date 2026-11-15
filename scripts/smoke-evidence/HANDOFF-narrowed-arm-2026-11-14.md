# The person rule landed; the narrowed arm missed its bar

For Fable 5.2 and the owner, 2026-11-14.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  220 suites, 5233 passed, 26 skipped
node --import ./scripts/alias-loader.mjs scripts/probe-path-key.mjs     (760 calls)
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-bothways
```

---

# Step 1 — who is a person

**Mechanism chosen: a declared list of the Fey blocks that are peoples.** The 2024 book files
the goblinoids and the hags under ONE type, `Fey`, so the type alone cannot carry the ruling —
reading `Fey` as a person is what ranked a hag below a class word.

The Fey type is exactly **15 blocks** and the ruling names 14 of them, so the list is
**complete rather than a sample**: 9 peoples (Goblin Warrior/Boss/Minion, Hobgoblin
Warrior/Captain, Bugbear Warrior/Stalker, Centaur Trooper, Satyr) against 6 monsters (both
hags, Dryad, Blink Dog, Worg, Sprite). A test asserts it **partitions** the type, so a Fey
block added to the corpus fails there instead of silently defaulting.

**Why not the 2014 type.** It gets the hags right and four other things wrong: it reads the
Satyr as a monster, the Kobold Warrior as a person, and the Werewolf, Gnoll Warrior and
Sahuagin Warrior as people — none of which the ruling wants.

**The Satyr and the Kobold Warrior:** both deliberately unchanged, and pinned by a test so a
later change to either is a decision rather than a side effect. Satyr stays a person (Fey, on
the list). Kobold Warrior stays a monster (print types it Dragon).

**Tests** — `the-person-rule.spec.js`, 9 tests. Categories proposed and written: a class word
with a hag gives a twist; a class word with a goblin is unchanged; every Humanoid block is
unchanged; the data test above; plus the block-by-block ruling and the two unruled pins.

---

# Step 2 — six sheets, the same prompt both ways

`scripts/smoke-evidence/BLOCKS-bothways-2026-11-14.md`, all six **PINNED** (not rolled), each
with its `[path]` line. The pin is a localStorage override read beside the edition and legacy
flags; nothing in the product sets it, and every pinned run prints a warning saying so.

Pinning beat rolling: the three paths nobody had seen would have needed luck in four rolls each.

---

# Step 3 — the narrowed arm. **Bar 1 fails; it does not ship.**

```
                      WITHOUT        WITH         bar
MONSTER   89/160  ->  118/160                >=144, none below 7/10   FAIL (worst 1/10)
CONTROL   0/80 wrong  1/80 wrong             <=2 of 80                PASS
OTHER     119/130 ->  116/130                >= 113                   PASS
empty relation  3 of 380 -> 0 of 380
more than one path  14 -> 18
```

The finder offers a right body on **16 of 16** monster prompts, so the offer is not the limit.

## It fixed recall and failed on judgement

Where the problem was recognition, the arm is dramatic:

| prompt | without | with |
|---|---|---|
| ogre blacksmith | 2/10 | **9/10** |
| ghoul gravedigger | 1/10 | **9/10** |
| owlbear but CR 8 | 7/10 | 9/10 |
| ankheg but legendary | 9/10 | 9/10 |
| kobold raised by a dragon | 7/10 | 9/10 |
| hag midwife | 0/10 | 1/10 |
| medusa sculptor | 0/10 | 1/10 |
| mummy librarian | 3/10 | 5/10 |
| the druid's wolf companion | 2/10 | 2/10 |

The four that stay broken are all the same answer. **Asked outright whether the creature IS a
medusa, a mummy, a hag or a wolf, the call says `resembles`:**

```
monster-medusa-sculptor  got homebrew | body=null verdicts=[medusa=resembles]   x9
typed40-8  hag midwife   got class_npc | class=cleric verdicts=[hag=resembles / hag=not]  x9
typed40-28 wolf companion got homebrew | verdicts=[wolf=resembles, dire wolf=resembles]  x8
monster-mummy-librarian  got homebrew | verdicts=[mummy=resembles]  x5
```

**This is not recall, and no offer fixes it.** The first arm's report flagged the same pattern;
the narrowed arm asked the question directly and got the same answer. A "medusa sculptor" is a
medusa who sculpts, and the call reads the job word as making her something medusa-like.

One display bug in this run, worth knowing when reading the raw lines above: the probe printed
`v.name` where the call answers `word`, so every verdict label printed as `undefined`. The
VALUES are correct and `readPath` reads `word ?? name`; the probe is fixed.

## The one control loss

```
control-wolf-pelt  lost 1/10  "a hunter in a wolf pelt"  got twist:Wolf | verdicts=[wolf=is]
```

One roll in ten welded the Wolf onto the hunter. Inside bar 2, and the honest version of the
risk the controls exist to catch.

## What I'd put to you

The arm does not ship by the bar, and it is reverted. But the monster group is the one that
produces sheets a GM rejects, and it went **89 → 118 of 160** with controls intact and others
within noise. Three options:

1. **Ship it anyway** at a relaxed bar. 118/160 is 74% against today's 56%, and every
   remaining loss is the `resembles` answer rather than a new defect.
2. **Keep it out and attack the judgement.** The four stuck prompts share a shape — a monster
   noun plus a trade. Nothing about offering names touches it; it would be the prompt's
   definition of "is" versus "resembles", which is the deferred smaller-prompt work.
3. **Both, in order:** land the arm, then measure a judgement change on top of it, since the
   arm removes recall as a confound.

My own read is (3), because the arm is the half that is already measured and the stuck cases
are now isolated and nameable. But the bar is yours and it says no.

## What is in the tree

| kept | |
|---|---|
| the person rule and its 9 tests | step 1, a ruling |
| `statblock-pin-path` and `v-bothways.json` | step 2's evidence runs |
| `namesInTheWords` (narrowed: monsters only, the GM's word, one mention) and 9 tests | read by `probe-path-key.mjs`; NOT wired into `buildPathPrompt` or `readPath` |
| `scripts/probe-path-key.mjs` | reproduces both arms against the key, by group |
| reverted | the prompt's offer and `readPath`'s verdict reading |

A finder bug worth recording: on a 2014 sheet both corpora are searched, so a name both books
carry hit twice on one span and the two hits each "covered" the other — **every 2014 monster
prompt silently offered nothing** until the dedupe landed. Caught by the pre-run table, not by
the run.

## Open

- The `resembles` judgement on a monster noun plus a trade. The blocker now.
- A class on top of a monster (the "imp rogue" proposal) — not started.
- The Satyr and the Kobold Warrior; "Mother" read as a cleric; a described person with no class
  word; the 2014 shelf; the smaller prompt.
