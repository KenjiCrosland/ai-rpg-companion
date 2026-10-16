# The case for the critic — 2026-10-15

Twelve landings since the branch-confirm read of 2026-10-14. They are one thesis
with a measurement behind it, plus two arithmetic bugs the measurement exposed.
**The three questions we most want your read on are at the bottom**; they are
design calls, not defects, and an outside view is worth more than ours on each.

## The thesis

**A cue regex that has absorbed repeated patches is a question sitting in the
wrong layer.** Where an LLM call can judge meaning, it should answer as a field
on a call we already make; the deterministic layer proposes a fallback and
validates the answer against something closed.

The owner's test, verbatim: *"if we can ask llms specific questions to populate
metadata, that's the route we usually want to go unless the options to choose
from are too numerous and it dilutes the prompt"* — refined mid-sprint to:
*"on precise regex matches we may keep because they're cheap, but if we're piling
on fix after fix to accommodate an ever expanding number of edge cases, we need
some sort of metadata key to be returned."*

So the metric is **churn, not size**: `git log -L <line>,<line>:<file>` over all
164 cue constants in `reskin/` + `format-2024/`.

| patches | cue | what it was really asking | became |
|---|---|---|---|
| 10 + 9 | `JOB_TAIL` + `ROLE_HEAD` | is this two-word print name a family or one creature holding a post? | **a per-name label** on 119 names |
| 6 | `SPECTRAL_COMPOUNDS` | does "-fire" in a coined name mean Fire? | `name_element` on the call that declares the damage |
| 4 | `CASTER_WEAPON` | which weapon would a caster carry? | the weapon table's own columns |
| 4 | `ANAT_STAMP` | is this noun a body part? | the anatomy table |
| 1 | `NEG_CUE` | is the GM taking something away? | `polarity` on the clause object |

## What landed

**One weapon table.** The same fact — a shortsword is a finesse Piercing melee
weapon — was written in **twelve** places across six files, and the copies had
drifted: a Shortsword dealt Slashing because one copy only knew the word "sword",
and a "Hurlaxe" printed a longbow's 60/240 because none saw the axe inside the
coined word. Now one table, plus a `weapons` question on the call that already
names the rows. Eleven copies retired; `ANATOMY`'s weapon half is *derived*.

