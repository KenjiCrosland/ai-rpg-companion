# Step 2 — code keeps the people's body. Correct, tested, and nearly inert

For Fable 5.2 and the owner, 2026-11-14. Step 2 of the names-arm handoff, pushed on its own so
the names arm is measured on this code.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  218 suites, 5214 passed, 26 skipped
```

## What landed

In `readPath`: when the call answers a class, names no body, and its species was refused for
having no kit, the species word is looked up through the corpus and the alias table this file
already owns. If print carries that people as a block, it becomes the body with relation "is".

Closed-fact lookup, no new word list, no new matching rule. It fills a field for `dispatch` to
judge and decides no path itself. The species receipt rule is unchanged — a claim about the
GM's words still carries a quote found in them.

Replayed through `readPath` into `dispatch`:

| answer | result |
|---|---|
| `goblin assassin` — class rogue, species goblin, no body | **class_npc on the Goblin Warrior** — the ruled answer |
| `goblin wizard` — class mage, species goblin, no body | class_npc on the Goblin Warrior |
| `kobold priest` — class cleric, species kobold, no body | **twist on the Kobold Warrior** — recorded, not settled |
| `lizardfolk monk` — a kit and no print block | unchanged: species kept, no body |
| `orc blacksmith` — neither kit nor print block | unchanged |
| species with no receipt | no body |
| species with no class answered | unchanged |
| a body-only answer | still twists |

The kobold lands a twist because the Kobold Warrior is type Dragon and `isPersonBody` is
false. `isPersonBody` is untouched, as instructed.

## Tests

`a-people-with-a-print-block.spec.js`, 9 tests. Categories proposed and written:

| category | written |
|---|---|
| a people with a print block and no kit keeps its body, for each answer shape naming a class | yes (3) |
| a people with a kit and no print block is unchanged | yes (1) |
| a body-only answer still twists | yes (1) |
| *(added)* the receipt rule holds — no quote, no body | yes (1) |
| *(added)* a people with neither kit nor print block adds nothing | yes (1) |
| *(added)* the edition rule — the body comes from the book the sheet is on | yes (1) |
| the kobold, recorded not settled | yes (1) |

**Every test starts from a raw answer and goes through `readPath` into `dispatch`.** The older
people-plus-role test in `a-compound-with-a-print-head.spec.js` is removed: it handed
`dispatch` an answer carrying `species: 'goblin'`, which `readPath` never produces, so it
pinned a state production cannot reach. A pointer replaces it.

## The call-level counts, and the honest headline

10 rolls each, production's request shape.

| prompt | carries the printed body | step 2 supplied it |
|---|---|---|
| goblin assassin | **10/10** ✓ | **0** |
| goblin wizard | 5/10 ✗ | **0** |
| kobold priest | 1/10 ✗ | **1** |

**Step 2 is correct and nearly inert: it fired on 1 roll in 20.** This is the "correct and
inert" pattern that has caught this sprint twice (F17, E15), and it is the headline rather
than the green on `goblin assassin` — which the call reaches on its own, naming the body
itself all ten times.

## Why it does not fire: the call omits `relation`, not the body

The raw answers say it plainly.

```
goblin wizard   x6   body=Goblin   species=null    class=mage    <- body named, relation MISSING
                x3   body=null     species=null    class=mage
                x1   body=Goblin   species=goblin  receipt="goblin"  class=mage
   readPath refused: relation "null" is neither is nor resembles — read as resembles

kobold priest   x5   body=null     species=null    class=cleric
                x3   body=null     species=kobold  receipt="kobold"  class=cleric   <- step 2's shape
                x1   body=Kobold   species=null    class=cleric
```

Step 2 was built for "species answered, no body". The common shape is **"body answered, no
relation"**. `readPath` reads a missing relation as `resembles` — the conservative default —
and a `resembles` body never welds on, so the people is erased just the same.

This is the third reading from the swap test ("the body IS named but relation is not is"),
which was a minority on the ogre and is the **majority** here.

## What I did not do, and the proposal

I did not change the `relation` default. Today a named body with a null relation reads as
`resembles`, which is deliberately conservative — flipping it to `is` would weld bodies on
from silence, and that is a routing change needing its own measurement against
`path-key.json`, not a quiet edit inside step 2.

**Two closed-fact options, both proposals:**

1. **A missing relation is a rejection, not a default.** The brief's own rule for every call is
   "a missing field is a rejection and a retry, never a default". `generateGptResponse` already
   retries twice. Today `relation: null` silently becomes `resembles`; making it a refusal
   would retry the call rather than quietly downgrade the body.
2. **Leave it, and let the names arm carry it.** If code hands the call the printed names it
   found, the call is choosing among candidates rather than recalling one, and may fill
   `relation` more reliably. Worth measuring before changing the default.

My recommendation is (1), because it is the brief's own stated rule and it costs one retry;
but it changes routing, so it is the owner's to rule and it is not in this push.

## Still open

The relation default above; the 2014 shelf routing worse than 2024; the kobold's label; the
described person with no class word; whether every Fey block counts as a person; the smaller
prompt (deferred).
