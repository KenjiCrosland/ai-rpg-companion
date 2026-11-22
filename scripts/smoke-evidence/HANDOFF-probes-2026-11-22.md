# HANDOFF — the probes round: a ribbon validator, eighty ribbons, and what the zone ideas asked for

2026-11-22 · branch `statblock-enhancments-part-2` · for the owner and for Fable

Ten commits, ready to push. Nothing is pushed.

| # | Commit | What |
|---|---|---|
| 1 | `fdb04f9` | `scythe: 'Slashing'` in PART_TYPE, with its test |
| 2 | `9f35b32` | `--live-from miss` — live at the call that missed, not its family |
| 3 | `3ae2804` | s24 re-recorded (first pass) |
| 4 | — | the pull-through gate at the action landing |
| 5 | — | the replay skip read from the input |
| 6 | — | s24 re-recorded (second pass, after the gate) |
| 7 | `2a7aa47` | the ribbon validator, with 43 tests |
| 8 | `a331b26` | a condition is the rules term, not the adjective |
| 9 | `5adb153` | Probe A — the script and the blocks file |
| 10 | `96fabcc` | the forty after the probes round |

**Suite:** 273 suites, 5,873 passed, 26 skipped, **exit 0**, read from its own exit code on a single worker.
**Replay:** strict replay of `baseline-2026-11-20` — **38 of 38 reproduced EXACTLY, 2 skipped (not replayable).**

---

## 1. s24 in full, before and after

The GM typed: *"A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others."*

**Before** (`BLOCKS-the-forty-after-soundness-2026-11-21.md`) the scythe-arms were a noun the parts reader recognised and then discarded for want of a damage type, and the action seat landed `pull-through` on a shape fit with no verb behind it.

**After:**