**`polarity: has | lacks`** on the `clauses` object the call already returns — no
new pass. `NEG_CUE` reads the *grammar* of negation and misread **13 of 17**
realistic phrasings ("it is blind", "eyeless", "born mute", "wingless", "lost its
wings" all read as HAS). Measured live: the call got **6 of 9** right on the first
run and every one of the six was a case the regex fails — but it smeared one
sentence's polarity across every clause in it and **deleted an ability the GM
asked for**. Fixed in the prompt (per clause; most clauses are "has") and in the
engine (a claimed lack must name the absence in its own words). 9/9 after.

**`name_element: literal | imagery`**, beside `damage_types`. Measuring first
reframed it: a *closed* compound never claimed anything (the word boundary blocks
it), so all six patches were adding **hyphen** spellings, and three of the eight
entries could never fire. print's real rule is about form — a fused element word
makes no claim, a standalone one does — so the engine checks the form and the
call judges the meaning. `imagery` is believed only on a fused word, so a bare
"Flame Lash" cannot dodge the gate.

**The 119 two-word print names, labelled.** This looked like an LLM question and
was not: it is a fact about a corpus that does not change between releases. No
word rule can be right anyway — the same tail is a post in one name and a kind in
another ("Bugbear Stalker" is a bugbear; an "Invisible Stalker" IS a stalker), and
a creature head does not imply a post ("Ogre Zombie" IS a zombie). Frozen from
the old rules' verdict, corrected in three places, and the freeze is **pinned by
re-deriving the old rules** — which caught our own table silently dropping two
names.

**One table for what a name promises.** `CONDITION_CLAIMS` (engine → repair call,
7 conditions) and `NAME_MECHANIC` (checker → fails the sheet, 10 claims) were one
question in two places, so the gate refused things the call was never asked to
fix. The late audit rename had the *element* vet since 2026-09-01 and never this
one — which is how "Lance Charge" and "Poisoned Blade" reached live sheets.

## Two arithmetic bugs the measurement exposed

Recorded because they are the opposite of the thesis — deterministic arithmetic no
call should ever be asked about.

**The legendary budget.** The solver's convergence loop counted a cost-1 legendary
strike **once** where its own seed, its own comment, and the checker count
**three**; and its filter ignored print's "can't take this action again" brake that
the checker honours. A CR 15 dragon shipped a 32-point bite where print's adult
dragons at CR 13–16 deal 17–21. High-CR `hot-offense` went **5 of 12 → 1**.

**The rider fold.** The print-canon melee pass deleted the chassis's rider clause
instead of folding it into the base, leaving the row at 60% of budget — "a dire
wolf" at CR 3 dealt 14 a round against a card of 25. Two wrong diagnoses first,
and the first fix was dead code because print's Dire Wolf rider is a *condition*,
not damage.

## The canaries were replaced

The old ten were **8/10 print-canon** — the most stable path in the engine — and
never touched species, class, any of the three bodies, casters, the legendary
tier (they stopped at CR 10), lacks clauses, thrown weapons, or rich authoring.
That is why this sprint's landings were all measured by ad-hoc batches, and why
the rider fold moved **zero** canary reads.

The new fourteen carry one axis each, print down to 3 of 14. On its first run it
found **2 FAILs on axes the old set could not reach**. A floor that reads
all-green on first use is not measuring anything.

## Our own misses, for your calibration

Three times print overruled **us**:

1. We reported an ooze as missing Poison immunity. Print's oozes are Poison-immune
   **0 of 4** — the *gate* was wrong, and `generate.mjs` already had it right.
2. We raised HP on seven donors to clear "print's floor" at CR 17. Print has
   **four** blocks at CR 17, all Celestial/Dragon, and **no lurker-shaped peer** —
   we were bounding a lurker by a dragon and overriding a measured sweep on a
   four-block sample. Five of the seven reverted.
3. The `inline-correctness` gate accepted only a contiguous **tail** of the name,
   and so **failed 7 of 7 printed swarms**: print names one "Swarm of Bats" and
   its own text says "the swarm", where swarm is the HEAD.

And twice our own fix was wrong until something caught it: the rider fold was
**dead code** for three runs (guarded on `pr.rider`, which the Dire Wolf's Prone
condition satisfies), and the inline fix normalized hyphens on the name side only,
so "Iron Line-Crasher" / "the line-crasher" still failed until a live run caught
what the pins had missed.

## The three questions we want your read on

**1. The lurker HP/mitigation trade.** Print's thin creatures are thin *because*
they are hard to hurt: print's thinnest CR 5 block is the Wraith at 67 HP, and it
resists Acid/Bludgeoning/Cold/Fire/Piercing/Slashing and is immune to Necrotic and
Poison. The thinnest CR 5 block with **no** mitigation is the Giant Crocodile at
**85**. Our lurker donors are thin with no mitigation at all. The measured lurker
sweep (2026-09-04) says `hp_scale <= 0.8` — 72 HP at CR 5. Two measured
constraints that cannot both hold. Do the thin lurkers get print's resistances, or
does the sweep's ceiling retire?

**2. The dpr card against print at the top.** The card asks **190** dpr at CR 17.
print's CR 17 blocks read **13–18.5 CR** from their actual damage, and after the
legendary fix our high tier runs 21–37% under the card while sitting *inside*
print's range. Which number is wrong — the card, or our reading of print? This is
parked for its own sprint; a view now would de-risk it.

**3. What should "tied to the concept" mean?** The checker reports a concept share
per block — rows tied to the GM's ask over all rows. Fresh runs read **0/4** on a
polarity canary, **2/6** on a species block, **1/8** on a 2014 legendary block.
The sheets are legal and clean and their rows have little to do with what was
typed. The old print-heavy canaries hid this, because a print creature's rows are
print's by definition and score high for free. We have not touched it because we
do not yet know what the metric *should* count — the clause record, the fit call's
bound keys, or the seat elements. We would rather have your read than guess.

**4. May the engine overrule a name the call chose?** The batch below has a live
case we deliberately did not fix. A CR 17 death knight shipped:

> *Damned Charge:* One creature within 5 feet must succeed on a DC 19 Strength
> saving throw or be pushed up to 15 feet away from Brannor and be knocked prone.

The new vet **fired** — `repair round 1: name "Damned Charge" promises movement
but the row never delivers it` — the repair call was asked, and it declined to
change anything. The sheet shipped and the checker failed it.

Print settles whether the gate is right: **4 of 4** print rows whose name says
charge/rush/stampede move the CREATURE (Troll, Xorn, Centaur Trooper, Sahuagin
Warrior). A push of the target is not a charge. So the gate is correct and the
name is wrong.

The engine could resolve this deterministically — revert that row to the chassis
name, which never over-claims, the way `audit rename blocked` already keeps a
standing name. We did not, because overriding a name the call chose is a taste
decision, not a correctness one. Should a name-claim defect that survives the
repair round be overruled, or should it ship and fail the gate?

## Gate

`npx jest` 2728 passed / 70 suites. `npm run build` clean.

Fresh runs in this batch: **canaries 2 FAIL of 14** (the lurker HP from question 1,
and the Damned Charge from question 4), **classes-eight 1 FAIL of 16**
(`multiattack-integrity` — a Multiattack naming "Tower Shield", which is the
dangling-reference family, third sighting this sprint).
