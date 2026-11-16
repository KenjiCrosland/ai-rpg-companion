# Probe B — does the seat write a good version of an injected hallmark?

For Fable 5.2 and the owner, 2026-11-14. Nothing shipped. All eight sheets in full, with their
seat and signature trace lines: `scripts/smoke-evidence/BLOCKS-probeB-2026-11-14.md`.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-probeb
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  220 suites, 5233 passed, 26 skipped   (flags off, suite unchanged)
```

## The bar: dead if three of four carry the element only as a name or as plain damage

**Three of four fail at the sheet, so the bar is met — but one failure is an eviction, not a
writing failure, and that distinction is the probe's real result.**

| # | element | on the finished sheet | why |
|---|---|---|---|
| 01 | a tar line that binds like a web | **absent entirely** | written correctly, then **evicted by the free-row budget** |
| 03 | a gaze that turns the living to stone | a gaze, but it **Frightens** | the mechanic landed; the condition is wrong |
| 05 | drinks blood and is mended by it | grapple + restrain + healing denial | no drain, no mending |
| 07 | a rotting touch that will not heal | plain Necrotic damage, plus a trait that heals **the creature** | the mechanic is inverted |

## 01 is the finding: the engine wrote the right row and threw it away

```
seats: package <- "fires a line of tar that binds prey like a web"
signature template: snare -> Actions/"Caught Line (Recharge 5-6)"
   ("fires a braided wire cable that snaps taut and spreads across the target's limbs")
value check: "Caught Line (Recharge 5-6)" EV 3.9 vs floor 3.6 — worth the trade
free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Mainspring Rewind" [no template]
```

`Caught Line` is exactly the good row the handoff describes: it restrains, it is named for this
creature, and the value check priced it inside the budget. The **free-row budget then kept the
other candidate** — an authored trait with no template — and dropped it.

The kept row is worse by the engine's own reading. The audit faults it twice:

```
audit: [Mainspring Rewind: The trait describes spending mo… ,
        Mainspring Rewind: The name promises an automatic …]
```

And the shipped sheet carries a dangling reference, because the trait says *"while it is not
grappling or restraining a creature"* on a sheet with nothing that grapples or restrains — the
row it was paired with having left.

**So for the clockwork spider the answer to Probe B's question is yes, the seat writes a good
version — and a later pass discards it.** That is a contained bug in the free-row budget's
choice of which candidate to keep, not a vocabulary limit.

## 03, 05 and 07 are genuine misses, and two are the predicted gaps

**03 medusa sculptor.** A gaze was written, twice — `Glare Stare` and `Dread Gaze`, both
near-duplicates — and both impose **Frightened**, not Petrified. The shape is right and the
condition is wrong, which reads worse than no gaze at all: the sheet promises a petrifying
sculptor and delivers a scare. Also a `signature miss` on its trait.

**05 vampire pirate** — the drain-that-heals gap, as predicted. The sheet got grapple, restrain
and a contagion that **prevents regaining Hit Points**. Note what that means: the healing-denial
mechanic **exists in the vocabulary** and landed on the wrong element, on the wrong sheet. Its
`[gap]` line is for a sense, not the drain:

```
[gap] senses the direction and distance to wounded or poisoned creatures through walls and fog
```

**07 mummy librarian** — the wound-that-will-not-heal gap, and the mechanic is **inverted**.
`Seeped Rot` makes the curator regain Hit Points near a Frightened, Poisoned or Prone creature.
The element asked for a wound on the target that will not close; the sheet healed the monster.

Taken together, 05 and 07 are the same finding from two directions: the engine can write
"cannot regain Hit Points" (it did, on 05) but cannot route it to the element that asked for
it, and will substitute self-healing when it cannot.

## The baselines, for comparison

The four uninjected sheets seated the creature's own words instead, and read coherently — the
watchmaker's hunter on "reeling snared prey off their feet", Vessaline on "pose-by-pose
petrification into a gallery". **Injecting an element displaces the GM's own seats**: every
injected sheet shows `seats: package <- "<the element>"` and no action/trait seat of its own,
where every baseline shows two seats drawn from the concept. Worth knowing before the design
treats the hallmark as additive — on this evidence it is substitutive.

## What I would take from Probe B

1. **The free-row budget's choice is wrong on 01** and is the cheapest thing in this probe to
   fix: it dropped a priced, templated row that answered the ask, kept an untemplated one the
   audit faults twice, and left a dangling reference behind. Worth a look independent of the
   layered design.
2. **A gaze that frightens where petrification was asked** is the same class as the medusa's
   `resembles` from the arm work: the engine reaches for the nearest condition it owns.
3. **Healing denial exists and does not route.** Item 5's vocabulary list should record that the
   effect is present but unreachable from an element that asks for it.
4. **An injected element replaces the concept's seats rather than joining them.** If the design
   means the hallmark to sit beside the GM's own asks, that is a change, not a given.

## Not started

**Probe C is not started.** This session has run roughly 2,100 live model calls across Probe A,
Probe B and the four earlier routing rounds, and the frame spike needs its scope read against
~15 gate sites plus 6 more sheets. It is the next thing, unblocked: a dead A or B does not
cancel it, and nothing in C depends on either.