> **Multiattack.** The scythe makes two attacks, using Scythe or Spitting Maw in any combination.
> **Scythe.** *Melee Attack Roll:* +8, reach 10 ft. 17 (3d8 + 4) Slashing damage plus 13 (3d8) Acid damage.
> **Spitting Maw.** *Melee Attack Roll:* +8, reach 5 ft. 17 (3d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
> **Thrashing Prey** *(Reaction).* *Trigger:* A creature the scythe is grappling attacks it. *Response:* The scythe makes a Scythe attack against that creature.

- **The part's name as the sheet prints it:** `Scythe`.
- **The slot it took:** the one melee attack slot — the trace reads `named parts: Scythe (slot), Spitting Maw (clone, Grappled)`, and `named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced`.
- **What became of the maw:** it did **not** lose its place. It took a clone of the slot and kept the Grappled rider, so both of the things the GM typed are on the sheet and the Multiattack offers either.
- The acid shell is on the Scythe as `plus 13 (3d8) Acid damage`, so the third thing the GM typed is there too.
- `pull-through` is gone: `pull-through declined — no verb matched: "Hooked Reel" fitted by shape alone, and this template is reached by a verb — through walls, drown, phase`.

**The count you asked for: 11 rows across the forty were fitted by shape alone.** The audit condemned **3** of the 11. (My first matcher missed Forge-Bell Decree and would have reported 2.)

## 2. `--live-from`: built

`decide` now takes `--live-from miss`: it serves a recorded answer for as long as the prompt matches and goes live at the first prompt that does not, whatever family that call belongs to. It was small — one branch in `decide`, which already had the tape and the prompt in hand:

```js
if (liveFrom === 'miss') return hasAnswer(tape, prompt) ? { use: 'tape', family } : { use: 'live', family, flips: true };
```

The test is the one you specified: three calls of one family, the first two matching and the third not; the first two are served from the tape and the third goes live. s06 was not re-recorded for it.

## 3. s22: what is on line 4

**Line 4 is `Challenge Rating: N`, and N is the rolled CR.** Not a date, not a counter, not an ordering.

The two committed recordings differ on exactly one line of the 84:

| | line 4 |
|---|---|
| `baseline-2026-11-18` | `Challenge Rating: 3` |
| `baseline-2026-11-20` | `Challenge Rating: 1` |

Nothing else in either prompt differs. `cr: "auto"` is rolled by `rollRandomCR()` before any call is built, and the roll lands in the route prompt.

**And the answer to the amendment's third question, which this is the same fault as.** A GM who types a printed creature's name and leaves the CR on auto gets print's own CR every time. The roll shows *only* in the route prompt; the printed body's CR takes over immediately after that call, before anything is authored — [StatblockGenerator.vue:1510-1516](src/tools/statblock-generator/StatblockGenerator.vue#L1510-L1516).

| run | rolled CR in the route prompt | sheet CR | sheet HP | AC |
|---|---|---|---|---|
| live, 22 Nov #1 | not captured | 1 (200 XP) | 21 (6d6) | 17 |
| live, 22 Nov #2 | not captured | 1 (200 XP) | 21 (6d6) | 17 |
| live, 22 Nov #3 | not captured | 1 (200 XP) | 21 (6d6) | 17 |
| recorded 18 Nov | **3** | 1 (200 XP) | 21 (6d6) | 17 |
| recorded 20 Nov | **1** | 1 (200 XP) | 21 (6d6) | 17 |

Print's Goblin Boss: AC 17, HP 21 (6d6), CR 1. All five sheets are print exactly. The 18 November recording is the proof on its own — the route prompt said CR 3 and the sheet still came out CR 1 with 21 hit points. Those two words never give a CR 6 Goblin Boss. **Nothing fixed**, as you asked.

Two things I could not get: the rolled CR for the three live runs (the smoke log does not carry browser console, and a recording made for an experiment stays out of the repo), and three runs from one command — `--rolls N` only multiplies in replay mode, so I ran the command three times. My own skip fix cost the first attempt: `--pass-through` skips s22 as well, by design, so the first three rolls produced nothing.

## 4. Probe A — eighty ribbons

`scripts/smoke-evidence/BLOCKS-ribbon-probe-2026-11-22.md` holds all eighty lines. Not ranked.

| Family | Written | Declined | Refused | Asked |
|---|---|---|---|---|
| Senses a thing | 10 | 0 | 0 | 10 |
| Sheds or leaves something | 10 | 0 | 0 | 10 |
| Moves strangely | 10 | 0 | 0 | 10 |
| Speaks strangely | 10 | 0 | 0 | 10 |
| Hides, or cannot be read | 10 | 0 | 0 | 10 |
| Has a taboo or a need | 10 | 0 | 0 | 10 |
| Is bound to something | 10 | 0 | 0 | 10 |
| Leaves something when it dies | 10 | 0 | 0 | 10 |
| **Total** | **80** | **0** | **0** | **80** |

**What the validator refused, and the refusal I think was wrong.** The first pass refused exactly one answer of eighty, and it was wrong. Line 29, the Adult Red Dragon, where the GM had typed *"blind in one eye from an old lance"*:

> When the dragon dies, its blinded eye collapses into a fist-sized red crystal around the ancient lance tip; for a day afterward, the crystal stays warm and shows a faint flicker of the dragon's last view.

Refused for *"it imposes the Blinded condition"*. Nothing gains a condition in that sentence — "blinded" is an adjective describing an eye the GM already gave it. My condition match was case-insensitive. It is now case-sensitive, because **print's convention is the signal**: the rules term is capitalized ("has the Frightened condition") and the lowercase word is flavour. Both sentences are tests (`a331b26`). All eighty were re-validated against the corrected rule — 80 written, 0 refused. No answer was re-asked and no text in the blocks file was edited.

That is the whole of what eighty live calls found wrong with the validator, and it found a real fault in it. It is also the one thing in this round I would call a fix made worse before it was made better: the validator I committed in `2a7aa47` would have refused a good ribbon in the family you most want to see working.

**The model obeyed the rules.** 79 of 80 passed on the first pass and 80 on the second, 0 declined. That is not the validator being lax — I read a ninth of them by hand and every one is a ribbon that uses the GM's own words. A sample:

> **Dire Wolf** — *with a frost-rimed hide* · Hides, or cannot be read
> Frost-Rimed Hide: While the dire wolf stands motionless against snow or ice, a creature must succeed on a DC 13 Wisdom (Perception) check to notice it if the creature hasn't witnessed the wolf move or otherwise act.

> **Spoilheap Lurker** — *a quarry-pit thing of living scree that buries what it catches* · Is bound to something
> Bound to the Pit: the lurker cannot willingly travel more than 100 feet from the quarry floor where it first gathered, and it always knows the direction and distance to anything it has buried there, as though the rubble were whispering to it.

> **Drowned Antiphon** — *a drowned cathedral choir that sings in one voice* · Has a taboo or a need
> The Drowned Antiphon cannot sing alone; it must join a chorus or echo another voice at least once every hour. If it fails, it can only repeat the last hymn it heard until a new voice answers it.

> **Titan-Hollow Scythe** — *four scythe-arms, a spitting maw, a shell that sheds acid* · Senses a thing
> Acid-Marked Prey. The Titan-Hollow Scythe can pinpoint the location of any creature or object still bearing its acid within 1 mile, as though following a scent.

**One thing the probe did not test, and should.** The ask states the rules, so a 100% pass rate measures the model reading an instruction, not the validator holding a line. The validator's teeth were proven against print instead — Pack Tactics, the Azer's Fire Aura and the Ghoul's Claw are refused, and all thirteen printed traits in the eight families are accepted, read from `srd52-monsters.json` at test time.

**Two rules print forced on the validator.** Both are in the commit, and both would have been wrong if I had written the rules from the handoff alone:

- **Advantage is read per sentence, and allowed on an ability check.** The Sphinx's Inscrutable gives Disadvantage on Insight checks. A flat ban on the word refuses print.
- **Length is not checked at all.** The ask says one or two sentences; print's own row for *leaves something when it dies* — Troll Spawn — is four. A validator that enforced the ask would refuse the example it ships.

## 5. Probe B — what the zone ideas asked for

No call was made. This is read from three recordings: `baseline-2026-11-18`, `baseline-2026-11-20` as it stood at `18bb4d19` (recovered from git), and as it stands now.

**My reader reproduces your number exactly: 97 distinct trait ideas, 27 of them tagged `zone`.** Taking both slots the idea call fills, there are **43 distinct zone ideas** (27 trait, 16 action) in 46 occurrences — 3 ideas appear in two tapes, and none of the 3 fits differently.

"What the area does" is **my hand reading of all 43**, not a script's. I wrote a classifier first and it was wrong on 6 of the first 22: it counted *preconditions* as effects (the vault ooze's "begins its turn Grappled by the ooze", the dire wolf's "that has taken Cold damage since its last turn") and read the Spoilheap Lurker *ignoring* difficult terrain as creating it. Every line below is read off the idea's own words.

### Count 1 — what they asked the area to do

43 ideas; most ask for more than one thing.

| What the area does | Ideas that asked |
|---|---|
| a condition | 20 |
| damage, of a named type | 13 |
| bad ground (difficult terrain, obscured, slick) | 13 |
| halved Speed, or Speed reduced to 0 | 5 |
| a push | 2 |
| no Reactions | 2 |
| a pull | 1 |
| something else | 7 |

The seven "something else": senses creatures through cover; Disadvantage on attack rolls made in it; Disadvantage on ranged attacks against the creature; a mark that forbids moving away and the Help action; a spell that also hits creatures near its target; and **two that never say what the area does at all** — the hydra's hex-smoke and its choking haze.

The aura form takes four conditions. **Of the 43, only 20 asked for a condition, and 23 asked for something the form cannot write.** The two biggest asks after a condition — damage of a named type (13) and bad ground (13) — are tied, and bad ground is the one ask that reliably survives, because `aberrant-ground` and `composed:zone:terrain` exist for it.

### Counts 2 and 3 — what reached the sheet

Of the 43: **13 shipped a row, 3 landed a template and were dropped before ship, 25 were refused at the fit, 2 never reached a fit call.** So 30 of 43 produced nothing.

Of the 13 that shipped:

| | Count | Which |
|---|---|---|
| **did what they asked, nothing lost** | **4** | Umbral Bloom, Reeking Contagion, Aberrant Ground, Sodden Mire |
| **did part of what they asked** | **5** | Ash Choke, Keening Glare, Plague-Fly Cloud, Killing Cold Wake, Cursed Wake |
| **did something else** | **4** | Rime-Stiffened Aura, Rime Lattice, Fear Aura, Stump Vapor |

**All four that shipped intact asked for exactly one thing, and that thing was difficult terrain or a single condition the form already has.** Nothing that asked for two things kept both.

**The four that did something else are the misfits you named, and the mechanism is visible.** The dire wolf asked for *no Reactions* and shipped `composed:zone:condition:deafened` — **Deafened**. The glacier heart asked for *bad ground and halved Speed* and shipped `composed:zone:condition:poisoned` — **Poisoned on a glacier**. Krennik asked for *no Reactions* and shipped Frightened. The hydra's haze asked for nothing stated and shipped Poisoned. In each case the ask had no form, and the composed-zone menu offered a condition instead of nothing — so the engine wrote the nearest condition it had rather than declining.

### Count 4, which you did not ask for but which I think is the finding

**Not one of the 43 asked for a condition the composed-zone menu does not carry.** The misfits are not the model asking for something exotic; they are the model asking for *damage*, *bad ground*, *halved Speed* or *no Reactions* and being handed a condition. A wider form that could write damage-per-round, halved Speed and no-Reactions would cover 20 of the 23 asks the form cannot write today.

### The six families with no form

| Family | Ideas | Shipped | Dropped before ship | Refused at the fit | Never reached a fit | Lost |
|---|---|---|---|---|---|---|
| mark | 47 | 12 | 3 | 28 | 4 | 35 (74%) |
| breach | 25 | 7 | 3 | 13 | 2 | 18 (72%) |
| sentinel | 25 | 3 | 3 | 17 | 2 | 22 (**88%**) |
| drag | 24 | 3 | 3 | 16 | 2 | 21 (**88%**) |
| heal | 5 | 0 | 2 | 3 | 0 | 5 (100%) |
| kill-growth | 3 | 0 | 0 | 3 | 0 | 3 (100%) |
| *zone, for comparison* | 46 | 13 | 4 | 27 | 2 | 33 (72%) |

Occurrences across the three tapes, not distinct ideas. **`heal` and `kill-growth` lose everything, but their denominators are 5 and 3 — too small to act on.** With a real denominator the answer is **`sentinel` and `drag`, both losing 88%** against `zone`'s 72%. `mark` loses the most ideas in absolute terms (35) but at the ordinary rate; it is simply the family the idea call picks most often.

### The 43 zone ideas

| # | Sheet | The idea, its first sentence | What the area does | Size and shape | When it bites | What became of it | On the sheet |
|---|---|---|---|---|---|---|---|
| 1 | 01-dire-wolf (trait) | A creature that starts its turn within the dire wolf's reach takes Cold damage as the rime on its hide stings through cloth and fur, and a creature taking that damage leaves no trail of its own warmth — | damage (Cold) | not said | start of a creature's turn | refused at the fit (no_fit) | *nothing* |
| 2 | 07-hydra (action) | The hydra rears and slams its cauterized stumps and trampling forelimbs down in a stinking wall of its own smoke — | damage (Bludgeoning), condition (Prone), bad ground | a line, size not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
| 3 | 07-hydra (trait) | Wherever the hydra moves, its smoldering stumps trail a smoking haze — | condition (Poisoned), bad ground | not said | always | composed:zone:condition:poisoned -> shipped as **Ash Choke** | *Constitution Saving Throw*: DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hydra. *Failure:* The target has the |
| 4 | 09-stone-golem (action) | The golem raises its hollow face and looses a resonant keen aimed at every hostile creature within a short range that can hear it. | condition (Frightened), condition (Stunned) | not said | when used (an action) | terror-pulse -> shipped as **Keening Glare** | *Wisdom Saving Throw:* DC 17, each creature of the golem's choice in a 30-foot Emanation originating from the golem that can see or hear it. *Failure: |
| 5 | 11-vampire (trait) | The vampire's grave-flesh is grown through with living briars. | bad ground | 10-foot Emanation (as shipped) | always | aberrant-ground -> shipped as **Umbral Bloom** (renamed) | The ground in a 10-foot Emanation originating from the vampire is Difficult Terrain. |
| 6 | 12-vesphidion (trait) | Vesphidion's body seethes with the same plague it preaches; | condition (Poisoned) | 20-foot Emanation (as shipped) | start of a creature's turn | noxious-aura -> shipped as **Reeking Contagion** | *Constitution Saving Throw*: DC 17, any creature that starts its turn in a 20-foot Emanation originating from Vesphidion. *Failure:* The target has th |
| 7 | 13-purple-worm (trait) | The blades packed in its gut grind and shift with every motion, and the noise carries up through loose earth — | something else — senses creatures through cover (not an area effect at all) | around it, size not said | always | refused at the fit (no_fit) | *nothing* |
| 8 | 14-glacierheart (trait) | The glacierheart trails its wake of killing cold. | damage (Cold), bad ground, halved Speed | not said | start of a creature's turn | refused at the fit (no_fit) | *nothing* |
| 9 | 16-brass-tyrant (action) | The tyrant slams its molten fist into the ground, and a wall of forge-heat rolls outward in a line in front of it. | damage (Fire), condition (Prone) | a line, size not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
| 10 | 18-archlich-of-the-bone-sun (action) | The archlich hurls a marrowfire bolt that bursts at the target's feet, and the scorched ground remains branded with crawling bone-script; | damage (Necrotic), a pull | not said | start of a creature's turn | refused at the fit (collision) | *nothing* |
| 11 | 18-archlich-of-the-bone-sun (trait) | Bone gravel and marrow dust whirl in a slow orbit around the throne, so the ground within the archlich's emanation is laced with splintered ossuary shards: the area counts as difficult terrain for other creatures, and the archlich's own marrowfire bolts trace their path through the whirling shards w | bad ground | 10-foot Emanation (as shipped) | always | aberrant-ground -> shipped as **Aberrant Ground** (renamed) | The ground in a 10-foot Emanation originating from the archlich is Difficult Terrain. |
| 12 | 25-blackiron-sentinel (action) | The sentinel sets its iron bulk and grinds forward in a straight line, driving through the space of any creature in its path. | condition (Prone), a push | not said | on entering | refused at the fit (no_fit) | *nothing* |
| 13 | 26-mirewitch-sable (trait) | Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — | bad ground | not said | start of a creature's turn | composed:zone:terrain -> shipped as **Sodden Mire** | The ground in a 10-foot Emanation originating from Sable is Difficult Terrain. |
| 14 | 28-ilvareth-dusksong (action) | Ilvareth hurls a blot of living shadow at a point he can see, and it spreads into a clinging pool of darkness. | condition (Restrained) | not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
| 15 | 30-reliquary-vault-ooze (trait) | Consecrated rot. | damage (Necrotic) | not said | start of a creature's turn | refused at the fit (no_fit) | When a creature begins its turn Grappled by the vault ooze or standing within the vault ooze's space, the rot eats at the creature's consecrated flesh |
| 16 | 31-thunderwall-drake (trait) | The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing. | condition (Prone) | not said | always | refused at the fit (no_fit) | *nothing* |
| 17 | 01-dire-wolf (trait) | The frost-rimed hide sheds a creeping rime: at the start of the dire wolf's turn, each creature within 5 feet of it that has taken Cold damage since its last turn must succeed on a Constitution saving throw or be unable to take Reactions until the start of its next turn as the cold stiffens its join | no Reactions | not said | start_of_turn | composed:zone:condition:deafened -> shipped as **Rime-Stiffened Aura** | *Constitution Saving Throw*: DC 13, any creature that starts its turn in a 5-foot Emanation originating from the dire wolf. *Failure:* The target has  |
| 18 | 05-air-elemental (trait) | The elemental's stolen voices cry out from its winds, layering screams over the battlefield. | something else — Disadvantage on attack rolls | around it, size not said | always | refused at the fit (no_fit) | *nothing* |
| 19 | 06-spoilheap-lurker (trait) | Loose Scree: the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures, and it ignores Difficult Terrain made of rubble, gravel, or broken quarry ground. | halved Speed | not said | start of a creature's turn | refused at the fit (no_fit) | The lurker squeezes through any gap wider than a paving stone, moves through spaces occupied by other creatures, and ignores Difficult Terrain made of |
| 20 | 07-hydra (action) | As a bonus action, the hydra wrenches a neck it has bitten clean away, loosing a billowing cloud of stinging hex-smoke that fills the air around it. | something else — a cloud, effect never stated | around it, size not said | when used (a bonus action) | refused at the fit (no_fit) | *nothing* |
| 21 | 07-hydra (trait) | Each neck it loses does not regrow; | something else — a choking haze, effect never stated | not said | always | composed:zone:condition:poisoned -> shipped as **Stump Vapor** | *Constitution Saving Throw*: DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hydra. *Failure:* The target has the |
| 22 | 09-stone-golem (trait) | The golem's carved grief is a weight that follows it: while the golem is conscious, the ground in a small radius around it is slick with the frozen tears that streak its face, turning the area into difficult terrain for any creature other than the golem. | bad ground | around it, size not said | always | composed:zone:terrain landed, then dropped before ship | *nothing* |
| 23 | 12-plague-archon (action) | The plague-archon looses a droning command that rolls out from its chitinous ribs in all directions; | condition (Blinded) | not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
| 24 | 12-plague-archon (trait) | A buzzing cloud of plague-flies orbits the archon and follows it into battle, filling a 5-foot Emanation. | condition (Poisoned) | 5-foot emanation | start of the archon's own turn | composed:zone:condition:poisoned -> shipped as **Plague-Fly Cloud** | *Constitution Saving Throw*: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the plague-archon. *Failure:* The target |
| 25 | 14-glacier-heart (action) | The glacier heart does not stride so much as the winter arrives with it: at the start of its turn, the ground within a short radius of it freezes into a lattice of crevasse-crack, becoming difficult terrain, and each creature standing there must succeed on a Constitution saving throw or have its Spe | bad ground, halved Speed | not said | start of the monster's own turn | composed:zone:condition:poisoned -> shipped as **Rime Lattice** | *Constitution Saving Throw*: DC 18, any creature that starts its turn in a 20-foot Emanation originating from the glacier heart. *Failure:* The target |
| 26 | 16-brass-tyrant (action) | The tyrant plants its fists and lets the fire in its seams boil over, searing an emanation of molten brass around itself that clings to anything that stays near — | damage (Fire) | an emanation, size not said | end of a creature's turn | never reached the fit call | *nothing* |
| 27 | 16-brass-tyrant (trait) | The tyrant is a body of burning brass first and a machine second: its seams and joints glow white-hot, so its space is difficult terrain for creatures that can't shrug off fire, and any creature that starts its turn in contact with the tyrant's heated frame takes Fire damage as the furnace inside br | damage (Fire), bad ground | not said | start of a creature's turn | energy-aura landed, then dropped before ship | *nothing* |
| 28 | 17-pit-fiend (trait) | Oaths sworn in the pit fiend's presence bend toward it. | something else — cannot move away, no Help action | not said | always | refused at the fit (no_fit) | *nothing* |
| 29 | 18-archliche-of-the-bone-sun (trait) | The bone-sun's slow orbit keeps the archliche a step out of reach: ranged attacks against the archliche are made with disadvantage while any of its bone splinters remain embedded in a living creature within 120 feet, as the orbiting shell interposes itself between the archliche and the threat. | something else — Disadvantage on ranged attacks against it | not said | always | refused at the fit (no_fit) | *nothing* |
| 30 | 20-trench-hymn-leviathan (trait) | The leviathan's hide is soaked in trench brine that deadens sound. | damage (Thunder) | not said | start of a creature's turn | refused at the fit (no_fit) | *nothing* |
| 31 | 23-vashka-the-red (trait) | Vashka fights shoulder-to-shoulder and behind his shield: any creature that enters the space of Vashka or an ally within his reach, or tries to move through him, must succeed on a Strength saving throw or be stopped and immediately driven back, and Vashka's own space counts as difficult terrain whil | bad ground, a push | not said | on entering | refused at the fit (no_fit) | *nothing* |
| 32 | 31-thundercloud-drake (action) | The drake beats its wings in a thunderclap that lands as a shockwave — | condition (Deafened), condition (Prone) | not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
| 33 | 34-krennik-skullstandard (trait) | The standard is planted in Krennik's stirrup-iron and never leaves his grip; | condition (Frightened) | around it, size not said | start of a creature's turn | fear-aura landed, then dropped before ship | *nothing* |
| 34 | 05-air-elemental (action) | The air elemental's Storm of Voices is a gale of screaming wind that engulfs one creature within 10 feet, forcing a Charisma saving throw. | condition (Deafened), condition (Frightened) | not said | when used (an action) | refused at the fit (no_fit) | *Charisma Saving Throw*: DC 13, one creature within 10 feet. *Failure:* The target has the Frightened condition until the end of its next turn. |
| 35 | 14-heart-of-the-glacier (action) | The heart never turns. | damage (Cold), condition (Prone), bad ground | not said | on entering | never reached the fit call | *nothing* |
| 36 | 14-heart-of-the-glacier (trait) | The heart's core is blue glacier ice, and the cold bleeds out of it: at the start of each of the heart's turns, every creature within its reach that is touching the ground must succeed on a Constitution saving throw or take Cold damage and have its Speed reduced until the end of its next turn, as th | damage (Cold), halved Speed | 5-foot Emanation (as shipped) | start of the monster's own turn | energy-aura -> shipped as **Killing Cold Wake** | At the end of each of the heart's turns, each creature in a 5-foot Emanation originating from the heart takes 13 (3d8) Cold damage. |
| 37 | 18-bone-sun-archlich (action) | When the archlich casts a spell that targets one creature, the bone-sun tilts and its corona flares through the spell, and the spell also lashes every creature of the archlich's choosing within a short emanation of the target, so that no one can stand beside the caster's mark and weather it for free | something else — the spell also hits creatures near the target | not said | always | refused at the fit (no_fit) | *nothing* |
| 38 | 26-mire-huldra (trait) | The huldra's brine-soaked body leaves a slick, cursed wake: ground she moves through becomes difficult terrain for other creatures until the end of her next turn, and a creature that starts its turn in that slick must succeed on a Constitution saving throw or be Poisoned until the start of its next  | condition (Poisoned), bad ground | not said | start of a creature's turn | composed:zone:condition:poisoned -> shipped as **Cursed Wake** | *Constitution Saving Throw*: DC 14, any creature that starts its turn in a 10-foot Emanation originating from the huldra. *Failure:* The target has th |
| 39 | 32-grumalk-the-exile (action) | Grumalk slams his club into the ground, sending a thunderous shockwave through the earth. | damage (Thunder), condition (Prone) | a radius, size not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
| 40 | 32-grumalk-the-exile (trait) | Grumalk is a creature of living stone, and when he plants his feet, the earth answers. | Speed reduced to 0 | a radius, size not said | start of his own turn | refused at the fit (no_fit) | *nothing* |
| 41 | 34-krennik-skullstandard (trait) | Krennik's standard is tall and skull-crowned, catching the eye; | no Reactions | 20-foot Emanation (as shipped) | start of a creature's turn | fear-aura -> shipped as **Fear Aura** (renamed) | Krennik emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. *Wisdom Saving Throw*: DC 13, any enemy that starts |
| 42 | 35-well-drowned (trait) | A body of living brine and silt, the drowned can flow through any gap or crack without squeezing, and it leaves a slick, salty trail of brine in its wake that makes the ground difficult terrain for other creatures until the end of its next turn. | bad ground | not said | always | refused at the fit (no_fit) | *nothing* |
| 43 | 38-oathsworn-gravebound (action) | The gravebound plants its blade point-first and hurls itself forward along the sword's line — | damage (type not said), condition (Prone) | a line, size not said | when used (an action) | refused at the fit (no_fit) | *nothing* |
---

## 6. Every sheet that differs from the last forty

**One, as you expected: s24.** Checked Block by Block, slug by slug, against `BLOCKS-the-forty-after-soundness-2026-11-21.md`. The other 37 replayed sheets are character-identical in their Block; s22 and s36 are carried forward unchanged and marked as carried in the file.

A raw whole-file diff reports 1,040 changed lines and is useless for this: the `**elapsed** Ns` on every sheet's header differs run to run. That is worth knowing before anyone else tries the diff you asked for.

## 7. Anything a fix made worse

**One, and it is mine, inside this round.** The ribbon validator as committed in `2a7aa47` refused the Adult Red Dragon's death-ribbon for the word "blinded". Read off a real answer from a live call, not off a replay that missed. Fixed in `a331b26` with both sentences as tests.

**Nothing else.** The lint is unchanged, the forty is unchanged but for s24, and s24 is better: the GM typed three things and all three are now on the sheet.

On `stock-template-name`, which I misreported last round: it is **1** on this round's forty and **1** on last round's, counted the same way from both files' traces. The 6 I reported was the cost of a replay that had no answer, as you said at the time.

## 8. The lint's columns, the suite, the replay

**The lint over the forty.** 40 sheets. 39 are linted; **s19 (Ancient Gold Dragon) is print-exact from SRD 5.1 with `calls: 0`** — it never enters the reskin pipeline, so there is nothing to lint, and it carries no findings field at all.

| Rule | Findings | Where |
|---|---|---|
| `uncited-replacement-row` | 0 | |
| `ungated-turn-denial` | 0 | |
| `citation-gate-mismatch` | 0 | |
| `deafened-alone` | 0 | |
| `rider-without-an-attack` | 0 | |
| `strike-adds-nothing` | 0 | |
| `stock-template-name` | **1** | s12 Plague Archon — `Bonus Actions/Bolstering Presence: is the stock name of the "rally" template` |
| `two-recharge-rows` | 0 | |

Three findings from rules outside the eight also stand on the forty: `orphan-condition-ref` ×2 and `at-will-inline` ×1.

**A fault in how I read the lint, which anyone reading it next needs.** My first count said 1 finding and 19 sheets with no findings field. Both were wrong in a way that would have hidden real findings: on a **2014 sheet the 2024 monster becomes `other_edition`, and `lint_findings` goes with it**. All 19 sheets I thought were unlinted were 2014 sheets whose findings I was reading from the wrong object. The corrected reader looks in both places. The eight rules' numbers above are from the corrected read; `rowsOfSheet` handles both shapes, so the instrument inside the engine was right and only my reader was wrong.

**The suite:** 273 suites, 5,873 passed, 26 skipped, **exit 0** — `npx jest src/tools/statblock-generator src/util --maxWorkers=1 --silent`, exit code read directly and not through a pipe.

**The replay:** `REPLAY: 38 of 38 reproduced EXACTLY, 2 skipped (not replayable)`. The two skips are s22 and s36, now read from the input rather than remembered, and reported as skips with exit 0.

---

## What I did not do

- **Nothing was pushed.** Ten commits are ready.
- **The `Edge-Sense` test is constructed, and flagged.** You named "the Knife Ball's Edge-Sense" for the refuse-for-the-Advantage / accept-without-it pair. There is no row by that name anywhere in the repo — not in any blocks file, not in either recording; the Knife Ball's own traits on `BLOCKS-fix-ef-2026-11-16.md` are Bloodied Fury, Immutable Form and Magic Resistance. Rather than attribute a sentence to a run that does not carry it, I built the pair to the shape you described — a sensing ribbon whose only fault is an Advantage-on-an-attack clause — and said so in a comment on the test. Replace it with the real sentence if you have it. The other three of the four are quoted verbatim with their source: the Vampire's first Briar Blood and Halric's "senses the guilty".
- **The ribbon probe's recordings** were never made. The probe reads the committed recording for its context, so there was nothing to keep out of the repo.
- **No deletion commit.** Every earlier forty blocks file is named as staying in your evidence order, so nothing was superseded.

## For the next round, from what the probes found

1. **The eight families work.** 80 of 80 are ribbons and every one uses the GM's words. The question left is not whether the model can write them but where one lives on a sheet and what it costs the budget — which is the design you said would come after the owner reads the eighty.
2. **The zone form needs three things, not four more conditions.** 23 of 43 zone ideas asked for something the aura form cannot write; 20 of those 23 asked for damage-per-round, halved Speed, or no Reactions. The four misfits all come from the composed-zone menu offering a condition where the ask had no form.
3. **`sentinel` and `drag` lose 88%** against zone's 72%, on denominators of 25 and 24.
