# Case: stage 4b step 3 — a key gate becomes a receipt gate

Runs: `smoke-out/cues-2026-10-17T00-36-41` (10 blocks, built to make the new field
answer both ways) and `smoke-out/holds-2026-10-17T00-21-12` (8 blocks, the
critic's own release conditions).
Gates: 71 suites / 2804 passed; `npm run build` clean; 48 pins in
`reskin/__tests__/stage34-pins.spec.js`.

**Read §1 and §6 first.** §1 is the only real evidence for the new field, and §6
is where I was wrong about my own work.

## 1. The cue verdict, measured both ways

The route call ranks picks AND now verdicts the keys the engine found, in the
same call — no new call, so no cost change. The override reads the VERDICT, not
the key. `verbHits` is deterministic from the text, so the engine computes its
own hits and asks about them.

Ten prompts, six where the override must survive (drawn from the corrections
measured below) and four traps:

| # | prompt | expected | result |
|---|---|---|---|
| 01 | "crushes the drowned against the stones" | keep | `brute-grappler ✓` kept |
| 02 | "charges down the chapel gate" | keep | `brute-charger ✓` kept |
| 03 | "guards the only bridge" | keep | `defender ✓`; "sergeant" refused as a job noun |
| 05 | "surfaces beneath a traveller" | keep | `lurker ✓` kept |
| 06 | "a giant crab that rules the tidepool" | keep (BODY key) | `brute-grappler ✓` kept |
| 07 | "**charges a fee** for every wagon" | REFUSE | `the call read "charges" as not meaning that mechanic here` |
| 09 | "**crushes his rivals in the courts of law**" | REFUSE | `the call read "crushes" as not meaning that mechanic here` |
| 10 | half-dragon duellist | REFUSE | dragon line refused by the existing deny |
| 08 | knight in a **winged helmet** | REFUSE | landed `defender`; the winged line never competed |
| 04 | battle-chaplain who **blesses** | keep (warpriest) | **MISS — see §3** |

**The verdict fired `false` exactly twice, on the two metaphors, and on none of
the six legitimate cases.** That is the whole claim for this field, and it is one
run of ten. It has not been measured across several runs per prompt, which is
what every other new field here has needed.

### Why this, and not a precedence flip

Measured before building anything: **497 overrides across 5097 saved blocks
(9.8%)**, and most read as corrections — `"crushes" -> grappler` x55,
`"charges" -> charger` x44, `"guards" -> defender` x35, `"crab" -> grappler` x14.
`"flies" -> skirmisher-winged` is 11 of them.

I first tried refusing the override whenever the call's pick carried a verified
quote. It fixed the berserker and **broke six pins** encoding earlier critic
reads: a glass ox that charges IS a charger, a BODY noun may win where a job noun
may not, the Headless Horseman's mounted seat, the caster/martial key gates. I
reverted rather than rewrite six pins to make my change pass.

The revert is what found the real shape: **the route call was being asked WHICH
LINE and never WHETHER THIS KEY MEANS ITS MECHANIC.** The verdict that answers
that already existed (`hint_verdicts: winged -> style ✗`) but came from the
identity call, after routing, and was read only by the name-canon stamp.

## 2. The flying berserker, fixed

`holds-2026-10-17T00-21-12` block 01, the owner's own example: *"a berserker who
flies into an unstoppable rage once per day when wounded"* now ships **`30 ft.`,
donor `brute-5`**, with Greataxe, Wounded Rage, Bloodied Frenzy and Rampage.

```
the call read "flies" as not meaning that mechanic here
Bloodvowed Hull stands: every key that would override it was read as a figure of speech
```

Before: `Fly 70 ft.`, DEX 20, donor `skirmisher-8-winged` at CR 8.

The other release conditions in the same run: Patient Defense LANDS (hold 2);
Assassinate + Evasion + Cunning Action all survive the trait ceiling; the troll
keeps Regeneration; Thurivald records its clauses.

## 3. Step 3 is ONE DOOR OF FOUR

The override now asks. Three line gates still refuse a line on a missing word,
before the cue question is reachable:

- **`MAGIC_WORD`** — block 04 is its reproducing prompt. *"a battle-chaplain who
  blesses the faithful before the charge"* traced
  `caster-warpriest: a caster line needs a magic word in the words — none here`,
  landed `skirmisher-3`, and then failed `attack-stat: Censer-Staff: +7 derives
  from DEX`. A word list refused the right line and the stat fault is downstream.
- **`ARCHER_NOUN`** — `skirmisher-archer` needs a bow noun.
- **`SWARM_WORDS`** — `swarm` needs a mass word.

Each is defended by a pin from an earlier critic read, which is why I have not
changed them: the precedence flip already taught me what rewriting six of those
costs. They are inventory section A entries and they need the owner's call.

## 4. The attack-stat family is routing, not arithmetic — three instances

The critic's hypothesis, tested:

| sheet | mechanism | symptom |
|---|---|---|
| berserker (stage34 block 07) | keyword override on "flies" | `Greataxe +8 derives from DEX` — **gone once the route was fixed** |
| druid (holds block 02) | line→donor mismatch: `caster-binder ✓` accepted, `skirmisher-3` landed | `Vine Staff +7 derives from DEX` |
| chaplain (cues block 04) | `MAGIC_WORD` refused the warpriest line | `Censer-Staff +7 derives from DEX` |

Three different routing mechanisms, one symptom. **I had filed the first as an
unrelated pre-existing family** on the strength of its frequency (12 of 188
runs, 7 of them the same "Mace derives from DEX").

## 5. Also landed since the gate-4 package

- **Hold 2 was three cap paths.** `e.rules` was in `evictForCap`'s never-evict
  list, so `Fleet Agility` — the brief's own example of chassis filler — was
  protected and Patient Defense yielded. Fixing that exposed the **trait
  ceiling**, which evicted a rogue's OWED Assassinate for a signature, because a
  kit row carries a template id too. `classes.spec.js` caught both of my wrong
  attempts.
- **Coverage's input was missing on every 2014 sheet.** `convertEdition` returns
  a fresh object and `generation` was not carried across, so coverage scored
  every 2014 block against an empty clause list. Kaelen and Thurivald were the
  only two 2014 blocks in the gate run and the only two with no clauses.
- **Defensive traits are priced**, sized from print: no-trait blocks read −0.60
  (the reader's baseline), Magic Resistance −1.07, Legendary Resistance −1.09.
  One rung on the defensive half brings each to the baseline; the DMG prices
  Magic Resistance at +2 effective AC and a rung is 2 AC. 187 → 176 soft band
  notes over 74 runs, **zero FAIL changed**.
- **Dame Oriel is shaped, not deleted.** `disadv-to-hit` is in 0 of 329 print
  blocks, so there is no price to calibrate. The guard stays and the AC drops to
  print's number for the CR; print bodies are exempt, because a print body's AC
  is print's own. A pin caught me overwriting the Gladiator's AC 16.
- **A rename may not re-weapon a row.** `audit rename: "Lance" -> "Oathspear"`
  shipped a lance's reach 10 and a range that is no spear's, under a name a GM
  reads as a spear. Blocked only when both names name real weapons and disagree.

## 6. Corrections to my own earlier claims

1. **"Both calls were right and the table overruled both"** — half wrong. The
   identity call answered `themes=aerial` because the prompt told it to: *"The
   identity IS that chassis embodied"*, handed a chassis named `skirmisher-winged`.
   Measured: `aerial 0/5` without the line, **`5/5` with it**. One parameter.
2. **"The classifier is nondeterministic"** — it is 5/5 stable asked cleanly. I
   was comparing two runs whose prompts differed.
3. **"The archetype primes it"** — flatly wrong. `skirmisher` gives `aerial 0/5`,
   identical to `brute`. The channel was `line`.
4. **"No prompt work could have prevented this"** — wrong; see 1.
5. **"The table decides before the call is asked"** — wrong. The route call runs
   first and IS overruled. I had read one trace line carrying both events as one.
6. **"Identical verdicts, 0 FP and 0 FN introduced"** for the dangling-ref regex
   tightening — scoped to 12 runs and written as if settled. On the full 74-run
   list it was carrying **3 false `dangling-ref` failures**: bounding the capture
   to capitalised words made `"a use of Vow of Silence"` capture `"Vow"`, which
   matches no row. Fixed, and pinned in both directions.
7. **The `attack-stat` family** — see §4.
8. I reported the Dame Oriel gate as working on the strength of a trace line that
   fired. The trait shipped anyway on two of three blocks: the trace said the gate
   ran, not that the row was gone.
9. I reported "precedence flipped" and launched three batches on a **dead edit** —
   `quotedPick` was declared and read but never assigned, because I asserted on
   one substitution and not the other.

## 7. Known and not fixed

- step 3's other three doors (§3)
- `engine-needs-key` on a grapple row with no key in the words — the same family
- `alignment-fit`: Unaligned on a Monstrosity with INT 12
- `print-range`: `Hurlblade`, a melee weapon on a ranged-only row
- the re-roll path skipping main-path rules (critic's §5, untouched)
- Mira's Cutpurse's Finisher priced as if its Incapacitated precondition held
- `lurker-5` under print's CR 5 HP band in 4 of 4 runs (owner's parked question 1)
- three word rules I added before the ruling arrived (`soloLen: 5`,
  `SAYS_WHEN`/`SAYS_OFTEN`, the darkvision `gmSaid`) — listed in
  `plans/stage4b-inventory.md` §C, pending the owner's call
